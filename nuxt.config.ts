import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-svgo", "@nuxt/fonts", "@comark/nuxt"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/global.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  svgo: {
    autoImportPath: "~/assets/icons/",
  },
  fonts: {
    defaults: { weights: ["200", "400", "700"], styles: ["normal"] },
    local: {
      dirs: ["app/assets/fonts"],
    },
  },
});
