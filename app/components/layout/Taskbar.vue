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
      class="hidden md:flex gap-2.5 bg-purple-dark rounded-b-frame-1 justify-between"
    ></div>
  </nav>
</template>

<script setup lang="ts">
import LinksMenu from "./LinksMenu.vue";
import MobileMenu from "./MobileMenu.vue";

defineEmits<{ home: [] }>();
</script>

<style scoped></style>
