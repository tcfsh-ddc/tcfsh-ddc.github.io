<template>
  <DropdownMenuTrigger v-bind="$attrs" as-child>
    <slot />
  </DropdownMenuTrigger>
</template>

<script setup lang="ts">
import { DropdownMenuTrigger } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
