<template>
  <div class="h-screen w-screen bg-black p-0 md:p-6">
    <div
      class="bg-purple md:rounded-frame-0 outline-purple outline-2.5 h-full w-full flex flex-1 flex-col overflow-hidden p-1 md:p-2.5 gap-0"
    >
      <!-- 畫面內容 -->
      <div
        class="flex-1 min-h-0 flex flex-col bg-blue-dark rounded-frame-1 rounded-b-frame-1 md:rounded-b-none overflow-hidden p-1"
        id="desktop-frame"
      >
        <WindowsContainer>
          <slot />
        </WindowsContainer>
      </div>

      <!-- 工作列 -->
      <div><LayoutTaskbar /></div>
    </div>
  </div>
</template>

<script setup></script>

<style>
#desktop-frame {
  background-image: url("~/assets/images/desktop-bg.png");
  background-position: 90% center;
  background-repeat: no-repeat;
}
</style>
