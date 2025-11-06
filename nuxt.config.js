// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  compatibilityDate: '2025-11-06',

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  image: {
    domains: ['pbs.twimg.com', 'dispatch-public.s3.amazonaws.com']
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['lite-youtube'].includes(tag)
    }
  },

  devtools: {
    enabled: false
  },
});