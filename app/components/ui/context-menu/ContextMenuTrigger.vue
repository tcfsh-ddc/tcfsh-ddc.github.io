<template>
  <RekaContextMenuTrigger v-bind="$attrs" as-child>
    <slot />
  </RekaContextMenuTrigger>
</template>

<script setup lang="ts">
import { ContextMenuTrigger as RekaContextMenuTrigger } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
