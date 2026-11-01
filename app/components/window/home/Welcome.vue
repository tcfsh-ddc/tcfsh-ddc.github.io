<template>
  <Window
    :initial-x="250"
    :initial-y="100"
    :initial-width="880"
    :initial-height="650"
    :maxable="false"
    :resizable="false"
    :allow-double-maxmize="false"
    :show-close-button="true"
  >
    <template #titlebar>
      <p class="text-black-50">歡迎 - 台中一中數位創作研究社</p>
    </template>

    <div
      ref="welcomeIntro"
      class="flex flex-col justify-center items-center h-full w-full gap-2 py-4"
    >
      <div
        ref="welcomeIntroContent"
        class="flex flex-col md:flex-row gap-4 items-end"
      >
        <img
          src="~/assets/images/ddc-logo.jpg"
          class="size-20 md:size-30 rounded-lg -mb-16 md:mb-0"
        />
        <div class="flex flex-col gap-1">
          <h1 ref="welcomeTitle" class="text-black-200 text-4xl font-bold">
            歡迎光臨
            <br />
            <span class="word-line word-original text-purple">數位</span>
            <span class="word-line word-original text-lime">創作</span>
            <span class="word-line word-original text-blue">研究社</span>
            <span class="text-xl align-super text-black-400 font-extralight">
              串
            </span>
          </h1>
          <p class="text-black-400 ex-short:block hidden">
            歡迎你來到DDC OS！快快探索這個蘊藏了各種跟數創有關資訊的網站吧
          </p>
        </div>
      </div>

      <div
        ref="welcomeGrid"
        class="hidden short:grid grid-cols-2 md:grid-cols-3 gap-4 w-[95%] md:w-[70%] md:min-w-150 mt-8"
      >
        <NuxtLink
          to="/about"
          @pointerenter="animateGridItem($event, true)"
          @pointerleave="animateGridItem($event, false)"
          class="sh-grid-item gap-2 group col-span-2 unstyled"
        >
          <span
            ref="welcomeDdcLabel"
            class="text-4xl text-white font-bold min-h-12 tracking-normal"
          >
            DDC
            <span ref="welcomeDdcDot" class="inline-block text-purple">.</span>
          </span>
          <h3 class="text-black-400 text-2xl">關於數創</h3>
        </NuxtLink>
        <a
          href="https://github.com/tcfsh-ddc/tcfsh-ddc.github.io"
          @pointerenter="animateGridItem($event, true)"
          @pointerleave="animateGridItem($event, false)"
          class="sh-grid-item gap-2 group unstyled"
        >
          <PhCode :size="48" color="#ffffff" weight="duotone" />
          <h3 class="text-black-400 text-2xl">網站原始碼</h3>
        </a>
        <button
          @pointerenter="animateGridItem($event, true)"
          @pointerleave="animateGridItem($event, false)"
          class="sh-grid-item gap-2 group flex flex-col justify-start cursor-pointer"
          @click="emit('openPaintWindow')"
        >
          <PhPalette :size="48" color="#FFFFFF" weight="duotone" />
          <h3 class="text-black-400 text-2xl text-left">認識電繪組</h3>
        </button>
        <button
          @pointerenter="animateGridItem($event, true)"
          @pointerleave="animateGridItem($event, false)"
          class="sh-grid-item group flex flex-col justify-start gap-2 cursor-pointer"
          @click="emit('openGameWindow')"
        >
          <PhGameController :size="48" color="#FFFFFF" weight="duotone" />
          <h3 class="text-black-400 text-2xl text-left">認識遊戲組</h3>
        </button>
        <button
          @pointerenter="animateGridItem($event, true)"
          @pointerleave="animateGridItem($event, false)"
          class="sh-grid-item group flex flex-col justify-start gap-2 cursor-not-allowed opacity-30"
          @click="emit('openMusicWindow')"
        >
          <PhPianoKeys :size="48" color="#ffffff" weight="duotone" />
          <h3 class="text-black-400 text-2xl text-left">認識音樂組</h3>
        </button>
      </div>

      <p ref="welcomeCredit" class="mt-2 text-black-700">
        本社網由第二十一屆副社長
        <a
          ref="welcomeCreditLink"
          href="https://samhacker.xyz"
          @pointerenter="animateCreditLink(true)"
          @pointerleave="animateCreditLink(false)"
          class="text-black-600 underline underline-offset-4"
        >
          SamHacker</a
        >
        設計並建置
      </p>
    </div>
  </Window>
