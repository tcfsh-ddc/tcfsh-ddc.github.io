<template>
  <RekaHoverCardTrigger v-bind="$attrs" as-child>
    <slot />
  </RekaHoverCardTrigger>
</template>

<script setup lang="ts">
import { HoverCardTrigger as RekaHoverCardTrigger } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
