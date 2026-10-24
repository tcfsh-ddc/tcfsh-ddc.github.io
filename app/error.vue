<script setup lang="ts">
import { PhArrowUUpLeft } from "@phosphor-icons/vue";
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
</script>

<template>
  <div class="bg-black-950 h-dvh w-dvw text-black-50">
    <div
      class="absolute gap-4 w-full h-full flex flex-col items-center justify-center"
    >
      <h1 class="font-extrabold text-7xl">{{ error.status }}</h1>
      <p class="3xl">{{ error.statusText }}</p>
      <NuxtLink
        class="text-xl flex items-center gap-2 hover:gap-6 transition-all text-black-200 hover:text-purple"
        to="/"
      >
        <PhArrowUUpLeft :size="24" />
        Go back home
      </NuxtLink>
    </div>
  </div>
</template>
