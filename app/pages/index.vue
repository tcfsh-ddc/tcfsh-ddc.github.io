<template>
  <div class="home-desktop relative">
    <WindowHomeWelcome />
    <WindowHomeQA v-model:open="qaOpen" />
    <WindowHomePaint v-model:open="paintOpen" />

    <div
      id="desktop-icons"
      class="absolute left-8 top-6 grid grid-flow-col-dense gap-8 grid-rows-8 grid-cols-2"
    >
      <button
        @click="switchQaOpen"
        class="flex flex-col gap-1 items-center justify-center"
      >
        <SvgoMessage :filled="true" class="!size-10" />
        <span>問答</span>
      </button>

      <button
        @click="switchPaintOpen"
        class="flex flex-col gap-1 items-center justify-center"
      >
        <SvgoFileKrita :filled="true" class="!size-10" />
        <span>電繪組.kra</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const qaOpen = ref(false);
const paintOpen = ref(false);

function switchQaOpen() {
  qaOpen.value = !qaOpen.value;
}
function switchPaintOpen() {
  console.log("[openPaintOpen] 開啟電繪組介紹");
  paintOpen.value = !paintOpen.value;
}
</script>

<style>
#desktop-icons button span {
  color: white;
  text-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
}
</style>
