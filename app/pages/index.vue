<template>
  <div class="home-desktop relative">
    <!-- <nav class="app-launcher" aria-label="桌面應用程式">
      <button type="button" :aria-pressed="welcomeOpen" @click="welcomeOpen = !welcomeOpen">
        <PhHouse :size="20" aria-hidden="true" />
        <span>歡迎</span>
      </button>
      <button type="button" :aria-pressed="notesOpen" @click="notesOpen = !notesOpen">
        <PhNotePencil :size="20" aria-hidden="true" />
        <span>待辦事項</span>
      </button>
      <button type="button" :aria-pressed="statusOpen" @click="statusOpen = !statusOpen">
        <PhPulse :size="20" aria-hidden="true" />
        <span>系統狀態</span>
      </button>
    </nav> -->
    <WindowHomeWelcome />
    <WindowHomeQA v-model:open="qaOpen" />
    <WindowHomePaint v-bind:open="paintOpen" />

    <div
      id="desktop-icons"
      class="absolute left-8 top-6 grid grid-flow-col-dense gap-8 grid-rows-8 grid-cols-2"
    >
      <button
        @click="openQaOpen"
        class="flex flex-col gap-1 items-center justify-center"
      >
        <SvgoMessage :filled="true" class="!size-10" />
        <span>問答</span>
      </button>

      <button
        @click="openPaintOpen"
        class="flex flex-col gap-1 items-center justify-center"
      >
        <SvgoPalette :filled="true" class="!size-10" />
        <span>問答</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const qaOpen = ref(false);
const paintOpen = ref(true);

function openQaOpen() {
  qaOpen.value = true;
}
function openPaintOpen() {
  paintOpen.value = true;
}
</script>
