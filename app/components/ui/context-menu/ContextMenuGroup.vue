<template>
  <RekaContextMenuGroup v-bind="$attrs">
    <slot />
  </RekaContextMenuGroup>
</template>

<script setup lang="ts">
import { ContextMenuGroup as RekaContextMenuGroup } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
