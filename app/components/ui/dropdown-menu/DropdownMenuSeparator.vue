<template>
  <DropdownMenuSeparator
    v-bind="$attrs"
    class="my-1.5 h-px bg-black-700"
  />
</template>

<script setup lang="ts">
import { DropdownMenuSeparator } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
