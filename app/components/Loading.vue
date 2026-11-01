<template>
  <!-- Loading Animation -->
  <div
    ref="loaderContainer"
    class="w-dvw h-dvh z-999 bg-black-950 flex flex-col gap-6 items-center justify-center absolute"
  >
    <img ref="loadingImg" :src="loadingImage" alt="載入動畫" />

    <div ref="dotsContainer" class="flex gap-4 items-center justify-center">
      <div ref="loadingDot1" class="size-3 bg-purple rounded-full" />
      <div ref="loadingDot2" class="size-3 bg-lime rounded-full" />
      <div ref="loadingDot3" class="size-3 bg-blue rounded-full" />
    </div>

    <div
      ref="tipsContainer"
      style="clip-path: inset(0 0 0 0)"
      class="absolute left-1/2 -translate-x-1/2 bottom-16 max-w-full overflow-hidden whitespace-nowrap text-black-50"
    >
      <Tips :allow-change-tip="false" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import loadingImage from "~/assets/images/loading.webp?base64";

const loaderContainer = ref(null);
const loadingImg = ref(null);
const dotsContainer = ref(null);
const tipsContainer = ref(null);
const loadingDot1 = ref(null);
const loadingDot2 = ref(null);
const loadingDot3 = ref(null);

// Nuxt 全域狀態：記錄初次載入動畫是否完成
const isInitialLoadComplete = useState("sh-initial-load-complete", () => false);

const INITIAL_LOAD_EVENT = "sh:initial-load-complete";

let mainTimeline;
let exitTimeline;
let loadTimer;

let hasStartedExit = false;
let hasFinished = false;

const handlePageLoad = () => {
  if (loadTimer || hasStartedExit || hasFinished) return;

  // 網頁完全載入後延遲一秒
  loadTimer = window.setTimeout(() => {
    loadTimer = undefined;
    finishLoading();
  }, 1500);
};

onMounted(() => {
  const loadingDots = [loadingDot1.value, loadingDot2.value, loadingDot3.value];
  if (loadingDots.some((dot) => !dot)) return;

  // 建立載入動畫
  mainTimeline = gsap.timeline();

  mainTimeline.to(
    loadingDots,
    {
      y: -12,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.15,
        repeat: -1,
        yoyo: true,
      },
      ease: "power1.inOut",
    },
  );

  // 防止元件掛載前，load 事件就已經觸發
  if (document.readyState === "complete") {
    handlePageLoad();
  } else {
    window.addEventListener("load", handlePageLoad, {
      once: true,
    });
  }
});

const finishLoading = () => {
  const loadingDots = [loadingDot1.value, loadingDot2.value, loadingDot3.value];
  if (
    hasStartedExit ||
    hasFinished ||
    !mainTimeline ||
    !loaderContainer.value ||
    !loadingImg.value ||
    !dotsContainer.value ||
    !tipsContainer.value ||
    loadingDots.some((dot) => !dot)
  ) return;

  hasStartedExit = true;

  // 停止循環動畫
  mainTimeline.kill();

  exitTimeline = gsap.timeline({
    onComplete: () => {
      if (loaderContainer.value) {
        loaderContainer.value.style.display = "none";
      }

      hasFinished = true;

      // 1. 更新 Nuxt 全域狀態
      isInitialLoadComplete.value = true;

      // 2. 廣播全域事件
      window.dispatchEvent(
        new CustomEvent(INITIAL_LOAD_EVENT, {
          detail: {
            type: "initial-load-complete",
          },
        }),
      );
    },
  });

  exitTimeline.to(
    tipsContainer.value,
    {
      clipPath: "inset(0 50% 0 50%)",
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    },
    0,
  );

  // 圓點回到原位
  exitTimeline.to(
    loadingDots,
    {
      y: 0,
      duration: 0.2,
      ease: "power1.out",
    },
    0,
  );

  // 左側圓點退出
  exitTimeline.to(
    loadingDot1.value,
    {
      x: -40,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    },
    "+=0.2",
  );

  // 右側圓點退出
  exitTimeline.to(
    loadingDot3.value,
    {
      x: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    },
    "<",
  );

  // 中間圓點淡出
  exitTimeline.to(
    loadingDot2.value,
    {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    },
    "<",
  );

  // 圓點容器淡出
  exitTimeline.to(
    dotsContainer.value,
    {
      opacity: 0,
      duration: 0.2,
    },
    "<",
  );

  // 載入圖片放大並向下退出
  exitTimeline.to(
    loadingImg.value,
    {
      y: 100,
      scale: 3,
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    },
    "-=0.4",
  );

  // 載入畫面淡出
  exitTimeline.to(
    loaderContainer.value,
    {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.2",
  );

  exitTimeline.set(loaderContainer.value, {
    display: "none",
  });
};

onUnmounted(() => {
  window.removeEventListener("load", handlePageLoad);

  if (loadTimer) {
    window.clearTimeout(loadTimer);
  }

  mainTimeline?.kill();
  exitTimeline?.kill();
});

defineExpose({
  finishLoading,
});
</script>
