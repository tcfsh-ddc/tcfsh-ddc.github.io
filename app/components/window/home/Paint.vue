<template>
  <Window
    v-model:open="open"
    :show-close-button="true"
    class="demo-window demo-window--notes @container"
    :initial-x="200"
    :initial-y="60"
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

    <div
      class="flex flex-col-reverse @md:flex-row min-h-0 min-w-0 gap-3 h-full w-full"
    >
      <!-- 功能列 -->
      <div
        class="flex flex-row @md:flex-col gap-4 h-full w-fit items-center min-h-fit"
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

        <div class="border-1 border-black-800 h-0 w-4 hidden @md:block" />

        <PhGradient :size="26" class="text-black-400 hidden @md:block" />
        <PhPaintBrush :size="26" class="text-black-400 hidden @md:block" />
        <PhPaintBucket :size="26" class="text-black-400 hidden @md:block" />
      </div>

      <!-- 畫布 -->
      <div class="flex-1 flex items-center justify-center h-[90%] w-full">
        <div
          class="bg-white flex flex-col gap-2 max-h-full max-w-full @md:h-[80%] @md:min-h-80 @md:w-[80%] @md:min-w-40 overflow-auto"
        >
          <Markdown>{{ MdPaint }}</Markdown>
        </div>
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
import MdPaint from "@/content/divisions/paint.md?raw";

const open = defineModel<boolean>("open", {
  default: false,
});

const menuItems = ["檔案", "編輯", "筆刷", "工具", "關於"];
</script>
