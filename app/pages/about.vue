<template>
  <div class="text-white">
    <Terminal />
  </div>
</template>

<script setup>
const hostname = import.meta.env.VITE_SITE_URL || "https://tcfsh-ddc.github.io";

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
  ogImage: `${hostname}/opengraph/about-og.png`,
  ogUrl: `${hostname}/about`,
  twitterCard: "summary_large_image",
  twitterTitle: "關於我們 - 中一中數位創作研究社",
  twitterDescription:
    "對，關於我們的介紹，我們是什麼？我們是什麼？我們是數創！",
  twitterImage: `${hostname}/opengraph/about-og.png`,
});
</script>
