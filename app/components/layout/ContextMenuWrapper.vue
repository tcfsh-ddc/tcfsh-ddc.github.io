<template>
  <!-- ContextMenu -->
  <ContextMenu>
    <ContextMenuTrigger>
      <slot />
    </ContextMenuTrigger>

    <ContextMenuContent class="w-52">
      <ContextMenuItem inset>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset disabled>
        Forward
        <ContextMenuShortcut>⌘]</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset>
        Reload
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
        <ContextMenuSubContent class="w-44">
          <ContextMenuItem inset>
            Save Page...
            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <PhPlus :size="32" weight="thin" class="text-black-50" />
            Create Shortcut...
          </ContextMenuItem>
          <ContextMenuItem inset> Name Window... </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <PhCode :size="32" weight="thin" class="text-black-50" />
            Developer Tools
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <PhTrash :size="32" weight="thin" class="text-black-50" />
            Delete
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </ContextMenuContent>
  </ContextMenu>
</template>

<script setup>
import { ref } from "vue";
import { PhCode, PhPlus, PhTrash } from "@phosphor-icons/vue";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";

const feature = ref();
</script>
