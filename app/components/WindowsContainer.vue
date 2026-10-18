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

function updateBounds() {
  const element = containerElement.value;

  if (!element) return;

  bounds.value = {
    width: element.clientWidth,
    height: element.clientHeight,
  };
}

function bringToFront() {
  topZIndex += 1;
  return topZIndex;
}

provide(windowsContainerKey, {
  element: readonly(containerElement),
  bounds: readonly(bounds),
  bringToFront,
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
