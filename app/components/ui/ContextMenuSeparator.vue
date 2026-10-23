<template>
  <RekaContextMenuSeparator
    v-bind="$attrs"
    class="my-1.5 h-px bg-black-700"
  />
</template>

<script setup lang="ts">
import { ContextMenuSeparator as RekaContextMenuSeparator } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
