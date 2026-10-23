<template>
  <RekaContextMenuItem
    v-bind="$attrs"
    class="flex min-h-9 cursor-pointer items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:bg-purple focus:text-black-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-40"
    :class="$attrs.class"
  >
    <slot />
  </RekaContextMenuItem>
</template>

<script setup lang="ts">
import { ContextMenuItem as RekaContextMenuItem } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
