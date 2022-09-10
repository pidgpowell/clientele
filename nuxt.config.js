import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true
    }
  },

  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],
});
