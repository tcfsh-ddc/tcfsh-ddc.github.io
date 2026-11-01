<template>
  <HoverCardPortal>
    <RekaHoverCardContent
      v-bind="$attrs"
      :side-offset="sideOffset"
      class="sh-hover-card-content z-50 w-72 rounded-xl border border-black-700 bg-black-800 p-4 text-black-50 shadow-xl outline-none"
      :class="$attrs.class"
    >
      <slot />
    </RekaHoverCardContent>
  </HoverCardPortal>
</template>

<script setup lang="ts">
import {
  HoverCardContent as RekaHoverCardContent,
  HoverCardPortal,
} from "reka-ui";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ sideOffset?: number }>(), { sideOffset: 8 });
</script>

<style scoped>
.sh-hover-card-content {
  transform-origin: var(--reka-hover-card-content-transform-origin);
  will-change: transform, opacity;
}

.sh-hover-card-content[data-state="open"] {
  animation: hover-card-in 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.sh-hover-card-content[data-state="closed"] {
  animation: hover-card-out 120ms ease-in;
}

@keyframes hover-card-in {
  from {
    opacity: 0;
    transform: translate3d(var(--hover-card-x, 0), var(--hover-card-y, 0), 0)
      scale(0.96);
  }
}

@keyframes hover-card-out {
  to {
    opacity: 0;
    transform: scale(0.96);
  }
}

.sh-hover-card-content[data-side="bottom"] { --hover-card-y: -4px; }
.sh-hover-card-content[data-side="top"] { --hover-card-y: 4px; }
.sh-hover-card-content[data-side="left"] { --hover-card-x: 4px; }
.sh-hover-card-content[data-side="right"] { --hover-card-x: -4px; }

@media (prefers-reduced-motion: reduce) {
  .sh-hover-card-content { animation: none !important; }
}
</style>
