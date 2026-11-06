<template>
  <div class="home-desktop relative h-full">
    <WindowHomeWelcome
      v-model:open="welcomeOpen"
      @open-game-window="switchGameOpen"
      @open-paint-window="switchPaintOpen"
    />
    <WindowHomeQA v-model:open="qaOpen" />
    <WindowHomePaint v-model:open="paintOpen" />
    <WindowHomeGame v-model:open="gameOpen" />
    <WindowHomeGamePlay v-model:open="gamePlayOpen" />

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

      <button
        @click="switchGamePlayOpen"
        class="flex flex-col gap-1 items-center justify-center cursor-pointer"
      >
        <SvgoFileUnity :filled="true" class="!size-10" />
        <span>社博遊戲.exe</span>
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
import { gsap } from "gsap";
import "@/assets/css/markdown.css";

const welcomeOpen = ref(false);
const qaOpen = ref(false);
const paintOpen = ref(false);
const gameOpen = ref(false);
const gamePlayOpen = ref(false);

// Nuxt 全域初次載入狀態
const isInitialLoadPreprocessed = useState(
  "sh-initial-load-preprocessed",
  () => false,
);
const isInitialLoadComplete = useState<boolean>(
  "sh-initial-load-complete",
  () => false,
);

const INITIAL_LOADED_PREPROCESS = "sh:initial-load-preprocess";
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

function switchGamePlayOpen() {
  gamePlayOpen.value = !gamePlayOpen.value;
}

// 初始化桌面圖示動畫狀態
const initializeDesktopIcons = () => {
  const icons = gsap.utils.toArray<HTMLElement>("#desktop-icons button");

  gsap.set(icons, {
    autoAlpha: 0,
    y: 12,
  });
};

// 播放桌面圖示進場動畫
const animateDesktopIcons = () => {
  const icons = gsap.utils.toArray<HTMLElement>("#desktop-icons button");

  gsap.to(icons, {
    autoAlpha: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.12,
    ease: "power2.out",
    clearProps: "opacity,visibility,transform",
  });
};

onMounted(() => {
  window.addEventListener(INITIAL_LOADED_PREPROCESS, initializeDesktopIcons);

  window.addEventListener(INITIAL_LOAD_EVENT, handleInitialLoadComplete);

  window.addEventListener(INITIAL_LOAD_EVENT, animateDesktopIcons);

  // 補償錯過 PREPROCESS 事件
  if (isInitialLoadPreprocessed.value) {
    initializeDesktopIcons();
  }

  // 補償錯過 COMPLETE 事件
  if (isInitialLoadComplete.value) {
    if (!isInitialLoadPreprocessed.value) {
      initializeDesktopIcons();
    }

    handleInitialLoadComplete();
    animateDesktopIcons();
  }
});

// 監聽全域狀態更新
watch(isInitialLoadComplete, (completed) => {
  if (completed) {
    handleInitialLoadComplete();
  }
});

onUnmounted(() => {
  window.removeEventListener(INITIAL_LOADED_PREPROCESS, initializeDesktopIcons);

  window.removeEventListener(INITIAL_LOAD_EVENT, handleInitialLoadComplete);

  window.removeEventListener(INITIAL_LOAD_EVENT, animateDesktopIcons);
});
</script>

<style>
#desktop-icons button span {
  color: white;
  text-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.6);
}
</style>
