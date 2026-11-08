<template>
  <div>
    <component
      :is="allowChangeTip ? 'button' : 'p'"
      v-if="tip"
      :type="allowChangeTip ? 'button' : undefined"
      :aria-label="allowChangeTip ? `換一則提示：${tip}` : undefined"
      @click="handleChangeTip()"
      class="text-black-300 text-lg text-left select-none"
      :class="allowChangeTip ? 'cursor-pointer' : ''"
    >
      {{ tip }}
    </component>
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
