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

  experimental: {
    payloadExtraction: true,
    headNext: true
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['-'].includes(tag),
    },
  },

  devtools: false
});
