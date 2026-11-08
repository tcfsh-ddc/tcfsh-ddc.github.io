<template>
  <RekaContextMenuSeparator
    v-bind="$attrs"
    class="mx-1 my-1 h-px bg-black-700"
    :class="$attrs.class"
  />
</template>

<script setup lang="ts">
import { ContextMenuSeparator as RekaContextMenuSeparator } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
