<template>
  <div>
    <p
      v-if="tip"
      @click="handleChangeTip()"
      class="text-black-300 cursor-pointer select-none"
    >
      {{ tip }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getRandomTip } from "~/config/tips";

const props = withDefaults(defineProps<{ allowChangeTip?: boolean }>(), {
  allowChangeTip: true,
});

const tip = ref("");

function handleChangeTip(isInitialized = false) {
  if (!isInitialized && !props.allowChangeTip) return;

  tip.value = getRandomTip();
}

onMounted(() => handleChangeTip(true));
</script>
