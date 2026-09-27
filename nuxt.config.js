// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  compatibilityDate: '2026-09-27',

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts'
  ],

  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  image: {
    domains: ['pbs.twimg.com', 'dispatch-public.s3.amazonaws.com', 'd1rgjmn2wmqeif.cloudfront.net']
  },

  // @nuxtjs/tailwindcss's default cssPath ("assets/css/tailwind.css")
  // resolves relative to the project root, not Nuxt 4's `app/` srcDir -
  // it was silently missing our actual app/assets/css/tailwind.css and
  // falling back to Tailwind's generic default stylesheet (visible as
  // "Using default Tailwind CSS file" in the build log), dropping every
  // custom rule in that file (.icon, .prose overrides, etc). The `~/`
  // alias forces resolution against srcDir instead.
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },

  // @nuxt/fonts can't see that Tailwind's font-bold/font-medium/etc utility
  // classes apply to the same "Public Sans" family (they're separate CSS
  // rules), so its usage-scan defaults to weight 400 only. Public Sans is
  // served by Google as a variable font, so declare a single weight range
  // (matching the app's actual usage: font-light through font-bold) rather
  // than discrete weights - Google returns the same variable file for every
  // discrete weight request, and without a range, the browser doesn't know
  // to interpolate it, so every declared weight would render identically.
  fonts: {
    families: [
      { name: 'Public Sans', weights: ['300 700'], styles: ['normal', 'italic'] }
    ]
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['lite-youtube'].includes(tag)
    }
  },

  // News and shows content only changes on new deploys, so prerender these
  // routes at build time instead of running SSR on every request.
  routeRules: {
    '/': { prerender: true },
    '/news': { prerender: true },
    '/news/**': { prerender: true },
    '/shows': { prerender: true }
  },

  devtools: {
    enabled: false
  },
});