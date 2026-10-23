<template>
  <div class="home-desktop relative">
    <WindowHomeWelcome
      @open-game-window="switchGameOpen"
      @open-paint-window="switchPaintOpen"
    />
    <WindowHomeQA v-model:open="qaOpen" />
    <WindowHomePaint v-model:open="paintOpen" />
    <WindowHomeGame v-model:open="gameOpen" />

    <div
      id="desktop-icons"
      class="absolute left-8 top-6 grid grid-flow-col-dense gap-8 grid-rows-8 grid-cols-2"
    >
      <button
        @click="switchQaOpen"
        class="flex flex-col gap-1 items-center justify-center cursor-pointer"
      >
        <SvgoMessage :filled="true" class="!size-10" />
        <span>問答</span>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/assets/css/markdown.css";

const qaOpen = ref(false);
const paintOpen = ref(false);
const gameOpen = ref(false);

function switchQaOpen() {
  qaOpen.value = !qaOpen.value;
}
function switchPaintOpen() {
  paintOpen.value = !paintOpen.value;
}
function switchGameOpen() {
  gameOpen.value = !gameOpen.value;
}
</script>

<style>
#desktop-icons button span {
  color: white;
  text-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
}
</style>
