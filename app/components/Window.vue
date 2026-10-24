<template>
  <Transition :css="false" appear @enter="animateOpen" @leave="animateClose">
    <section
      v-if="isOpen"
      ref="windowElement"
      class="absolute left-0 top-0 will-change-transform"
      :style="windowStyle"
      @pointermove="onPointerMove"
      @pointerup="endInteraction"
      @pointercancel="endInteraction"
      @dblclick="onDoubleClick"
    >
      <div
        v-bind="$attrs"
        data-window-surface
        class="relative flex size-full box-border flex-col overflow-hidden rounded-2xl border-none bg-black-800 p-1 text-inherit shadow"
        :class="{
          'select-none': interaction !== null,
        }"
      >
        <!-- #region Titlebar -->
        <div
          v-if="$slots.titlebar"
          class="relative flex shrink-0 px-4 py-1 items-center"
          @pointerdown="onPointerDown"
        >
          <slot name="titlebar" />
        </div>

        <button
          v-if="maxable && !isMobile"
          class="group absolute right-1 top-1 z-2 grid size-6 cursor-pointer place-items-center rounded-full bg-blue text-inherit transition-colors hover:bg-blue-dark"
          :class="{ 'right-8': showCloseButton }"
          type="button"
          :aria-label="isMaximized ? '還原視窗' : '最大化視窗'"
          :title="isMaximized ? '還原視窗' : '最大化視窗'"
          @pointerdown.stop="focusWindow"
          @click="toggleMaximized"
        >
          <PhCornersIn
            v-if="isMaximized"
            :size="14"
            aria-hidden="true"
            class="text-black-50 opacity-0 group-hover:opacity-100"
          />
          <PhCornersOut
            v-else
            :size="14"
            aria-hidden="true"
            class="text-black-50 opacity-0 group-hover:opacity-100"
          />
        </button>

        <button
          v-if="showCloseButton"
          class="group absolute right-1 top-1 z-2 grid size-6 cursor-pointer place-items-center rounded-full bg-purple text-inherit transition-colors hover:bg-purple-dark"
          type="button"
          aria-label="關閉視窗"
          title="關閉視窗"
          @pointerdown.stop="focusWindow"
          @click="isOpen = false"
        >
          <PhX
            :size="14"
            aria-hidden="true"
            class="text-black-50 opacity-0 group-hover:opacity-100"
          />
        </button>
        <!-- #endregion -->

        <!-- #region 內容 -->
        <div
          class="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-black-900"
          :class="contentPadding ? 'p-2' : ''"
          @pointerdown="onPointerDown"
        >
          <slot />
        </div>
        <!-- #endregion -->

        <template v-if="resizable && !isMaximized && !isMobile">
          <span
            v-for="handle in resizeHandles"
            :key="handle"
            class="absolute z-[3] touch-none"
            :class="resizeHandleClasses[handle]"
            aria-hidden="true"
            @pointerdown.stop="onResizePointerDown($event, handle)"
          />
        </template>
      </div>
    </section>
  </Transition>
</template>

<script setup lang="ts">
import { PhCornersIn, PhCornersOut, PhX } from "@phosphor-icons/vue";
import { useWindowControls, type ResizeHandle } from "~/lib/useWindowControls";
import { windowsContainerKey } from "~/utils/windows";

defineOptions({ inheritAttrs: false });

interface Props {
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
  movable?: boolean;
  maxable?: boolean;
  resizable?: boolean;
  showCloseButton?: boolean;
  allowDoubleMaxmize?: boolean;
  contentPadding?: boolean;
  defaultStatus?: "window" | "maxmium";
}

const props = withDefaults(defineProps<Props>(), {
  initialX: 24,
  initialY: 24,
  initialWidth: 480,
  initialHeight: 320,
  minWidth: 240,
  minHeight: 160,
  movable: true,
  maxable: true,
  resizable: true,
  showCloseButton: false,
  allowDoubleMaxmize: true,
  contentPadding: true,
  defaultStatus: "window",
});

const isOpen = defineModel<boolean>("open", { default: true });

const emit = defineEmits<{
  maximizeChange: [isMaximized: boolean];
}>();

