<template>
  <!-- Viewport Warning -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition-all duration-500 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="showWarning"
      class="fixed inset-0 z-[999] w-dvw h-dvh bg-black-950/90 backdrop-blur-sm flex flex-col gap-2 items-center justify-center px-1"
    >
      <PhAppWindow :size="64" weight="duotone" class="text-rose-300" />

      <h1 class="text-rose-400 text-4xl font-bold">畫面太小</h1>

      <p class="text-rose-200 text-center px-4">
        您目前的畫面高度或寬度不足以完整顯示此網頁的畫面，
        請放大瀏覽器視窗以改善體驗。
      </p>

      <button
        class="px-4 flex gap-1 items-center py-2 rounded-lg bg-rose-400 text-black-950 hover:bg-rose-300 transition-colors"
        @click="dismissWarning"
      >
        <PhX :size="24" weight="thin" />
        仍要繼續瀏覽
      </button>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue";
import { PhAppWindow, PhX } from "@phosphor-icons/vue";

const size = ref({
  width: 0,
  height: 0,
});

const dismissed = ref(false);
const isReady = ref(false);

// 最低尺寸
const MIN_WIDTH = 300;
const MIN_HEIGHT = 380;

// 判斷畫面是否過小
const isTooSmall = computed(() => {
  return size.value.width < MIN_WIDTH || size.value.height < MIN_HEIGHT;
});

// 是否顯示警告
const showWarning = computed(() => {
  return isReady.value && isTooSmall.value && !dismissed.value;
});

// 更新視窗尺寸
const updateSize = () => {
  size.value = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

// 關閉警告
const dismissWarning = () => {
  dismissed.value = true;
};

// 當視窗恢復正常尺寸時，重設關閉狀態
watch(isTooSmall, (tooSmall) => {
  if (!tooSmall) {
    dismissed.value = false;
  }
});

onMounted(() => {
  updateSize();
  isReady.value = true;

  window.addEventListener("resize", updateSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSize);
});
</script>
