<template>
  <Window
    class=""
    :initial-x="250"
    :initial-y="100"
    :initial-width="880"
    :initial-height="650"
    :maxable="false"
    :resizable="false"
    :allow-double-maxmize="false"
    :show-close-button="true"
  >
    <template #titlebar>
      <p class="text-black-50">歡迎 - 台中一中數位創作研究社</p>
    </template>

    <div
      class="flex flex-col justify-center items-center h-full w-full gap-2 py-4"
    >
      <div class="flex flex-col md:flex-row gap-4 items-end">
        <img
          src="~/assets/images/ddc-logo.jpg"
          class="size-20 md:size-30 rounded-lg -mb-16 md:mb-0"
        />
        <div class="flex flex-col gap-1">
          <h1 ref="welcomeTitle" class="text-black-200 text-4xl font-bold">
            歡迎光臨
            <br />
            <span class="word-line word-original text-purple">數位</span>
            <span class="word-line word-original text-lime">創作</span>
            <span class="word-line word-original text-blue">研究社</span>
            <span class="text-xl align-super text-black-400 font-extralight">
              串
            </span>
          </h1>
          <p class="text-black-400">
            歡迎你來到DDC OS！快快探索這個蘊藏了各種跟數創有關資訊的網站吧
          </p>
        </div>
      </div>

      <div
        class="grid grid-cols-2 md:grid-cols-3 gap-4 w-[95%] md:w-[70%] md:min-w-150 mt-8"
      >
        <NuxtLink to="/about" class="sh-grid-item gap-2 group col-span-2">
          <span
            class="text-4xl text-white font-bold min-h-12 tracking-normal group-hover:tracking-widest transition-all"
          >
            DDC
            <span
              class="inline-block text-purple translate-x-0 group-hover:translate-x-4 transition-transform duration-300"
              >.</span
            >
          </span>
          <h3 class="text-black-400 text-2xl">關於數創</h3>
        </NuxtLink>
        <a
          href="https://github.com/tcfsh-ddc/tcfsh-ddc.github.io"
          class="sh-grid-item gap-2 group"
        >
          <PhCode
            :size="48"
            color="#ffffff"
            weight="duotone"
            class="group-hover:rotate-12 transition-transform"
          />
          <h3 class="text-black-400 text-2xl">網站原始碼</h3>
        </a>
        <button
          class="sh-grid-item gap-2 group flex flex-col justify-start cursor-pointer"
          @click="emit('openPaintWindow')"
        >
          <PhPalette
            :size="48"
            color="#FFFFFF"
            weight="duotone"
            class="group-hover:rotate-12 transition-transform"
          />
          <h3 class="text-black-400 text-2xl text-left">認識電繪組</h3>
        </button>
        <button
          class="sh-grid-item group flex flex-col justify-start gap-2 cursor-pointer"
          @click="emit('openGameWindow')"
        >
          <PhGameController
            :size="48"
            color="#FFFFFF"
            weight="duotone"
            class="group-hover:rotate-12 transition-transform"
          />
          <h3 class="text-black-400 text-2xl text-left">認識遊戲組</h3>
        </button>
        <button
          class="sh-grid-item group flex flex-col justify-start gap-2 cursor-not-allowed opacity-30"
          @click="emit('openMusicWindow')"
        >
          <PhPianoKeys
            :size="48"
            color="#ffffff"
            weight="duotone"
            class="group-hover:rotate-12 transition-transform"
          />
          <h3 class="text-black-400 text-2xl text-left">認識音樂組</h3>
        </button>
      </div>

      <p class="mt-2 text-black-700">
        本社網由第二十一屆副社長
        <a
          href="https://samhacker.xyz"
          class="text-black-600 hover:text-black-500 transition-all underline hover:underline-offset-6 underline-offset-4"
        >
          SamHacker</a
        >
        設計並建置
      </p>
    </div>
  </Window>
</template>

<script setup lang="ts">
import {
  PhCode,
  PhPalette,
  PhGameController,
  PhPianoKeys,
} from "@phosphor-icons/vue";

const emit = defineEmits([
  "openPaintWindow",
  "openGameWindow",
  "openMusicWindow",
]);
</script>

<style scoped>
.sh-grid-item {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2) /* 0.5rem = 8px */;

  border-radius: 8px;
  background: var(--color-black-900);
  border-color: var(--color-black-800);
  border-width: 1px;
  padding: 16px;
  transition: all 0.1s ease-in-out;
}

.sh-grid-item:hover {
  background: var(--color-black-800);
  border-color: var(--color-black-700);
  transition: all 0.1s ease-in-out;
}
</style>