</template>

<script setup lang="ts">
import {
  PhCode,
  PhPalette,
  PhGameController,
  PhPianoKeys,
} from "@phosphor-icons/vue";
import { gsap } from "gsap";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const initialLoadComplete = useState("sh-initial-load-complete", () => false);
const INITIAL_LOAD_EVENT = "sh:initial-load-complete";
const welcomeIntro = ref<HTMLElement | null>(null);
const welcomeIntroContent = ref<HTMLElement | null>(null);
const welcomeGrid = ref<HTMLElement | null>(null);
const welcomeCredit = ref<HTMLElement | null>(null);
const welcomeDdcLabel = ref<HTMLElement | null>(null);
const welcomeDdcDot = ref<HTMLElement | null>(null);
const welcomeCreditLink = ref<HTMLElement | null>(null);
let hasAnimated = false;

async function animateWelcome() {
  if (hasAnimated || !initialLoadComplete.value) return;

  await nextTick();

  const intro = welcomeIntroContent.value;
  const grid = welcomeGrid.value;
  const credit = welcomeCredit.value;
  if (!intro || !grid || !credit || !welcomeIntro.value?.isConnected) return;

  hasAnimated = true;
  gsap.fromTo(
    intro,
    { autoAlpha: 0, y: 18 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      clearProps: "all",
    },
  );
  gsap.fromTo(
    grid.querySelectorAll(".sh-grid-item"),
    { autoAlpha: 0, y: 22, scale: 0.96 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      stagger: 0.08,
      delay: 0.18,
      ease: "back.out(1.3)",
      clearProps: "all",
    },
  );
  gsap.fromTo(
    credit,
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: 0.35,
      delay: 0.65,
      clearProps: "all",
    },
  );
}

function animateGridItem(event: PointerEvent, isHovered: boolean) {
  const item = event.currentTarget;
  if (!(item instanceof HTMLElement)) return;

  gsap.to(item, {
    backgroundColor: isHovered
      ? "var(--color-black-800)"
      : "var(--color-black-900)",
    borderColor: isHovered
      ? "var(--color-black-700)"
      : "var(--color-black-800)",
    duration: 0.1,
    overwrite: true,
  });

  if (item === welcomeGrid.value?.firstElementChild) {
    gsap.to(welcomeDdcLabel.value, {
      letterSpacing: isHovered ? "0.1em" : "0em",
      duration: 0.2,
      overwrite: true,
    });
    gsap.to(welcomeDdcDot.value, {
      x: isHovered ? 16 : 0,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
    });
    return;
  }

  const icon = item.querySelector("svg");
  if (!icon) return;

  gsap.to(icon, {
    rotation: isHovered ? 12 : 0,
    duration: 0.2,
    ease: "power2.out",
    overwrite: true,
  });
}

function animateCreditLink(isHovered: boolean) {
  gsap.to(welcomeCreditLink.value, {
    color: isHovered ? "var(--color-black-500)" : "var(--color-black-600)",
    textUnderlineOffset: isHovered ? "6px" : "4px",
    duration: 0.2,
    overwrite: true,
  });
}

onMounted(() => {
  window.addEventListener(INITIAL_LOAD_EVENT, animateWelcome);
  void animateWelcome();
});
onUnmounted(() => {
  window.removeEventListener(INITIAL_LOAD_EVENT, animateWelcome);
  gsap.killTweensOf([
    welcomeDdcLabel.value,
    welcomeDdcDot.value,
    welcomeCreditLink.value,
  ]);
  if (welcomeGrid.value) {
    gsap.killTweensOf(welcomeGrid.value.querySelectorAll("svg"));
  }
});
watch(initialLoadComplete, (completed) => {
  if (completed) void animateWelcome();
});

const emit = defineEmits([
  "openPaintWindow",
  "openGameWindow",
  "openMusicWindow",
]);
</script>

<style scoped>
.sh-grid-item {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2) /* 0.5rem = 8px */;

  border-radius: 8px;
  background: var(--color-black-900);
  border-color: var(--color-black-800);
  border-width: 1px;
  padding: 16px;
}
</style>