const container = inject(windowsContainerKey, null);
const windowElement = ref<HTMLElement | null>(null);
const windowId = Symbol("window");
const isMobile = ref(false);
let mobileQuery: MediaQueryList | undefined;
const controls = useWindowControls({
  initialX: props.initialX,
  initialY: props.initialY,
  initialWidth: props.initialWidth,
  initialHeight: props.initialHeight,
  minWidth: props.minWidth,
  minHeight: props.minHeight,
  movable: computed(() => props.movable && !isMobile.value),
  resizable: computed(() => props.resizable && !isMobile.value),
  bounds: () => {
    if (container) return container.bounds.value;
    return {
      width: windowElement.value?.parentElement?.clientWidth ?? 0,
      height: windowElement.value?.parentElement?.clientHeight ?? 0,
    };
  },
  bringToFront: () => container?.bringToFront(windowId) ?? 1,
  onMaximizeChange: (value) => emit("maximizeChange", value),
});

const {
  rect,
  isMaximized,
  interaction,
  resizeHandles,
  windowStyle,
  startDrag,
  startResize: beginResize,
  onPointerMove,
  endInteraction,
  focusWindow,
  toggleMaximized,
  maximize,
  restore,
  updateBounds,
  initialize,
  dispose,
  animateOpen,
  animateClose,
} = controls;

const resizable = computed(() => props.resizable);
const showCloseButton = computed(() => props.showCloseButton);
const resizeHandleClasses: Record<ResizeHandle, string> = {
  n: "left-2 top-0 h-2 w-[calc(100%-1rem)] cursor-ns-resize",
  ne: "right-0 top-0 size-3 cursor-nesw-resize",
  e: "right-0 top-2 h-[calc(100%-1rem)] w-2 cursor-ew-resize",
  se: "bottom-0 right-0 size-3 cursor-nwse-resize",
  s: "bottom-0 left-2 h-2 w-[calc(100%-1rem)] cursor-ns-resize",
  sw: "bottom-0 left-0 size-3 cursor-nesw-resize",
  w: "left-0 top-2 h-[calc(100%-1rem)] w-2 cursor-ew-resize",
  nw: "left-0 top-0 size-3 cursor-nwse-resize",
};

function onPointerDown(event: PointerEvent) {
  if (windowElement.value) startDrag(event, windowElement.value);
}

function onResizePointerDown(event: PointerEvent, handle: ResizeHandle) {
  if (event.currentTarget instanceof HTMLElement) {
    beginResize(event, handle, event.currentTarget);
  }
}

watch(isOpen, (open) => {
  if (open) {
    nextTick(() => {
      focusWindow();
      if (isMobile.value && !isMaximized.value) maximize();
    });
  }
});

watch(
  () => container?.bounds.value,
  (bounds) => bounds && updateBounds(bounds),
  { deep: true },
);

onMounted(() => {
  if (!container) {
    console.warn("<Window> should be placed inside <WindowsContainer>.");
  }

  mobileQuery = window.matchMedia("(max-width: 767px)");
  mobileQuery.addEventListener("change", updateMobileState);
  updateMobileState();

  container?.registerWindow(windowId, {
    close: () => (isOpen.value = false),
    isOpen: () => isOpen.value,
    zIndex: () => Number(windowStyle.value.zIndex ?? 0),
  });
  void initialize().then(() => {
    if (props.defaultStatus === "maxmium") maximize();
  });
});

onBeforeUnmount(() => {
  mobileQuery?.removeEventListener("change", updateMobileState);
  container?.unregisterWindow(windowId);
  dispose();
});

defineExpose({
  isOpen,
  rect: readonly(rect),
  isMaximized: readonly(isMaximized),
  maximize,
  restore,
  toggleMaximized,
});

// 如果雙擊視窗，則最大化視窗
function onDoubleClick() {
  if (!props.allowDoubleMaxmize || isMobile.value) {
    return;
  }
  // 如果視窗已經最大化，則恢復視窗大小
  if (isMaximized.value) {
    restore();
    return;
  } else {
    maximize();
    return;
  }
}

function updateMobileState() {
  isMobile.value = mobileQuery?.matches ?? false;
  if (isMobile.value && isOpen.value && !isMaximized.value) {
    maximize();
  } else if (!isMobile.value && isMaximized.value) {
    restore();
  }
}
</script>
