<template>
  <RekaContextMenuSubTrigger
    v-bind="$attrs"
    class="group flex min-h-10 cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-0 text-base leading-2 outline-none transition-colors duration-150 hover:bg-black-700 data-[highlighted]:bg-black-700 data-[state=open]:bg-black-700 data-[disabled]:pointer-events-none data-[disabled]:opacity-40 motion-reduce:transition-none"
    :class="[{ 'pl-9': inset }, $attrs.class]"
  >
    <span
      class="flex min-w-0 items-center gap-3 [&_svg]:size-5 [&_svg]:shrink-0"
    >
      <slot />
    </span>
    <PhCaretRight
      :size="16"
      weight="bold"
      aria-hidden="true"
      class="shrink-0 text-black-300 transition-transform duration-150 group-hover:translate-x-0.5 group-data-[highlighted]:translate-x-0.5 group-data-[state=open]:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
    />
  </RekaContextMenuSubTrigger>
</template>

<script setup lang="ts">
import { PhCaretRight } from "@phosphor-icons/vue";
import { ContextMenuSubTrigger as RekaContextMenuSubTrigger } from "reka-ui";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ inset?: boolean }>(), { inset: false });
</script>
