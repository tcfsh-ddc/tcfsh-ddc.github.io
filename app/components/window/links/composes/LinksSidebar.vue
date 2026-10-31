<template>
  <aside
    class="links-sidebar flex shrink-0 flex-col h-fit lg:h-full"
    aria-label="連結搜尋與分類"
  >
    <p class="sidebar-heading text-lg font-semibold">謝謝你們喜歡數創</p>

    <label class="search-field flex items-center gap-2">
      <PhMagnifyingGlass :size="20" weight="regular" aria-hidden="true" />

      <input
        v-model="query"
        type="search"
        class="text-base"
        placeholder="搜尋友社或人員"
        aria-label="搜尋友社或人員"
      />

      <button
        v-if="query"
        type="button"
        class="clear-search grid shrink-0 place-items-center"
        aria-label="清除搜尋"
        title="清除搜尋"
        @click="query = ''"
      >
        <PhX :size="16" aria-hidden="true" />
      </button>
    </label>

    <nav class="filter-list" aria-label="連結分類">
      <button
        v-for="filter in filters"
        :key="filter.value"
        type="button"
        class="filter-option flex w-full items-center gap-2 text-left text-base"
        :class="{ 'is-active': activeFilter === filter.value }"
        :aria-pressed="activeFilter === filter.value"
        @click="activeFilter = filter.value"
      >
        <component
          :is="filter.icon"
          :size="20"
          weight="duotone"
          aria-hidden="true"
        />

        <span>{{ filter.label }}</span>

        <span class="filter-count text-sm">
          {{ filter.count }}
        </span>
      </button>
    </nav>

    <p class="sidebar-total text-sm">{{ props.filteredLinks.length }} 個連結</p>
  </aside>
</template>

<script setup lang="ts">
import type { Links } from "~/config/links";
import { PhMagnifyingGlass, PhX } from "@phosphor-icons/vue";

interface Filters {
  value: string;
  label: string;
  icon: typeof PhMagnifyingGlass;
  count: number;
}

interface Props {
  filteredLinks: Links[];
  filters: Filters[];
}

const props = defineProps<Props>();

const query = defineModel<string>("query", {
  required: true,
});

const activeFilter = defineModel<string>("activeFilter", {
  required: true,
});
</script>

<style scoped>
.links-sidebar {
  width: 220px;
  max-width: 32%;
  padding: 12px 6px 10px 0;
  color: #f3f3f3;
  background: #272727;
  border-radius: 8px;
}

.sidebar-heading {
  padding: 0 8px 0 14px;
  margin: 0 0 18px;
  font-weight: 600;
  line-height: 1.5;
}

.search-field {
  min-height: 40px;
  margin: 0 0 14px 6px;
  padding: 7px 9px;
  color: #b5b5b5;
  background: #191919;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}

.search-field input {
  width: 100%;
  min-width: 0;
  padding: 0;
  color: #f3f3f3;
  background: transparent;
  border: 0;
  outline: 0;
}

.search-field input::placeholder {
  color: #a0a0a0;
  opacity: 1;
}

.search-field input::-webkit-search-cancel-button {
  display: none;
}

.clear-search {
  width: 22px;
  height: 22px;
  color: #a0a0a0;
  cursor: pointer;
}

.filter-list {
  display: flex;
  flex-direction: column;
}

.filter-option {
  min-height: 38px;
  padding: 7px 8px 7px 14px;
  color: #cbcbcb;
  cursor: pointer;
  transition:
    background-color 120ms ease,
    color 120ms ease;
}

.filter-option:hover {
  color: #fff;
  background: #363636;
}

.filter-option.is-active {
  color: #f3f3f3;
  background: #454545;
  border-radius: 0 6px 6px 0;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}

.filter-count {
  margin-left: auto;
  color: #b0b0b0;
  font-variant-numeric: tabular-nums;
}

.sidebar-total {
  margin: auto 8px 2px 14px;
  color: #b0b0b0;
}

@media (max-width: 720px) {
  .links-sidebar {
    width: 100%;
    max-width: none;
    padding: 8px;
    flex: 0 0 auto;
  }

  .sidebar-heading {
    margin: 0 0 10px;
  }

  .search-field {
    margin: 0 0 10px;
  }

  .filter-list {
    flex-direction: row;
    gap: 4px;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .filter-option {
    width: auto;
    min-height: 34px;
    flex: 0 0 auto;
    gap: 5px;
    padding: 6px 9px;
    border-radius: 5px;
  }

  .filter-option.is-active {
    border-radius: 5px;
  }

  .filter-count,
  .sidebar-total {
    display: none;
  }
}
</style>
