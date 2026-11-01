<template>
  <ContextMenuPortal>
    <RekaContextMenuSubContent
      v-bind="$attrs"
      :side-offset="sideOffset"
      class="sh-context-menu-content z-50 min-w-40 overflow-hidden rounded-xl border border-black-700 bg-black-800 p-1 text-black-50 shadow-xl outline-none"
      :class="$attrs.class"
    >
      <slot />
    </RekaContextMenuSubContent>
  </ContextMenuPortal>
</template>

<script setup lang="ts">
import {
  ContextMenuPortal,
  ContextMenuSubContent as RekaContextMenuSubContent,
} from "reka-ui";

defineOptions({ inheritAttrs: false });

withDefaults(defineProps<{ sideOffset?: number }>(), { sideOffset: 4 });
</script>
