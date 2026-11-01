<template>
  <TooltipPortal>
    <RekaTooltipContent
      v-bind="$attrs"
      :side-offset="sideOffset"
      class="sh-tooltip-content z-50 max-w-64 rounded-lg bg-black-800 px-3 py-1.5 text-sm text-black-50 shadow-xl"
      :class="$attrs.class"
    >
      <slot />
      <TooltipArrow class="fill-black-800" :width="10" :height="5" />
    </RekaTooltipContent>
  </TooltipPortal>
</template>

<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent as RekaTooltipContent,
  TooltipPortal,
} from "reka-ui";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ sideOffset?: number }>(), { sideOffset: 6 });
</script>

<style scoped>
:deep(.sh-tooltip-content) {
  transform-origin: var(--reka-tooltip-content-transform-origin);
  will-change: transform, opacity;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

:deep(.sh-tooltip-content[data-state="delayed-open"][data-side="top"]) {
  animation-name: slideDownAndFade;
}
:deep(.sh-tooltip-content[data-state="delayed-open"][data-side="right"]) {
  animation-name: slideLeftAndFade;
}
:deep(.sh-tooltip-content[data-state="delayed-open"][data-side="bottom"]) {
  animation-name: slideUpAndFade;
}
:deep(.sh-tooltip-content[data-state="delayed-open"][data-side="left"]) {
  animation-name: slideRightAndFade;
}

:deep(.sh-tooltip-content[data-state="closed"]) {
  animation: tooltip-out 50ms ease-in;
  animation-duration: 100ms;
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes tooltip-out {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(0.96);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sh-tooltip-content {
    animation: none !important;
  }
}
</style>
