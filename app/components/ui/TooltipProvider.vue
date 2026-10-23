<template>
  <RekaTooltipProvider v-bind="$attrs" :delay-duration="delayDuration">
    <slot />
  </RekaTooltipProvider>
</template>

<script setup lang="ts">
import { TooltipProvider as RekaTooltipProvider } from "reka-ui";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ delayDuration?: number }>(), {
  delayDuration: 300,
});
</script>
