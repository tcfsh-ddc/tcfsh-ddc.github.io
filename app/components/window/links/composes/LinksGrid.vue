<template>
  <section
    class="link-results min-h-0 min-w-0 flex-1"
    aria-label="友情連結列表"
  >
    <div
      v-if="links.length"
      class="link-grid grid gap-3 p-3 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
    >
      <LinkCard v-for="item in links" :key="item.slug" :item="item" />
    </div>

    <div
      v-else
      class="empty-state flex h-full flex-col items-center justify-center text-center"
    >
      <PhLinkBreak :size="48" weight="duotone" aria-hidden class="text-white" />

      <p class="text-lg">找不到符合條件的連結</p>

      <button type="button" class="text-base" @click="$emit('reset')">
        清除搜尋與篩選
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Links } from "~/config/links";
import { PhLinkBreak } from "@phosphor-icons/vue";
import LinkCard from "./LinkCard.vue";

defineProps<{
  links: Links[];
}>();

defineEmits<{
  reset: [];
}>();
</script>

<style scoped>
.link-results {
  overflow: auto;
}

.empty-state {
  min-height: 100%;
  gap: 12px;
  color: #a0a0a0;
}

.empty-state p {
  margin: 0;
  color: #cbcbcb;
  font-size: 16px;
}

.empty-state button {
  padding: 6px 10px;
  color: #0fffc4;
  cursor: pointer;
  font-size: 14px;
}

@media (max-width: 1100px) {
  .link-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .link-grid {
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: minmax(150px, auto);
    padding: 8px 2px 8px 0;
  }
}
</style>
