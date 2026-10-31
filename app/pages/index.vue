<template>
  <div class="home-desktop relative">
    <WindowHomeWelcome
      v-model:open="welcomeOpen"
      @open-game-window="switchGameOpen"
      @open-paint-window="switchPaintOpen"
    />
    <WindowHomeQA v-model:open="qaOpen" />
    <WindowHomePaint v-model:open="paintOpen" />
    <WindowHomeGame v-model:open="gameOpen" />

    <div
      id="desktop-icons"
      class="absolute left-4 md:left-8 top-6 grid grid-flow-col-dense gap-8 grid-rows-8 grid-cols-2"
    >
      <button
        @click="switchQaOpen"
        class="flex flex-col gap-1 items-center justify-center cursor-pointer"
      >
        <SvgoMessage :filled="true" class="!size-10" />
        <span>社團Q＆A</span>
      </button>

      <button
        @click="switchPaintOpen"
        class="flex flex-col gap-1 items-center justify-center cursor-pointer"
      >
        <SvgoFileKrita :filled="true" class="!size-10" />
        <span>電繪組.kra</span>
      </button>

      <button
        @click="switchGameOpen"
        class="flex flex-col gap-1 items-center justify-center cursor-pointer"
      >
        <SvgoFileUnity :filled="true" class="!size-10" />
        <span>遊戲組.cs</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig, pageTitle } from "@/config/site";
const hostname = import.meta.env.VITE_SITE_URL || "https://tcfsh-ddc.github.io";

useHead({
  title: pageTitle("首頁"),
  meta: [
    {
      name: "description",
      content: siteConfig.description,
    },
  ],
});

useSeoMeta({
  title: siteConfig.name,
  ogTitle: siteConfig.name,
  description: siteConfig.description,
  ogDescription: siteConfig.description,
  ogImage: `${hostname}/opengraph/homepage-og.png`,
  ogUrl: `${hostname}/`,
  twitterCard: "summary_large_image",
  twitterTitle: siteConfig.name,
  twitterDescription: siteConfig.description,
  twitterImage: `${hostname}/opengraph/homepage-og.png`,
});

import { ref, watch, onMounted, onUnmounted } from "vue";
import "@/assets/css/markdown.css";

const welcomeOpen = ref(false);
const qaOpen = ref(false);
const paintOpen = ref(false);
const gameOpen = ref(false);

// Nuxt 全域初次載入狀態
const isInitialLoadComplete = useState<boolean>(
  "sh-initial-load-complete",
  () => false,
);

const INITIAL_LOAD_EVENT = "sh:initial-load-complete";

// 收到通知後開啟歡迎視窗
function handleInitialLoadComplete() {
  welcomeOpen.value = true;
}

function switchQaOpen() {
  qaOpen.value = !qaOpen.value;
}

function switchPaintOpen() {
  paintOpen.value = !paintOpen.value;
}

function switchGameOpen() {
  gameOpen.value = !gameOpen.value;
}

onMounted(() => {
  // 先註冊事件，避免錯過通知
  window.addEventListener(INITIAL_LOAD_EVENT, handleInitialLoadComplete);

  // 如果全域狀態已經完成，立即開啟
  if (isInitialLoadComplete.value) {
    handleInitialLoadComplete();
  }
});

// 監聽全域狀態更新
watch(isInitialLoadComplete, (completed) => {
  if (completed) {
    handleInitialLoadComplete();
  }
});

onUnmounted(() => {
  window.removeEventListener(INITIAL_LOAD_EVENT, handleInitialLoadComplete);
});
</script>

<style>
#desktop-icons button span {
  color: white;
  text-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
}
</style>
