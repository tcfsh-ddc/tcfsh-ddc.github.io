<template>
  <HoverCardRoot v-bind="$attrs">
    <slot />
  </HoverCardRoot>
</template>

<script setup lang="ts">
import { HoverCardRoot } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
