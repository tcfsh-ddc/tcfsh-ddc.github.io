<template>
  <section
    ref="windowElement"
    v-bind="$attrs"
    class="os-window"
    :class="{
      'os-window--maximized': isMaximized,
      'os-window--interacting': interaction !== null,
    }"
    :style="windowStyle"
    @pointerdown="onWindowPointerDown"
    @pointermove="onPointerMove"
    @pointerup="endInteraction"
    @pointercancel="endInteraction"
  >
    <slot />

    <button
      class="os-window__maximize-button"
      type="button"
      :aria-label="isMaximized ? '還原視窗' : '最大化視窗'"
      :title="isMaximized ? '還原視窗' : '最大化視窗'"
      @pointerdown.stop="focusWindow"
      @click="toggleMaximized"
    >
      <span class="os-window__maximize-icon" aria-hidden="true" />
    </button>

    <template v-if="!isMaximized">
      <span
        v-for="handle in resizeHandles"
        :key="handle"
        class="os-window__resize-handle"
        :class="`os-window__resize-handle--${handle}`"
        aria-hidden="true"
        @pointerdown.stop="startResize($event, handle)"
      />
    </template>
  </section>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue";
import { windowsContainerKey } from "~/utils/windows";

defineOptions({ inheritAttrs: false });

