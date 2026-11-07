<template>
  <RekaContextMenuItem
    v-bind="$attrs"
    class="group flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 py-0 text-base leading-6 outline-none transition-colors duration-150 data-[disabled]:pointer-events-none data-[disabled]:opacity-40 motion-reduce:transition-none [&_svg]:size-5 [&_svg]:shrink-0"
    :class="[
      { 'pl-9': inset },
      variant === 'destructive'
        ? 'text-red-400 hover:bg-red-500/15 data-[highlighted]:bg-red-500/15'
        : 'hover:bg-black-700 data-[highlighted]:bg-black-700',
      $attrs.class,
    ]"
  >
    <slot />
  </RekaContextMenuItem>
</template>

<script setup lang="ts">
import { ContextMenuItem as RekaContextMenuItem } from "reka-ui";

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{ inset?: boolean; variant?: "default" | "destructive" }>(),
  {
    inset: false,
    variant: "default",
  },
);
</script>
