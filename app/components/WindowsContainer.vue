<template>
  <div ref="containerElement" class="windows-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { windowsContainerKey } from "~/utils/windows";

const containerElement = ref<HTMLElement | null>(null);
const bounds = shallowRef({ width: 0, height: 0 });
let resizeObserver: ResizeObserver | undefined;
let topZIndex = 0;
const windows = new Map<
  symbol,
  { close: () => void; isOpen: () => boolean; zIndex: () => number }
>();

function updateBounds() {
  const element = containerElement.value;

  if (!element) return;

  bounds.value = {
    width: element.clientWidth,
    height: element.clientHeight,
  };
}

function bringToFront(_windowId: symbol) {
  topZIndex += 1;
  return topZIndex;
}

function registerWindow(
  windowId: symbol,
  window: { close: () => void; isOpen: () => boolean; zIndex: () => number },
) {
  windows.set(windowId, window);
}

function unregisterWindow(windowId: symbol) {
  windows.delete(windowId);
}

function closeActiveWindow() {
  const activeWindow = [...windows.values()]
    .filter((window) => window.isOpen())
    .sort((a, b) => b.zIndex() - a.zIndex())[0];
  if (!activeWindow) return false;

  activeWindow.close();
  return true;
}

provide(windowsContainerKey, {
  element: readonly(containerElement),
  bounds: readonly(bounds),
  bringToFront,
  registerWindow,
  unregisterWindow,
});

onMounted(() => {
  updateBounds();
  resizeObserver = new ResizeObserver(updateBounds);
  resizeObserver.observe(containerElement.value!);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});

defineExpose({
  element: containerElement,
  bounds,
  closeActiveWindow,
});
</script>

<style scoped>
.windows-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  isolation: isolate;
}
</style>
