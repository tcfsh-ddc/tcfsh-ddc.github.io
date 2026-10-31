<template>
  <div class="text-white">
    <Terminal />
  </div>
</template>

<script setup>
const hostname = import.meta.env.VITE_SITE_URL || "https://tcfsh-ddc.github.io";

import Terminal from "~/components/window/about/Terminal.vue";
import { siteConfig, pageTitle } from "@/config/site";

useHead({
  title: pageTitle("關於我們"),
  meta: [
    {
      name: "description",
      content: siteConfig.aboutDescription,
    },
  ],
});

useSeoMeta({
  title: pageTitle("關於我們"),
  ogTitle: pageTitle("關於我們"),
  description: siteConfig.aboutDescription,
  ogDescription: siteConfig.aboutDescription,
  ogImage: `${hostname}/opengraph/about-og.png`,
  ogUrl: `${hostname}/about`,
  twitterCard: "summary_large_image",
  twitterTitle: pageTitle("關於我們"),
  twitterDescription: siteConfig.aboutDescription,
  twitterImage: `${hostname}/opengraph/about-og.png`,
});
</script>
