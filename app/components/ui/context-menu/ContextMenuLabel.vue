<template>
  <RekaContextMenuLabel
    v-bind="$attrs"
    class="px-3 py-2 text-xs font-semibold text-black-300"
    :class="$attrs.class"
  >
    <slot />
  </RekaContextMenuLabel>
</template>

<script setup lang="ts">
import { ContextMenuLabel as RekaContextMenuLabel } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
