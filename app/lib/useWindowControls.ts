import type { CSSProperties, Ref } from "vue";
import type { WindowBounds } from "~/utils/windows";

export interface WindowRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type ResizeHandle = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

interface Interaction {
  type: "drag" | "resize";
  pointerId: number;
  startPointerX: number;
  startPointerY: number;
  startRect: WindowRect;
  handle?: ResizeHandle;
}

interface Options {
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
  minWidth: number;
  minHeight: number;
  movable: Readonly<Ref<boolean>>;
  resizable: Readonly<Ref<boolean>>;
  bounds: () => WindowBounds;
  bringToFront: () => number;
  onMaximizeChange: (isMaximized: boolean) => void;
}

const resizeHandles: ResizeHandle[] = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

export function useWindowControls(options: Options) {
  const rect = reactive<WindowRect>({
    x: options.initialX,
    y: options.initialY,
    width: options.initialWidth,
    height: options.initialHeight,
  });
  const restoredRect = ref<WindowRect>({ ...rect });
  const isMaximized = ref(false);
  const interaction = ref<Interaction | null>(null);
  const zIndex = ref(1);
  let gsapInstance: (typeof import("gsap"))["gsap"] | undefined;
  let activeTween: ReturnType<(typeof import("gsap"))["gsap"]["to"]> | undefined;

  const windowStyle = computed<CSSProperties>(() => ({
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transform: `translate3d(${rect.x}px, ${rect.y}px, 0)`,
    zIndex: zIndex.value,
  }));

  function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), Math.max(min, max));
  }

  function fitRectToBounds(source: WindowRect): WindowRect {
    const bounds = options.bounds();
    if (bounds.width <= 0 || bounds.height <= 0) return { ...source };

    const width = clamp(source.width, Math.min(options.minWidth, bounds.width), bounds.width);
    const height = clamp(source.height, Math.min(options.minHeight, bounds.height), bounds.height);

    return {
      x: clamp(source.x, 0, bounds.width - width),
      y: clamp(source.y, 0, bounds.height - height),
      width,
      height,
    };
  }

  function focusWindow() {
    zIndex.value = options.bringToFront();
  }

  function isInteractiveTarget(target: EventTarget | null) {
    if (!(target instanceof Element)) return false;

    return Boolean(
      target.closest(
        "button, a, input, textarea, select, option, [contenteditable='true'], [data-window-no-drag]",
      ),
    );
  }

  function startDrag(event: PointerEvent, element: HTMLElement) {
    focusWindow();
    if (
      !options.movable.value ||
      isMaximized.value ||
      event.button !== 0 ||
      isInteractiveTarget(event.target)
    )
      return;

    interaction.value = {
      type: "drag",
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startRect: { ...rect },
    };
    element.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function startResize(event: PointerEvent, handle: ResizeHandle, element: HTMLElement) {
    focusWindow();
    if (!options.resizable.value || isMaximized.value || event.button !== 0) return;

    interaction.value = {
      type: "resize",
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startRect: { ...rect },
      handle,
    };
    element.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function onPointerMove(event: PointerEvent) {
    const current = interaction.value;
    if (!current || current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - current.startPointerX;
    const deltaY = event.clientY - current.startPointerY;
    const bounds = options.bounds();
    const start = current.startRect;

    if (current.type === "drag") {
      rect.x = clamp(start.x + deltaX, 0, bounds.width - start.width);
      rect.y = clamp(start.y + deltaY, 0, bounds.height - start.height);
      return;
    }

    const handle = current.handle!;
    const minWidth = Math.min(options.minWidth, bounds.width);
    const minHeight = Math.min(options.minHeight, bounds.height);
    let left = start.x;
    let top = start.y;
    let right = start.x + start.width;
    let bottom = start.y + start.height;

    if (handle.includes("e")) right = clamp(right + deltaX, left + minWidth, bounds.width);
    if (handle.includes("s")) bottom = clamp(bottom + deltaY, top + minHeight, bounds.height);
    if (handle.includes("w")) left = clamp(left + deltaX, 0, right - minWidth);
    if (handle.includes("n")) top = clamp(top + deltaY, 0, bottom - minHeight);

    Object.assign(rect, { x: left, y: top, width: right - left, height: bottom - top });
  }

  function endInteraction(event: PointerEvent) {
    if (interaction.value?.pointerId === event.pointerId) interaction.value = null;
  }

  function animateTo(target: WindowRect) {
    activeTween?.kill();
    if (!gsapInstance) {
      Object.assign(rect, target);
      return;
    }

    const state = { ...rect };
    activeTween = gsapInstance.to(state, {
      ...target,
      duration: 0.35,
      ease: "power3.inOut",
      overwrite: true,
      onUpdate: () => Object.assign(rect, state),
      onComplete: () => {
        Object.assign(rect, target);
        activeTween = undefined;
      },
    });
  }

  function maximize() {
    if (isMaximized.value) return;

    const bounds = options.bounds();
    restoredRect.value = { ...rect };
    isMaximized.value = true;
    options.onMaximizeChange(true);
    animateTo({ x: 0, y: 0, width: bounds.width, height: bounds.height });
  }

  function restore() {
    if (!isMaximized.value) return;

    isMaximized.value = false;
    options.onMaximizeChange(false);
    animateTo(fitRectToBounds(restoredRect.value));
  }

  function toggleMaximized() {
    focusWindow();
    isMaximized.value ? restore() : maximize();
  }

  function updateBounds(bounds: WindowBounds) {
    if (bounds.width <= 0 || bounds.height <= 0) return;

    if (isMaximized.value) {
      activeTween?.kill();
      Object.assign(rect, { x: 0, y: 0, width: bounds.width, height: bounds.height });
      return;
    }

    Object.assign(rect, fitRectToBounds(rect));
  }

  async function initialize() {
    focusWindow();
    Object.assign(rect, fitRectToBounds(rect));
    const gsapModule = await import("gsap");
    gsapInstance = gsapModule.gsap;
  }

  function dispose() {
    activeTween?.kill();
  }

  return {
    rect: readonly(rect),
    isMaximized: readonly(isMaximized),
    interaction: readonly(interaction),
    resizeHandles,
    windowStyle,
    startDrag,
    startResize,
    onPointerMove,
    endInteraction,
    focusWindow,
    toggleMaximized,
    maximize,
    restore,
    updateBounds,
    initialize,
    dispose,
  };
}
