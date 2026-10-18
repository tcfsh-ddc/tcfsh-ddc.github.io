<template>
  <section
    v-show="isOpen"
    ref="windowElement"
    v-bind="$attrs"
    class="os-window"
    :class="{
      'os-window--maximized': isMaximized,
      'os-window--interacting': interaction !== null,
    }"
    :style="windowStyle"
    @pointermove="onPointerMove"
    @pointerup="endInteraction"
    @pointercancel="endInteraction"
  >
    <div v-if="$slots.titlebar" class="os-window__titlebar" @pointerdown="onPointerDown">
      <slot name="titlebar" />
    </div>

    <div class="os-window__content" @pointerdown="onPointerDown">
      <slot />
    </div>

    <button
      class="os-window__maximize-button"
      :class="{ 'os-window__maximize-button--with-close': showCloseButton }"
      type="button"
      :aria-label="isMaximized ? '還原視窗' : '最大化視窗'"
      :title="isMaximized ? '還原視窗' : '最大化視窗'"
      @pointerdown.stop="focusWindow"
      @click="toggleMaximized"
    >
      <PhCornersIn v-if="isMaximized" :size="18" aria-hidden="true" />
      <PhCornersOut v-else :size="18" aria-hidden="true" />
    </button>

    <button
      v-if="showCloseButton"
      class="os-window__close-button"
      type="button"
      aria-label="關閉視窗"
      title="關閉視窗"
      @pointerdown.stop="focusWindow"
      @click="isOpen = false"
    >
      <PhX :size="18" aria-hidden="true" />
    </button>

    <template v-if="resizable && !isMaximized">
      <span
        v-for="handle in resizeHandles"
        :key="handle"
        class="os-window__resize-handle"
        :class="`os-window__resize-handle--${handle}`"
        aria-hidden="true"
        @pointerdown.stop="onResizePointerDown($event, handle)"
      />
    </template>
  </section>
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
  resizable?: boolean;
  showCloseButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  initialX: 24,
  initialY: 24,
  initialWidth: 480,
  initialHeight: 320,
  minWidth: 240,
  minHeight: 160,
  movable: true,
  resizable: true,
  showCloseButton: false,
});

const isOpen = defineModel<boolean>("open", { default: true });

const emit = defineEmits<{
  maximizeChange: [isMaximized: boolean];
}>();

const container = inject(windowsContainerKey, null);
const windowElement = ref<HTMLElement | null>(null);
const controls = useWindowControls({
  initialX: props.initialX,
  initialY: props.initialY,
  initialWidth: props.initialWidth,
  initialHeight: props.initialHeight,
  minWidth: props.minWidth,
  minHeight: props.minHeight,
  movable: toRef(props, "movable"),
  resizable: toRef(props, "resizable"),
  bounds: () => {
    if (container) return container.bounds.value;
    return {
      width: windowElement.value?.parentElement?.clientWidth ?? 0,
      height: windowElement.value?.parentElement?.clientHeight ?? 0,
    };
  },
  bringToFront: () => container?.bringToFront() ?? 1,
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
} = controls;

const resizable = computed(() => props.resizable);
const showCloseButton = computed(() => props.showCloseButton);

function onPointerDown(event: PointerEvent) {
  if (windowElement.value) startDrag(event, windowElement.value);
}

function onResizePointerDown(event: PointerEvent, handle: ResizeHandle) {
  if (event.currentTarget instanceof HTMLElement) {
    beginResize(event, handle, event.currentTarget);
  }
}

watch(isOpen, (open) => {
  if (open) nextTick(focusWindow);
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

  void initialize();
});

onBeforeUnmount(() => {
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
</script>

<style scoped>
.os-window {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  border: var(--window-border, 1px solid rgb(255 255 255 / 30%));
  border-radius: var(--window-radius, 12px);
  background: var(--window-background, rgb(20 20 28 / 96%));
  box-shadow: var(--window-shadow, 0 18px 50px rgb(0 0 0 / 35%));
  color: var(--window-color, inherit);
  will-change: width, height, transform;
}

.os-window__titlebar {
  position: relative;
  flex: 0 0 auto;
  touch-action: none;
}

.os-window__content {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
}

.os-window--interacting {
  user-select: none;
}

.os-window--maximized {
  border-radius: 0;
}

.os-window__maximize-button {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  display: grid;
  width: 32px;
  height: 32px;
  padding: 0;
  place-items: center;
  border: var(--window-control-border, 1px solid rgb(255 255 255 / 35%));
  border-radius: var(--window-control-radius, 7px);
  background: var(--window-control-background, rgb(0 0 0 / 25%));
  color: var(--window-control-color, currentColor);
  cursor: pointer;
}

.os-window__maximize-button--with-close {
  right: 52px;
}

.os-window__close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  display: grid;
  width: 32px;
  height: 32px;
  padding: 0;
  place-items: center;
  border: var(--window-control-border, 1px solid rgb(255 255 255 / 35%));
  border-radius: var(--window-control-radius, 7px);
  background: var(--window-close-background, var(--window-control-background, rgb(0 0 0 / 25%)));
  color: var(--window-control-color, currentColor);
  cursor: pointer;
}

.os-window__close-button:hover {
  background: var(--window-close-hover-background, #d8335b);
  color: white;
}

.os-window__close-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.os-window__maximize-button:hover {
  background: var(--window-control-hover-background, rgb(255 255 255 / 16%));
}

.os-window__maximize-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.os-window__resize-handle {
  position: absolute;
  z-index: 3;
  touch-action: none;
}

.os-window__resize-handle--n,
.os-window__resize-handle--s {
  left: 8px;
  width: calc(100% - 16px);
  height: 8px;
  cursor: ns-resize;
}

.os-window__resize-handle--n {
  top: 0;
}
.os-window__resize-handle--s {
  bottom: 0;
}

.os-window__resize-handle--e,
.os-window__resize-handle--w {
  top: 8px;
  width: 8px;
  height: calc(100% - 16px);
  cursor: ew-resize;
}

.os-window__resize-handle--e {
  right: 0;
}
.os-window__resize-handle--w {
  left: 0;
}

.os-window__resize-handle--ne,
.os-window__resize-handle--se,
.os-window__resize-handle--sw,
.os-window__resize-handle--nw {
  width: 12px;
  height: 12px;
}

.os-window__resize-handle--ne {
  top: 0;
  right: 0;
  cursor: nesw-resize;
}
.os-window__resize-handle--se {
  right: 0;
  bottom: 0;
  cursor: nwse-resize;
}
.os-window__resize-handle--sw {
  bottom: 0;
  left: 0;
  cursor: nesw-resize;
}
.os-window__resize-handle--nw {
  top: 0;
  left: 0;
  cursor: nwse-resize;
}
</style>
