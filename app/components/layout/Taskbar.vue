<template>
  <nav
    class="flex gap-2.5 bg-purple md:bg-purple-dark rounded-b-frame-1 justify-between items-center px-4 md:px-0"
  >
    <!-- 手機 - 頁面導覽 -->
    <MobileMenu />

    <!-- 開始按鈕 -->
    <button
      class="flex cursor-pointer px-5 py-3.5 bg-purple"
      type="button"
      aria-label="回首頁"
      @click="$emit('home')"
    >
      <img
        src="~/assets/images/ddc-logo.jpg"
        alt="數創logo"
        class="size-10 md:size-12"
      />
      <p class="sr-only">回首頁</p>
    </button>

    <!-- 手機 - 社群連結 -->
    <LinksMenu />

    <!-- 導覽選項 -->
    <div
      class="hidden md:flex p-0 gap-6 items-center justify-center"
      id="sh-nav-menu"
    >
      <!-- 關於頁面 -->
      <NuxtLink class="flex p-0 gap-1" to="/about">
        <SvgoAbout :filled="true" class="!h-8 !w-8" />
        <p class="sr-only">關於</p>
      </NuxtLink>

      <!-- 社幹頁面 -->
      <!-- <NuxtLink class="flex p-0 gap-1" to="/members">
        <SvgoMembers :filled="true" class="!h-8 !w-8" />
        <p class="sr-only">幹部</p>
      </NuxtLink> -->

      <!-- 作品集頁面 -->
      <!-- <NuxtLink class="flex p-0 gap-1" to="/works">
        <SvgoBook :filled="true" class="!h-8 !w-8" />
        <p class="sr-only">作品集</p>
      </NuxtLink> -->
    </div>

    <!-- 常駐程式列 -->
    <div
      class="hidden md:flex flex-row-reverse gap-3 h-fit bg-purple-dark rounded-b-frame-1 items-center justify-between pr-5 text-black-50"
    >
      <div class="flex flex-col justify-end h-full min-w-24 w-fit">
        <p class="text-right text-nowrap" id="sh-time-date">2099/99/99</p>
        <p class="text-right text-nowrap" id="sh-time-time">00:00:00</p>
      </div>

      <a
        href="https://www.instagram.com/tcfsh.ddc"
        class="flex w-full h-full items-center"
      >
        <SvgoInstagram class="!h-6 !w-6 mr-2" />
      </a>
      <a
        href="https://www.facebook.com/tcfshDDC"
        class="flex w-full h-full items-center"
      >
        <SvgoFacebookRound class="!h-6 !w-6 mr-2" />
      </a>
      <a
        href="https://www.threads.com/@tcfsh.ddc"
        class="flex w-full h-full items-center"
      >
        <SvgoThreads class="!h-6 !w-6 mr-2" />
      </a>
      <a
        href="https://github.com/tcfsh-ddc"
        class="flex w-full h-full items-center"
      >
        <SvgoGithub class="!h-6 !w-6 mr-2" />
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import LinksMenu from "./LinksMenu.vue";
import MobileMenu from "./MobileMenu.vue";

defineEmits<{ home: [] }>();

import { onMounted, onUnmounted } from "vue";

let timer: number | null = null;

function updateTime() {
  const now = new Date();

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const dateObject = document.getElementById("sh-time-date");
  const timeObject = document.getElementById("sh-time-time");

  if (dateObject) {
    dateObject.innerHTML = now.toLocaleDateString("zh-TW", dateOptions);
  }

  if (timeObject) {
    timeObject.innerHTML = now.toLocaleTimeString("zh-TW", timeOptions);
  }
}

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (timer !== null) clearInterval(timer);
});
</script>

<style scoped></style>
