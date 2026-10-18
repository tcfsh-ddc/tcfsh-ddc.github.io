<template>
  <Window
    class=""
    :initial-x="250"
    :initial-y="100"
    :initial-width="880"
    :initial-height="600"
    :maxable="false"
    :allow-double-maxmize="false"
  >
    <template #titlebar>
      <p class="text-black-50">歡迎 - 台中一中數位創作研究社</p>
    </template>

    <div
      class="flex flex-col justify-center items-center h-full w-full gap-2 py-4"
    >
      <div class="flex gap-4 items-end">
        <img src="~/assets/images/ddc-logo.jpg" class="rounded-lg" />
        <div class="flex flex-col gap-1">
          <h1 class="text-black-200 text-4xl font-bold">
            歡迎光臨
            <br />
            <span class="sh-text-tcfsh-grad">臺中一中</span>
            <span class="text-purple">數位</span
            ><span class="text-blue">創作</span
            ><span class="text-lime">研究社</span>
          </h1>
          <p class="text-black-400">
            歡迎你來到DDC OS！快快探索這個蘊藏了各種跟數創有關資訊的網站吧
          </p>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 w-[70%] min-w-150 mt-8">
        <div class="sh-grid-item gap-2 group col-span-2">
          <span class="text-4xl text-white font-bold min-h-12">
            DDC
            <span
              class="inline-block text-purple translate-x-0 group-hover:translate-x-4 transition-transform duration-300"
              >.</span
            >
          </span>
          <h3 class="text-black-400 text-2xl">關於數創</h3>
        </div>
        <div class="sh-grid-item gap-2 group">
          <PhCode
            :size="48"
            color="#ffffff"
            weight="duotone"
            class="group-hover:rotate-45 transition-transform"
          />
          <h3 class="text-black-400 text-2xl">網站原始碼</h3>
        </div>
        <div class="sh-grid-item gap-2 group">
          <PhPalette
            :size="48"
            color="#FFFFFF"
            weight="duotone"
            class="group-hover:rotate-45 transition-transform"
          />
          <h3 class="text-black-400 text-2xl">認識電繪組</h3>
        </div>
        <div class="sh-grid-item group">
          <PhGameController
            :size="48"
            color="#FFFFFF"
            weight="duotone"
            class="group-hover:rotate-45 transition-transform"
          />
          <h3 class="text-black-400 text-2xl">認識遊戲組</h3>
        </div>
        <div class="sh-grid-item group">
          <PhPianoKeys
            :size="48"
            color="#ffffff"
            weight="duotone"
            class="group-hover:rotate-45 transition-transform"
          />
          <h3 class="text-black-400 text-2xl">認識音樂組</h3>
        </div>
      </div>
    </div>
  </Window>
</template>

<script setup>
import {
  PhCode,
  PhPalette,
  PhGameController,
  PhPianoKeys,
} from "@phosphor-icons/vue";
</script>

<style scoped>
.sh-text-tcfsh-grad {
  background: linear-gradient(to right, #c4261d, #a6aaab);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

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
