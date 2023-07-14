// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],

  experimental: {
    payloadExtraction: true
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['lite-youtube'].includes(tag),
    },
  },

  devtools: false
});