interface Props {
  initialX?: number;
  initialY?: number;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

type ResizeHandle = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

interface WindowRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Interaction {
  type: "drag" | "resize";
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startRect: WindowRect;
  handle?: ResizeHandle;
}

const props = withDefaults(defineProps<Props>(), {
  initialX: 24,
  initialY: 24,
  initialWidth: 480,
  initialHeight: 320,
  minWidth: 240,
  minHeight: 160,
});

const emit = defineEmits<{
  maximizeChange: [isMaximized: boolean];
}>();

const container = inject(windowsContainerKey, null);
const windowElement = ref<HTMLElement | null>(null);
const rect = reactive<WindowRect>({
  x: props.initialX,
  y: props.initialY,
  width: props.initialWidth,
  height: props.initialHeight,
});
const restoredRect = ref<WindowRect>({ ...rect });
const isMaximized = ref(false);
const interaction = ref<Interaction | null>(null);
const zIndex = ref(1);
const resizeHandles: ResizeHandle[] = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

let gsapInstance: (typeof import("gsap"))["gsap"] | undefined;
let activeTween: ReturnType<(typeof import("gsap"))["gsap"]["to"]> | undefined;

const windowStyle = computed<CSSProperties>(() => ({
  width: `${rect.width}px`,
  height: `${rect.height}px`,
  transform: `translate3d(${rect.x}px, ${rect.y}px, 0)`,
  zIndex: zIndex.value,
}));

function getBounds() {
  if (container) return container.bounds.value;

  const parent = windowElement.value?.parentElement;
  return {
    width: parent?.clientWidth ?? 0,
    height: parent?.clientHeight ?? 0,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

function fitRectToBounds(source: WindowRect): WindowRect {
  const bounds = getBounds();

  if (bounds.width <= 0 || bounds.height <= 0) return { ...source };

  const width = clamp(source.width, Math.min(props.minWidth, bounds.width), bounds.width);
  const height = clamp(source.height, Math.min(props.minHeight, bounds.height), bounds.height);

  return {
    x: clamp(source.x, 0, bounds.width - width),
    y: clamp(source.y, 0, bounds.height - height),
    width,
    height,
  };
}

function focusWindow() {
  zIndex.value = container?.bringToFront() ?? zIndex.value;
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;

  return Boolean(
    target.closest(
      "button, a, input, textarea, select, option, [contenteditable='true'], [data-window-no-drag]",
    ),
  );
}

function onWindowPointerDown(event: PointerEvent) {
  focusWindow();

  if (isMaximized.value || event.button !== 0 || isInteractiveTarget(event.target)) return;

  interaction.value = {
    type: "drag",
    pointerId: event.pointerId,
    startPointerX: event.clientX,
    startPointerY: event.clientY,
    startRect: { ...rect },
  };

  windowElement.value?.setPointerCapture(event.pointerId);
  event.preventDefault();
}

function startResize(event: PointerEvent, handle: ResizeHandle) {
  focusWindow();

  if (event.button !== 0) return;

  interaction.value = {
    type: "resize",
    pointerId: event.pointerId,
    startPointerX: event.clientX,
    startPointerY: event.clientY,
    startRect: { ...rect },
    handle,
  };

  (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  event.preventDefault();
}

function onPointerMove(event: PointerEvent) {
  const currentInteraction = interaction.value;

  if (!currentInteraction || currentInteraction.pointerId !== event.pointerId) return;

  const deltaX = event.clientX - currentInteraction.startPointerX;
  const deltaY = event.clientY - currentInteraction.startPointerY;
  const bounds = getBounds();
  const start = currentInteraction.startRect;

  if (currentInteraction.type === "drag") {
    rect.x = clamp(start.x + deltaX, 0, bounds.width - start.width);
    rect.y = clamp(start.y + deltaY, 0, bounds.height - start.height);
    return;
  }

  const handle = currentInteraction.handle!;
  const minWidth = Math.min(props.minWidth, bounds.width);
  const minHeight = Math.min(props.minHeight, bounds.height);
  let left = start.x;
  let top = start.y;
  let right = start.x + start.width;
  let bottom = start.y + start.height;

  if (handle.includes("e")) right = clamp(right + deltaX, left + minWidth, bounds.width);
  if (handle.includes("s")) bottom = clamp(bottom + deltaY, top + minHeight, bounds.height);
  if (handle.includes("w")) left = clamp(left + deltaX, 0, right - minWidth);
  if (handle.includes("n")) top = clamp(top + deltaY, 0, bottom - minHeight);

  Object.assign(rect, {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  });
}

function endInteraction(event: PointerEvent) {
  if (interaction.value?.pointerId !== event.pointerId) return;

  interaction.value = null;
}

function animateTo(target: WindowRect) {
  activeTween?.kill();

  if (!gsapInstance) {
    Object.assign(rect, target);
    return;
  }

  const animationState = { ...rect };
  activeTween = gsapInstance.to(animationState, {
    ...target,
    duration: 0.35,
    ease: "power3.inOut",
    overwrite: true,
    onUpdate: () => Object.assign(rect, animationState),
    onComplete: () => {
      Object.assign(rect, target);
      activeTween = undefined;
    },
  });
}

function maximize() {
  if (isMaximized.value) return;

  const bounds = getBounds();
  restoredRect.value = { ...rect };
  isMaximized.value = true;
  emit("maximizeChange", true);
  animateTo({ x: 0, y: 0, width: bounds.width, height: bounds.height });
}

function restore() {
  if (!isMaximized.value) return;

  isMaximized.value = false;
  emit("maximizeChange", false);
  animateTo(fitRectToBounds(restoredRect.value));
}

function toggleMaximized() {
  focusWindow();
  isMaximized.value ? restore() : maximize();
}

watch(
  () => container?.bounds.value,
  (bounds) => {
    if (!bounds || bounds.width === 0 || bounds.height === 0) return;

    if (isMaximized.value) {
      activeTween?.kill();
      Object.assign(rect, { x: 0, y: 0, width: bounds.width, height: bounds.height });
      return;
    }

    Object.assign(rect, fitRectToBounds(rect));
  },
  { deep: true },
);

onMounted(async () => {
  if (!container) {
    console.warn("<Window> should be placed inside <WindowsContainer>.");
  }

  focusWindow();
  Object.assign(rect, fitRectToBounds(rect));
  const gsapModule = await import("gsap");
  gsapInstance = gsapModule.gsap;
});

onBeforeUnmount(() => {
  activeTween?.kill();
});

defineExpose({
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
  box-sizing: border-box;
  overflow: hidden;
  border: var(--window-border, 1px solid rgb(255 255 255 / 30%));
  border-radius: var(--window-radius, 12px);
  background: var(--window-background, rgb(20 20 28 / 96%));
  box-shadow: var(--window-shadow, 0 18px 50px rgb(0 0 0 / 35%));
  color: var(--window-color, inherit);
  will-change: width, height, transform;
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

.os-window__maximize-button:hover {
  background: var(--window-control-hover-background, rgb(255 255 255 / 16%));
}

.os-window__maximize-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.os-window__maximize-icon {
  position: relative;
  display: block;
  width: 13px;
  height: 13px;
  border: 1.5px solid currentColor;
  border-radius: 1px;
}

.os-window--maximized .os-window__maximize-icon {
  transform: translate(2px, -2px);
}

.os-window--maximized .os-window__maximize-icon::before {
  position: absolute;
  top: 3px;
  left: -5px;
  width: 11px;
  height: 11px;
  border: 1.5px solid currentColor;
  border-radius: 1px;
  background: var(--window-control-background, rgb(0 0 0 / 25%));
  content: "";
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
