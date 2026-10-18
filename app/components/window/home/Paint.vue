<template>
  <Window
    v-model:open="open"
    :show-close-button="true"
    class="demo-window demo-window--notes @container"
    :initial-x="610"
    :initial-y="74"
    :initial-width="768"
    :initial-height="500"
    :min-width="260"
    :min-height="190"
  >
    <template #titlebar>
      <p class="text-black-50 flex gap-1 items-center">
        <SvgoPalette :filled="true" class="!size-6" />
        電繪組.kra - NotKrita
      </p>
      <div
        class="text-black-200 ml-8 gap-2 font-extralight pointer-events-none @md:flex hidden"
      >
        <p v-for="content in menuItems">{{ content }}</p>
      </div>
      <PhDotsThree
        class="text-black-200 @md:hidden block ml-4"
        :size="18"
        weight="regular"
      />
    </template>

    <div class="flex min-h-0 min-w-0 gap-3 h-full w-full">
      <!-- 功能列 -->
      <div
        class="flex flex-col gap-4 h-full w-fit items-center min-h-fit"
        aria-hidden="true"
      >
        <PhPen
          :size="26"
          class="text-black-200 bg-black-800 ring-2 ring-black-800 rounded-[4px]"
        />

        <PhBezierCurve :size="26" class="text-black-400" />
        <PhSelection :size="26" class="text-black-400" />

        <div class="border-1 border-black-800 h-0 w-4" />

        <PhSquare :size="26" class="text-black-400" />
        <PhCircle :size="26" class="text-black-400" />
        <PhTextT :size="26" class="text-black-400" />

        <div class="border-1 border-black-800 h-0 w-4" />

        <PhGradient :size="26" class="text-black-400" />
        <PhPaintBrush :size="26" class="text-black-400" />
        <PhPaintBucket :size="26" class="text-black-400" />
      </div>

      <!-- 畫布 -->
      <div class="flex-1 flex items-center justify-center">
        <div
          class="bg-white flex flex-col gap-2 h-[80%] min-h-80 w-[80%] min-w-40"
        ></div>
      </div>
    </div>
  </Window>
</template>

<script setup lang="ts">
import {
  PhPen,
  PhBezierCurve,
  PhSelection,
  PhSquare,
  PhCircle,
  PhTextT,
  PhGradient,
  PhPaintBrush,
  PhPaintBucket,
  PhDotsThree,
} from "@phosphor-icons/vue";

const open = defineModel<boolean>("open", {
  default: false,
});

const menuItems = ["檔案", "編輯", "筆刷", "工具", "關於"];
</script>
