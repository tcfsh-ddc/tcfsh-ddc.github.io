<template><LinksApp /></template>

<script setup lang="ts">
const hostname = import.meta.env.VITE_SITE_URL || "https://tcfsh-ddc.github.io";

import LinksApp from "~/components/window/links/LinksApp.vue";

useHead({
  title: "友情連結 - 中一中數位創作研究社",
  meta: [
    {
      name: "description",
      content: "中一中數位創作研究社的友社、組織、活動與個人連結。",
    },
  ],
});

useSeoMeta({
  title: "友情連結 - 中一中數位創作研究社",
  ogTitle: "友情連結 - 中一中數位創作研究社",
  description: "中一中數位創作研究社的友社、組織、活動與個人連結。",
  ogDescription: "中一中數位創作研究社的友社、組織、活動與個人連結。",
  ogImage: `${hostname}/opengraph/links-og.png`,
  ogUrl: `${hostname}/links`,
  twitterCard: "summary_large_image",
  twitterTitle: "關於我們 - 中一中數位創作研究社",
  twitterDescription: "中一中數位創作研究社的友社、組織、活動與個人連結。",
  twitterImage: `${hostname}/opengraph/links-og.png`,
});
</script>
