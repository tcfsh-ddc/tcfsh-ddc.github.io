<template>
  <RekaContextMenuSubTrigger
    v-bind="$attrs"
    class="flex min-h-9 cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:bg-purple focus:text-black-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-40"
    :class="$attrs.class"
  >
    <span class="min-w-0"><slot /></span>
    <PhCaretRight :size="14" weight="bold" aria-hidden="true" />
  </RekaContextMenuSubTrigger>
</template>

<script setup lang="ts">
import { PhCaretRight } from "@phosphor-icons/vue";
import { ContextMenuSubTrigger as RekaContextMenuSubTrigger } from "reka-ui";

defineOptions({ inheritAttrs: false });
</script>
