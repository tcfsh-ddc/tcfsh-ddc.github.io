<template>
  <RekaContextMenuLabel
    v-bind="$attrs"
    class="px-3 py-2 text-base leading-6 font-semibold text-black-300"
    :class="[{ 'pl-11': inset }, $attrs.class]"
  >
    <slot />
  </RekaContextMenuLabel>
</template>

<script setup lang="ts">
import { ContextMenuLabel as RekaContextMenuLabel } from "reka-ui";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ inset?: boolean }>(), { inset: false });
</script>
