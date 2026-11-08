<template>
  <!-- ContextMenu -->
  <ContextMenu>
    <ContextMenuTrigger>
      <slot />
    </ContextMenuTrigger>

    <ContextMenuContent class="w-52">
      <ContextMenuItem disabled inset>
        剪下
        <ContextMenuShortcut>Ctrl+X</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem @mousedown.prevent @click="handleCopy">
        <PhCopy size="32" weight="thin" />
        複製
        <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <PhLink :size="32" weight="thin" />
          導航至
        </ContextMenuSubTrigger>

        <ContextMenuSubContent>
          <NuxtLink v-for="item in navConfig" class="unstyled" :to="item.path">
            <ContextMenuItem>
              <component :is="item.icon" :filled="true" class="!size-6" />
              {{ item.title }}
            </ContextMenuItem>
          </NuxtLink>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuSeparator />

      <a
        href="https://github.com/tcfsh-ddc/tcfsh-ddc.github.io"
        class="unstyled"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="檢視網頁原始碼（新分頁開啟）"
      >
        <ContextMenuItem>
          <PhCode :size="32" weight="thin" />
          原始碼
        </ContextMenuItem>
      </a>
    </ContextMenuContent>
  </ContextMenu>
</template>

<script setup>
import { navConfig } from "~/config/nav";

import { ref } from "vue";
import { PhCode, PhCopy, PhLink } from "@phosphor-icons/vue";
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

async function handleCopy() {
  const selection = window.getSelection();

  if (!selection) return;

  const text = selection.toString().trim();
  console.log("[handleCopy] Selected text:", text);

  console.log({
    selection,
    text: selection?.toString(),
    rangeCount: selection?.rangeCount,
    isCollapsed: selection?.isCollapsed,
    anchorNode: selection?.anchorNode,
    focusNode: selection?.focusNode,
  });

  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    console.log("[handleCopy] Copy successful:", text);
  } catch (error) {
    console.error("[handleCopy] Copy failed:", error);
  }
}
</script>
