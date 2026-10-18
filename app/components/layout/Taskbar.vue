<template>
  <nav class="flex gap-2.5 bg-purple-dark rounded-b-frame-1 justify-between">
    <!-- 開始按鈕 -->
    <a class="flex px-5 py-3.5 bg-purple" href="/">
      <img
        src="~/assets/images/ddc-logo.jpg"
        alt="數創logo"
        class="w-12 h-12"
      />
      <p class="sr-only">回首頁</p>
    </a>

    <!-- 導覽選項 -->
    <div class="flex p-0 gap-6 items-center justify-center" id="sh-nav-menu">
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
      class="flex gap-2.5 bg-purple-dark rounded-b-frame-1 justify-between"
    ></div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
