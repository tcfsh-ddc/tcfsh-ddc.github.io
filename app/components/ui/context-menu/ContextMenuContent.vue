<template>
  <ContextMenuPortal>
    <RekaContextMenuContent
      v-bind="$attrs"
      :side-offset="sideOffset"
      class="sh-context-menu-content z-50 min-w-48 max-h-[var(--reka-context-menu-content-available-height)] overflow-x-hidden overflow-y-auto rounded-xl border border-black-700 bg-black-800 p-1 text-base leading-6 text-black-50 shadow-xl outline-none"
      :class="$attrs.class"
    >
      <slot />
    </RekaContextMenuContent>
  </ContextMenuPortal>
</template>

<script setup lang="ts">
import {
  ContextMenuContent as RekaContextMenuContent,
  ContextMenuPortal,
} from "reka-ui";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ sideOffset?: number }>(), { sideOffset: 4 });
</script>

<style src="./context-menu.css"></style>
