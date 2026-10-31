import tailwindcss from "@tailwindcss/vite";
import { base64Loader } from "./plugins/vite-image-to-base64";
import { siteConfig } from "./app/config/site";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-svgo", "@nuxt/fonts", "@comark/nuxt", "oxc-nuxt"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/global.css"],
  vite: {
    plugins: [tailwindcss(), base64Loader],

    // build: {
    //   // 超過此大小（單位：bytes）的資產才會變成獨立檔案，小於此大小則自動轉為 Base64 內聯
    //   assetsInlineLimit: 9000,
    // },
  },
  svgo: {
    autoImportPath: "~/assets/icons/",
  },
  // fonts: {
  //   defaults: { weights: ["200", "400", "700"], styles: ["normal"] },
  //   local: {
  //     dirs: ["app/assets/fonts"],
  //   },
  // },

  app: {
    head: {
      title: siteConfig.name, // default fallback title
      htmlAttrs: {
        lang: "zh-TW",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "stylesheet", href: "https://font.emtech.cc/css/GlowSansTCCom" }, // font.emtech.cc
      ],
    },
  },
});
