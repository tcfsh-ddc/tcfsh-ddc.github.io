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
.sh-tooltip-content {
  transform-origin: var(--reka-tooltip-content-transform-origin);
  will-change: transform, opacity;
}

.sh-tooltip-content[data-state="instant-open"],
.sh-tooltip-content[data-state="delayed-open"] {
  animation: tooltip-in 160ms cubic-bezier(0.16, 1, 0.3, 1);
}

.sh-tooltip-content[data-state="closed"] {
  animation: tooltip-out 100ms ease-in;
}

@keyframes tooltip-in {
  from {
    opacity: 0;
    transform: translate3d(var(--tooltip-x, 0), var(--tooltip-y, 0), 0)
      scale(0.96);
  }
}

@keyframes tooltip-out {
  to {
    opacity: 0;
    transform: scale(0.96);
  }
}

.sh-tooltip-content[data-side="bottom"] { --tooltip-y: -4px; }
.sh-tooltip-content[data-side="top"] { --tooltip-y: 4px; }
.sh-tooltip-content[data-side="left"] { --tooltip-x: 4px; }
.sh-tooltip-content[data-side="right"] { --tooltip-x: -4px; }

@media (prefers-reduced-motion: reduce) {
  .sh-tooltip-content { animation: none !important; }
}
</style>
