<template>
  <div class="link-card">
    <div
      class="card-mark"
      :class="`card-mark--${item.tag}`"
      :style="{
        'background-color': item.color,
        'box-shadow': `12px 0 24px 0 ${item.color}80`,
      }"
      aria-hidden="true"
    >
      <img
        :src="item.image"
        :alt="`${item.name}的${item.tag === 'personal' ? '頭像' : '圖示'}`"
        class="mx-3"
      />
    </div>

    <div class="card-content flex min-w-0 flex-1 flex-col justify-center">
      <div class="card-heading min-w-0">
        <h2 class="text-xl font-bold" :title="item.name">
          {{ item.name }}
        </h2>

        <div class="card-meta flex min-w-0 items-center gap-2 text-sm">
          <span class="category-tag text-sm"> #{{ tagLabels[item.tag] }} </span>

          <span class="card-handle" :title="item.slug"> @{{ item.slug }} </span>
        </div>
      </div>

      <p class="card-description text-base">
        {{ item.description }}
      </p>

      <TooltipProvider>
        <div
          class="card-links flex items-center gap-2"
          :aria-label="`${item.name}的連結`"
        >
          <Tooltip v-for="link in item.links" :key="`${link.type}-${link.url}`">
            <TooltipTrigger as-child>
              <a
                :href="link.url"
                :aria-label="`${item.name}：${linkLabels[link.type]}`"
                :title="`${linkLabels[link.type]} · ${link.url}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                <component
                  :is="linkIcons[link.type]"
                  :size="20"
                  weight="regular"
                  aria-hidden="true"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              {{ linkLabels[link.type] }} · {{ link.url }}
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PhDiscordLogo,
  PhFacebookLogo,
  PhGlobeHemisphereWest,
  PhGraduationCap,
  PhInstagramLogo,
  PhLinkSimple,
  PhSpeakerHigh,
  PhThreadsLogo,
  PhUserCircle,
  PhUsersThree,
  PhGithubLogo,
} from "@phosphor-icons/vue";
import TooltipProvider from "~/components/ui/TooltipProvider.vue";
import Tooltip from "~/components/ui/Tooltip.vue";
import TooltipContent from "~/components/ui/TooltipContent.vue";
import TooltipTrigger from "~/components/ui/TooltipTrigger.vue";

import type { LinkList, Links } from "~/config/links";

defineProps<{
  item: Links;
}>();

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

const linkIcons = {
  website: PhGlobeHemisphereWest,
  "link-in-bio": PhLinkSimple,
  github: PhGithubLogo,
  facebook: PhFacebookLogo,
  instagram: PhInstagramLogo,
  threads: PhThreadsLogo,
  discord: PhDiscordLogo,
} satisfies Record<LinkList["type"], typeof PhLinkSimple>;
</script>

<style scoped>
.link-card {
  display: flex;
  min-width: 0;
  min-height: 170px;
  overflow: hidden;
  color: #f3f3f3;
  background: #272727;
  border: 1px solid #454545;
  border-radius: 8px;
  transition:
    border-color 150ms ease,
    background-color 150ms ease;
}

.link-card:hover {
  border-color: #606060;
  background: #2c2c2c;
}

.card-mark {
  display: flex;
  flex: 0 0 92px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow: hidden;
  color: #f3f3f3;
  box-shadow: 8px 0 12px rgb(0 0 0 / 16%);
}

.card-mark span {
  max-width: 82px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.85;
}

/* .card-mark--club {
  background: #fe01cb;
}

.card-mark--personal {
  background: #215cff;
}

.card-mark--organization {
  background: #0aa889;
}

.card-mark--activity {
  background: #bd6b16;
} */

.card-content {
  gap: 8px;
  padding: 12px 14px;
  overflow: hidden;
}

.card-heading {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-heading {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-meta {
  min-height: 22px;
  color: #b0b0b0;
}

.category-tag {
  flex: 0 0 auto;
  padding: 2px 7px;
  color: #f3f3f3;
  background: #454545;
  border-radius: 4px;
}

.card-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-description {
  display: -webkit-box;
  /* flex: 1 1 auto; */
  overflow: hidden;
  margin: 0;
  color: #dedede;
  line-height: 1.6;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.card-links {
  color: #cbcbcb;
}

.card-links a {
  display: grid;
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  place-items: center;
  color: inherit;
  border-radius: 5px;
  transition:
    color 120ms ease,
    background-color 120ms ease,
    transform 120ms ease;
}

.card-links a:hover,
.card-links a:focus-visible {
  color: #0fffc4;
  background: #454545;
  outline: none;
}

@media (max-width: 380px) {
  .card-mark {
    flex-basis: 68px;
  }

  .card-mark span {
    max-width: 60px;
  }

  .card-content {
    padding: 9px;
  }
}
</style>
