<template>
  <Window
    v-model:open="open"
    :show-close-button="true"
    class="demo-window demo-window--notes"
    :initial-x="600"
    :initial-y="70"
    :initial-width="390"
    :initial-height="500"
    :min-width="260"
    :min-height="190"
  >
    <template #titlebar>
      <p class="text-black-50">Q&A - 台中一中數位創作研究社</p>
    </template>

    <div class="flex min-h-0 min-w-0 flex-1 flex-col">
      <AccordionRoot
        default-value="item-1"
        type="single"
        :collapsible="true"
        class="grid min-h-0 min-w-0 flex-1 content-start grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-x-3 overflow-y-auto overflow-x-hidden"
      >
        <AccordionItem
          v-for="item in accordionItems"
          :key="item.value"
          :value="item.value"
          class="min-w-0 overflow-hidden border-b-2 border-gray-700"
        >
          <AccordionHeader class="flex min-w-0 p-1">
            <AccordionTrigger
              class="qa-trigger flex w-full min-w-0 items-start justify-between gap-2 text-base text-black-50 text-left"
            >
              <span
                class="min-w-0 flex-1 whitespace-normal [overflow-wrap:anywhere]"
              >
                {{ item.title }}
              </span>

              <PhPlus
                :size="16"
                class="shrink-0 text-purple transition-transform duration-300 data-[state=open]:rotate-45"
                weight="thin"
              />
            </AccordionTrigger>
          </AccordionHeader>

          <AccordionContent
            class="qa-content min-w-0 text-black-200 [overflow-wrap:anywhere]"
          >
            <div class="px-5 py-4 whitespace-pre-line">
              {{ item.content }}
            </div>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </div>
  </Window>
</template>

<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "reka-ui";
import { PhPlus } from "@phosphor-icons/vue";
import { qaConfig } from "@/config/qa";

const open = defineModel<boolean>("open", {
  default: false,
});

const accordionItems = qaConfig;
</script>

<style scoped>
@keyframes slideDown {
  from {
    height: 0;
  }

  to {
    height: var(--reka-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-accordion-content-height);
  }

  to {
    height: 0;
  }
}

.qa-trigger:hover {
  background-color: var(--mauve-2);
}

.qa-content {
  overflow: hidden;
}

.qa-content[data-state="open"] {
  animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
}

.qa-content[data-state="closed"] {
  animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
}
</style>
