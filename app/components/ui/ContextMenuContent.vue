<template>
  <ContextMenuPortal>
    <RekaContextMenuContent
      v-bind="$attrs"
      class="sh-context-menu-content z-50 min-w-40 overflow-hidden rounded-xl border border-black-700 bg-black-800 p-1 text-black-50 shadow-xl outline-none"
      :class="$attrs.class"
    >
      <slot />
    </RekaContextMenuContent>
  </ContextMenuPortal>
</template>

<script setup lang="ts">
import {
  ContextMenuContent as RekaContextMenuContent,
  ContextMenuPortal,
} from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>

<style scoped>
.sh-context-menu-content {
  transform-origin: var(--reka-context-menu-content-transform-origin);
  will-change: transform, opacity;
}

.sh-context-menu-content[data-state="open"] {
  animation: context-menu-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.sh-context-menu-content[data-state="closed"] {
  animation: context-menu-out 100ms ease-in;
}

@keyframes context-menu-in {
  from {
    opacity: 0;
    transform: translate3d(
        var(--context-menu-x, 0),
        var(--context-menu-y, 0),
        0
      )
      scale(0.96);
  }
}

@keyframes context-menu-out {
  to {
    opacity: 0;
    transform: scale(0.96);
  }
}

.sh-context-menu-content[data-side="bottom"] {
  --context-menu-y: -4px;
}

.sh-context-menu-content[data-side="top"] {
  --context-menu-y: 4px;
}

.sh-context-menu-content[data-side="left"] {
  --context-menu-x: 4px;
}

.sh-context-menu-content[data-side="right"] {
  --context-menu-x: -4px;
}

@media (prefers-reduced-motion: reduce) {
  .sh-context-menu-content {
    animation: none !important;
  }
}
</style>
