<template>
  <div class="text-white">
    <Terminal />
  </div>
</template>

<script setup>
import Terminal from "~/components/window/about/Terminal.vue";

useHead({
  title: "關於我們 - 中一中數位創作研究社",
  meta: [
    {
      name: "description",
      content: "對，關於我們的介紹，我們是什麼？我們是什麼？我們是數創！",
    },
  ],
});

useSeoMeta({
  title: "關於我們 - 中一中數位創作研究社",
  ogTitle: "關於我們 - 中一中數位創作研究社",
  description: "對，關於我們的介紹，我們是什麼？我們是什麼？我們是數創！",
  ogDescription: "對，關於我們的介紹，我們是什麼？我們是什麼？我們是數創！",
  ogImage: "https://tcfsh-ddc.github.io/opengraph/about-og.png",
  twitterCard: "summary_large_image",
});
</script>
