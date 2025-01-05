// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,

  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxtjs/tailwindcss"
  ],

  image: {
    domains: ['pbs.twimg.com', 'dispatch-public.s3.amazonaws.com']
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['lite-youtube'].includes(tag),
    },
  },

  devtools: false,
  compatibilityDate: "2025-01-04"
});