<template>
  <div>
    <p v-if="tip">{{ tip }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const tip = ref("");

onMounted(async () => {
  const { getRandomTip } = await import("~/config/tips");

  tip.value = getRandomTip();
});
</script>
