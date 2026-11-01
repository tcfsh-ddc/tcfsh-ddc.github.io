<template>
  <RekaContextMenuSub v-bind="$attrs">
    <slot />
  </RekaContextMenuSub>
</template>

<script setup lang="ts">
import { ContextMenuSub as RekaContextMenuSub } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
