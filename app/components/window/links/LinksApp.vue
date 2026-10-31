<template>
  <Window
    :initial-x="0"
    :initial-y="0"
    :show-close-button="false"
    :maxable="false"
    :content-padding="false"
    :allow-double-maxmize="false"
    :movable="false"
    :resizable="false"
    default-status="maxmium"
  >
    <template #titlebar>
      <p class="text-base font-semibold text-black-50">友情連結 - DDCBase</p>
    </template>

    <div
      class="links-view flex flex-col md:flex-row max-h-full h-full min-h-0 w-full gap-3 p-2"
    >
      <LinksSidebar
        :filtered-links="filteredLinks"
        v-model:active-filter="activeFilter"
        :filters="filters"
        v-model:query="query"
      />

      <LinksGrid :links="filteredLinks" @reset="resetFilters" />
    </div>
  </Window>
</template>

<script setup lang="ts">
import {
  PhGraduationCap,
  PhHouse,
  PhSpeakerHigh,
  PhUserCircle,
  PhUsersThree,
} from "@phosphor-icons/vue";

import { links, type LinkList, type Links } from "~/config/links";
import LinksSidebar from "./composes/LinksSidebar.vue";
import LinksGrid from "./composes/LinksGrid.vue";

type FilterValue = Links["tag"] | "all";

const query = ref("");
const activeFilter = ref<FilterValue>("all");

const tagLabels: Record<Links["tag"], string> = {
  club: "社團",
  organization: "組織",
  activity: "相關活動",
  personal: "人物",
};

const linkLabels: Record<LinkList["type"], string> = {
  website: "網站",
  "link-in-bio": "連結列表",
  github: "GitHub",
  facebook: "Facebook",
  instagram: "Instagram",
  threads: "Threads",
  discord: "Discord",
};

const filters = computed(() => [
  {
    value: "all" as const,
    label: "全部連結",
    icon: PhHouse,
    count: links.length,
  },
  {
    value: "club" as const,
    label: tagLabels.club,
    icon: PhGraduationCap,
    count: countByTag("club"),
  },
  {
    value: "organization" as const,
    label: tagLabels.organization,
    icon: PhUsersThree,
    count: countByTag("organization"),
  },
  {
    value: "activity" as const,
    label: tagLabels.activity,
    icon: PhSpeakerHigh,
    count: countByTag("activity"),
  },
  {
    value: "personal" as const,
    label: tagLabels.personal,
    icon: PhUserCircle,
    count: countByTag("personal"),
  },
]);

const filteredLinks = computed(() => {
  const normalizedQuery = query.value.trim().toLocaleLowerCase();

  return links.filter((item) => {
    const matchesFilter =
      activeFilter.value === "all" || item.tag === activeFilter.value;

    const searchableText = [
      item.name,
      item.description,
      item.slug,
      tagLabels[item.tag],
      ...item.links.map((link) => `${linkLabels[link.type]} ${link.url}`),
    ]
      .join(" ")
      .toLocaleLowerCase();

    return (
      matchesFilter &&
      (!normalizedQuery || searchableText.includes(normalizedQuery))
    );
  });
});

function countByTag(tag: Links["tag"]) {
  return links.filter((item) => item.tag === tag).length;
}

function resetFilters() {
  query.value = "";
  activeFilter.value = "all";
}
</script>

<style scoped>
.links-view {
  background: #191919;
  border-radius: 12px;
  overflow: hidden;
}

.window-title {
  color: #f3f3f3;
  font-size: 15px;
  font-weight: 600;
}
</style>
