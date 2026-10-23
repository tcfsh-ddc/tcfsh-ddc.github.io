<template>
  <nav
    class="flex gap-2.5 bg-purple md:bg-purple-dark rounded-b-frame-1 justify-center md:justify-between"
  >
    <!-- 開始按鈕 -->
    <NuxtLink class="flex px-5 py-3.5 bg-purple" to="/">
      <img
        src="~/assets/images/ddc-logo.jpg"
        alt="數創logo"
        class="size-10 md:size-12"
      />
      <p class="sr-only">回首頁</p>
    </NuxtLink>

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
      <NuxtLink class="flex p-0 gap-1" to="/members">
        <SvgoMembers :filled="true" class="!h-8 !w-8" />
        <p class="sr-only">幹部</p>
      </NuxtLink>

      <!-- 作品集頁面 -->
      <NuxtLink class="flex p-0 gap-1" to="/works">
        <SvgoBook :filled="true" class="!h-8 !w-8" />
        <p class="sr-only">作品集</p>
      </NuxtLink>
    </div>

    <!-- 常駐程式列 -->
    <div
      class="hidden md:flex gap-2.5 bg-purple-dark rounded-b-frame-1 justify-between"
    ></div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
