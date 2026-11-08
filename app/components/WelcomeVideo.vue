<template>
  <div
    v-if="showWelcomeVideo"
    ref="welcomeContainer"
    class="fixed inset-0 w-dvw h-dvh z-999 bg-black-950 flex items-center justify-center"
  >
    <video
      ref="welcomeVideo"
      class="w-full h-full object-contain"
      muted
      playsinline
      preload="none"
      aria-label="歡迎影片"
      @ended="finishWelcome"
      @error="finishWelcome"
    ></video>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const { showWelcomeVideo, isInitialLoadComplete } = useInitialLoad();
const welcomeContainer = ref<HTMLElement | null>(null);
const welcomeVideo = ref<HTMLVideoElement | null>(null);
let fadeTween: gsap.core.Tween | undefined;
let playbackTimer: ReturnType<typeof setTimeout> | undefined;
let finishing = false;
let disposed = false;

function finishWelcome() {
  if (disposed || finishing || !showWelcomeVideo.value) return;
  finishing = true;
  clearTimeout(playbackTimer);
  welcomeVideo.value?.pause();

  fadeTween = gsap.to(welcomeContainer.value, {
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => {
      showWelcomeVideo.value = false;
      isInitialLoadComplete.value = true;
    },
  });
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

    clearTimeout(playbackTimer);
    try {
      localStorage.setItem(WELCOME_VIDEO_STORAGE_KEY, "1");
    } catch {
      // 隱私模式或儲存空間不可用不影響播放。
    }
  } catch {
    finishWelcome();
  }
}

onMounted(() => {
  watch(
    showWelcomeVideo,
    (show) => {
      if (show) void playWelcome();
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
