<template>
  <Window
    v-model:open="open"
    :show-close-button="true"
    class="game-window @container"
    :initial-x="400"
    :initial-y="80"
    :initial-width="800"
    :initial-height="500"
    :min-width="340"
    :min-height="260"
    default-status="maxmium"
    :allow-double-maxmize="false"
    :maxable="false"
    :resizable="false"
  >
    <div class="game-container">
      <div
        v-if="open"
        class="game-launch-frame size-full flex flex-col gap-2 items-center justify-center relative"
      >
        <!-- Mobile Warning -->
        <div
          class="fixed inset-0 z-[999] w-dvw h-dvh bg-black-950/90 backdrop-blur-sm flex flex-col gap-2 items-center justify-center px-1"
          v-if="showMobileWarning"
        >
          <div class="icon-morph-container">
            <PhDesktop
              ref="desktopIcon"
              :size="64"
              weight="duotone"
              class="text-rose-300"
            />
            <PhDeviceMobile
              ref="mobileIcon"
              :size="64"
              weight="duotone"
              class="text-rose-300"
            />
          </div>

          <h1 class="text-rose-400 text-4xl font-bold">行動裝置表現不佳</h1>

          <p class="text-rose-200 text-center px-4">
            本遊戲並未在行動裝置上進行過測試，因此建議您在電腦上進行遊戲體驗。
            如果仍需在行動裝置上遊玩，請按底下按鈕
          </p>

          <button
            class="px-4 flex gap-1 items-center py-2 rounded-lg bg-rose-400 text-black-950 hover:bg-rose-300 transition-colors"
            @click="dismissWarning"
          >
            <PhX :size="24" weight="thin" />
            仍要繼續瀏覽
          </button>
        </div>

        <!-- Main Game Window -->
        <iframe
          src="/game/index.html"
          title="社博遊戲"
          class="game-frame"
          allow="fullscreen; autoplay; gamepad"
          allowfullscreen
        />
        <div
          class="text-black-50 mt-4 absolute left-1/2 -translate-x-1/2 bottom-4"
        >
          <p>這就是社博那個遊戲，操作很簡單：</p>
          <ul
            class="hidden sm:grid sm:grid-cols-2 gap-x-6 list-disc gap-y-1 mt-3"
          >
            <li>按下 <kbd>Space</kbd> 開始遊戲，空白鍵也可以跳躍。</li>
            <li>遊戲結束後，按下 <kbd>R</kbd> 重新開始。</li>
            <li>
              使用 <kbd>W</kbd>、<kbd>A</kbd>、<kbd>S</kbd>、<kbd>D</kbd>
              控制角色移動。
            </li>
            <li>按住 <kbd>Shift</kbd> 移動可以疾跑。</li>
            <li>按住 <kbd>S</kbd> 移動可以進行翻滾。</li>
            <li>
              按住 <kbd>Shift</kbd> + <kbd>S</kbd> 且不移動，可以直接掉下去。
            </li>
            <li>按下滑鼠左鍵即可發射子彈。</li>
          </ul>
        </div>
      </div>
      <div
        v-else
        class="game-launch-frame size-full flex flex-col gap-2 items-center justify-center"
      >
        <h2 class="text-purple text-2xl lg:text-6xl font-bold">社博遊戲</h2>
        <p class="text-black-50 text-base">社博時的遊戲</p>
        <button
          class="px-4 flex gap-1 items-center py-2 rounded-lg bg-purple text-black-950 hover:bg-purple-dark transition-colors"
          @click="open = true"
        >
          點此啟動
        </button>
      </div>
    </div>
  </Window>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { PhDesktop, PhDeviceMobile, PhX } from "@phosphor-icons/vue";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

const open = ref(false);

const desktopIcon = ref(null);
const mobileIcon = ref(null);
let morphTimeline = null;

const showMobileWarning = ref(false);

function isMobile() {
  const ua = navigator.userAgent;
  // 檢查常見的行動裝置關鍵字
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    ua,
  );
}

const dismissWarning = () => {
  showMobileWarning.value = false;
};

onMounted(() => {
  if (window.innerWidth < 600 || isMobile()) {
    showMobileWarning.value = true;
  }
});

watch(open, async (isOpen) => {
  // 清除舊動畫
  morphTimeline?.kill();
  morphTimeline = null;

  if (!isOpen) return;

  // 等待 Vue 建立 SVG DOM
  await nextTick();

  const desktopSvg = desktopIcon.value?.$el;
  const mobileSvg = mobileIcon.value?.$el;

  if (!desktopSvg || !mobileSvg) {
    console.warn("[GamePlay] SVG not found");
    return;
  }

  const desktopPaths = [...desktopSvg.querySelectorAll("path")];

  const mobilePaths = [...mobileSvg.querySelectorAll("path")];

  console.log("[GamePlay] Desktop:", desktopPaths);
  console.log("[GamePlay] Mobile:", mobilePaths);

  if (desktopPaths.length !== 2 || mobilePaths.length !== 2) {
    console.warn("[GamePlay] Unexpected SVG structure");
    return;
  }

  // 隱藏目標 SVG，但保留其 Path 作為 Morph 參考
  gsap.set(mobileSvg, {
    autoAlpha: 0,
  });

  // 建立動畫 Timeline
  morphTimeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.5,
    yoyo: true,
  });

  desktopPaths.forEach((path, index) => {
    morphTimeline.to(
      path,
      {
        duration: 1.2,
        morphSVG: {
          shape: mobilePaths[index],
          type: "rotational",
        },
        ease: "power2.inOut",
      },
      0,
    );
  });

  console.log("[GamePlay] Morph animation started");
});

onUnmounted(() => {
  morphTimeline?.kill();
  morphTimeline = null;

  open.value = false;
});
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.game-frame {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  border: none;
  overflow: hidden;
}

.icon-morph-container {
  position: relative;
  width: 64px;
  height: 64px;
}

.icon-morph-container > :deep(svg) {
  position: absolute;
  inset: 0;
  width: 64px;
  height: 64px;
}
</style>
