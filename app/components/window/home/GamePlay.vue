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
import { ref } from "vue";

const open = ref(false);

onMounted(() => {
  // open.value = true;
});

onUnmounted(() => {
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
</style>
