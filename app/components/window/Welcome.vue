<template>
  <Window
    v-model:open="welcomeOpen"
    class=""
    :initial-x="36"
    :initial-y="32"
    :initial-width="520"
    :initial-height="330"
  >
    <template #titlebar>
      <p class="text-black-50">歡迎 - 台中一中數位創作研究社</p>
    </template>

    <div class="flex flex-col justify-center items-center gap-2">
      <img src="~/assets/images/ddc-logo.jpg" class="rounded-lg" />
      <h1 class="text-black-200 text-4xl font-bold text-center">
        歡迎光臨
        <br />
        臺中一中<span class="text-blue">數位創作研究社</span>
      </h1>
    </div>
  </Window>
</template>

<script setup></script>
