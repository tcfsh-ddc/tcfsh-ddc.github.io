<template>
  <div class="home-desktop">
    <Window
      class="demo-window demo-window--welcome"
      :initial-x="36"
      :initial-y="32"
      :initial-width="520"
      :initial-height="330"
    >
      <div class="window-content window-content--welcome">
        <p class="window-kicker">DDC DESKTOP</p>
        <h1>歡迎來到數位設計創作社</h1>
        <p>這是一個可以自由拖曳、縮放和最大化的視窗。試著抓住空白區域移動它吧。</p>
        <div class="window-tags">
          <span>Design</span>
          <span>Code</span>
          <span>Creative</span>
        </div>
      </div>
    </Window>

    <Window
      class="demo-window demo-window--notes"
      :initial-x="610"
      :initial-y="74"
      :initial-width="390"
      :initial-height="280"
      :min-width="260"
      :min-height="190"
    >
      <div class="window-content window-content--notes">
        <p class="window-kicker">TODAY.TXT</p>
        <h2>今天要做的事</h2>
        <ul data-window-no-drag>
          <li><span>✓</span> 做一個很酷的網站</li>
          <li><span>✓</span> 測試視窗拖曳</li>
          <li><span>○</span> 想下一個有趣企劃</li>
        </ul>
      </div>
    </Window>

    <Window
      class="demo-window demo-window--status"
      :initial-x="330"
      :initial-y="390"
      :initial-width="460"
      :initial-height="220"
      :min-width="280"
      :min-height="170"
    >
      <div class="window-content window-content--status">
        <div class="status-orb" aria-hidden="true" />
        <div>
          <p class="window-kicker">SYSTEM STATUS</p>
          <h2>創作能量充足</h2>
          <p>所有系統運作正常，靈感正在背景持續載入。</p>
        </div>
      </div>
    </Window>
  </div>
</template>

<style scoped>
.home-desktop {
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 18% 22%, rgb(15 255 196 / 18%), transparent 28%),
    radial-gradient(circle at 82% 76%, rgb(255 0 205 / 18%), transparent 30%);
}

.demo-window {
  --window-border: 2px solid rgb(255 255 255 / 48%);
  --window-background: rgb(11 14 40 / 92%);
  --window-shadow: 8px 10px 0 rgb(0 0 0 / 35%);
  --window-control-background: rgb(33 92 255 / 78%);
  --window-control-hover-background: #0fffc4;
  --window-control-color: white;
  backdrop-filter: blur(14px);
}

.demo-window--notes {
  --window-background: rgb(52 0 60 / 94%);
  --window-control-background: rgb(255 0 205 / 70%);
}

.demo-window--status {
  --window-background: rgb(0 54 204 / 92%);
}

.window-content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 38px;
  color: white;
}

.window-content h1,
.window-content h2,
.window-content p {
  margin: 0;
}

.window-content h1 {
  max-width: 390px;
  margin-top: 16px;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 0.98;
}

.window-content h2 {
  margin-top: 12px;
  font-size: 1.75rem;
}

.window-content h1 + p,
.window-content h2 + p {
  max-width: 430px;
  margin-top: 18px;
  color: rgb(255 255 255 / 72%);
  line-height: 1.6;
}

.window-kicker {
  color: #0fffc4;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.window-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.window-tags span {
  padding: 5px 11px;
  border: 1px solid rgb(15 255 196 / 60%);
  border-radius: 999px;
  color: #0fffc4;
  font-size: 0.75rem;
}

.window-content--notes ul {
  display: grid;
  gap: 14px;
  margin: 26px 0 0;
  padding: 0;
  list-style: none;
  color: rgb(255 255 255 / 82%);
}

.window-content--notes li {
  display: flex;
  gap: 12px;
  align-items: center;
}

.window-content--notes li span {
  color: #0fffc4;
  font-weight: 700;
}

.window-content--status {
  display: flex;
  gap: 24px;
  align-items: center;
}

.status-orb {
  flex: 0 0 auto;
  width: 82px;
  height: 82px;
  border: 8px solid rgb(15 255 196 / 22%);
  border-radius: 50%;
  background: #0fffc4;
  box-shadow: 0 0 38px rgb(15 255 196 / 75%);
}

@media (max-width: 720px) {
  .window-content {
    padding: 28px;
  }

  .window-content h1 {
    font-size: 2.25rem;
  }
}
</style>
