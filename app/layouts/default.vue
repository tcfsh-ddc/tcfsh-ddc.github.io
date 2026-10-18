<template>
  <div class="h-screen w-screen bg-black p-6">
    <div
      class="bg-purple rounded-frame-0 outline-purple outline-2.5 h-full w-full flex flex-1 flex-col overflow-hidden p-2.5 gap-0"
    >
      <!-- 畫面內容 -->
      <div
        class="flex-1 flex flex-col bg-blue-dark rounded-frame-1 rounded-b-none"
      >
        <slot />
      </div>

      <!-- 工作列 -->
      <div><LayoutTaskbar /></div>
    </div>
  </div>
</template>

<script setup></script>
