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
    <WindowWelcome />
    <WindowQA v-model:open="qaOpen" />

    <div
      id="desktop-icons"
      class="absolute left-8 top-4 grid gap-4 grid-cols-2"
    >
      <button
        @click="openQaOpen"
        class="flex flex-col gap-2 items-center justify-center"
      >
        <PhQuestion :size="48" aria-hidden="true" />
        <span>問答</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhQuestion } from "@phosphor-icons/vue";

const qaOpen = ref(false);
function openQaOpen() {
  qaOpen.value = true;
}
</script>
