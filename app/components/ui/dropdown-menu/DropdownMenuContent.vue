<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="$attrs"
      :side-offset="sideOffset"
      class="sh-dropdown-menu-content z-50 min-w-40 overflow-hidden rounded-xl border border-black-700 bg-black-800 p-1 text-black-50 shadow-xl outline-none transition-[opacity,transform] duration-150 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 motion-reduce:transition-none"
      :class="$attrs.class"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>

<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal } from "reka-ui";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ sideOffset?: number }>(), { sideOffset: 6 });
</script>

<style>
.sh-dropdown-menu-content {
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.sh-dropdown-menu-content[data-side="top"] {
  animation-name: slideDownAndFade;
}
.sh-dropdown-menu-content[data-side="right"] {
  animation-name: slideLeftAndFade;
}
.sh-dropdown-menu-content[data-side="bottom"] {
  animation-name: slideUpAndFade;
}
.sh-dropdown-menu-content[data-side="left"] {
  animation-name: slideRightAndFade;
}
.sh-dropdown-menu-content[data-state="closed"] {
  animation-name: fadeOut;
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(4px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(4px);
  }
}
</style>
