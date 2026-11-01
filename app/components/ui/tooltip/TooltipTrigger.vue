<template>
  <RekaTooltipTrigger v-bind="$attrs" as-child>
    <slot />
  </RekaTooltipTrigger>
</template>

<script setup lang="ts">
import { TooltipTrigger as RekaTooltipTrigger } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
