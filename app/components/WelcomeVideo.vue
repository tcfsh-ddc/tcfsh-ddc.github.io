<template>
  <div
    v-if="showWelcomeVideo"
    ref="welcomeContainer"
    class="fixed inset-0 w-dvw h-dvh z-99 bg-black-950 flex items-center justify-center"
  >
    <video
      ref="welcomeVideo"
      class="w-2/5 min-w-60 h-auto object-contain"
      style="opacity: 0"
      muted
      playsinline
      preload="none"
      aria-label="歡迎影片"
      @ended="finishWelcome"
      @error="finishWelcome"
    ></video>

    <!-- 跳過按鈕 -->
    <button
      class="absolute gap-2 right-4 top-2 lg:top-8 lg:right-12 text-black-300 text-xl flex items-center justify-end group cursor-pointer"
      @click="finishWelcome"
    >
      <span
        class="text-black-700 group-hover:text-black-300 transition-all duration-200"
        >跳過</span
      >
      <div
        ref="skip-btn-decoration"
        class="h-0 w-2 group-hover:w-6 transition-all duration-300 ease-in-out border-b-1 border-black-700 group-hover:border-black-300"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const { showWelcomeVideo, isInitialLoadComplete, isLoadingExited } =
  useInitialLoad();
const welcomeContainer = ref<HTMLElement | null>(null);
const welcomeVideo = ref<HTMLVideoElement | null>(null);

let fadeTween: gsap.core.Tween | undefined;
let playbackTimer: ReturnType<typeof setTimeout> | undefined;
let finishing = false;
let disposed = false;

function finishWelcome() {
  // return;
  if (disposed || finishing || !showWelcomeVideo.value) return;
  finishing = true;

  clearTimeout(playbackTimer);
  fadeTween?.kill();
  welcomeVideo.value?.pause();

  const tl = gsap.timeline({
    onComplete: () => {
      showWelcomeVideo.value = false;
      isInitialLoadComplete.value = true;
    },
  });

  tl.to(welcomeVideo.value, {
    autoAlpha: 0,
    duration: 0.2,
    y: 10,
  });

  tl.to(
    welcomeContainer.value,
    {
      delay: 0.3,
      opacity: 0,
      duration: 0.6,
      scale: 1.2,
      ease: "power2.out",
    },
    "-=0.1",
  );
}

async function playWelcome() {
  finishing = false;
  await nextTick();
  if (disposed || !showWelcomeVideo.value) return;

  // 僅在首次造訪、Loading 交接後才載入影片 URL 並發出媒體請求。
  playbackTimer = setTimeout(finishWelcome, 30000);
  try {
    const { default: src } =
      await import("@/assets/medias/welcome_vid.webm?url");
    if (disposed || finishing || !welcomeVideo.value) return;
    const video = welcomeVideo.value;
    video.muted = true;
    video.src = src;

    await video.play();

    if (disposed || finishing) return;

    fadeTween = gsap.to(video, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
    });

    clearTimeout(playbackTimer);
    try {
      localStorage.setItem(WELCOME_VIDEO_STORAGE_KEY, "1");
    } catch {
      // 隱私模式或儲存空間不可用不影響播放。
      console.error("Failed to set welcome video storage key.");
    }
  } catch {
    finishWelcome();
  }
}

onMounted(() => {
  watch(
    () => showWelcomeVideo.value && isLoadingExited.value,
    (canPlay) => {
      if (canPlay) void playWelcome();
    },
    { immediate: true, flush: "post" },
  );
});

onUnmounted(() => {
  disposed = true;
  clearTimeout(playbackTimer);
  fadeTween?.kill();
  const video = welcomeVideo.value;
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }
});
</script>
