<template><LinksApp /></template>

<script setup lang="ts">
const hostname = import.meta.env.VITE_SITE_URL || "https://tcfsh-ddc.github.io";

import LinksApp from "~/components/window/links/LinksApp.vue";
import { pageTitle } from "@/config/site";

useHead({
  title: pageTitle("友情連結"),
  meta: [
    {
      name: "description",
      content: "中一中數位創作研究社的友社、組織、活動與個人連結。",
    },
  ],
});

useSeoMeta({
  title: pageTitle("友情連結"),
  ogTitle: pageTitle("友情連結"),
  description: "中一中數位創作研究社的友社、組織、活動與個人連結。",
  ogDescription: "中一中數位創作研究社的友社、組織、活動與個人連結。",
  ogImage: `${hostname}/opengraph/links-og.png`,
  ogUrl: `${hostname}/links`,
  twitterCard: "summary_large_image",
  twitterTitle: pageTitle("友情連結"),
  twitterDescription: "中一中數位創作研究社的友社、組織、活動與個人連結。",
  twitterImage: `${hostname}/opengraph/links-og.png`,
});
</script>
