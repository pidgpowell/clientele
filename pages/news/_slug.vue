<template>

  <article class="relative bg-white p-6 rounded">
    <h2 class="mb-3">News</h2>

    <BackButton class="absolute z-10" style="top: -60px; right: 0px;" />

    <p class="text-sm text-gray-700">{{ formatDate(post.date) }}</p>

    <nuxt-content :document="post" />
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const post = await $content('news', params.slug).fetch();

    return { post };
  },

  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    },
  },
};
</script>

<style>
.nuxt-content-container h1 {
  @apply text-xl mb-3
}
.nuxt-content-container p {
  @apply mb-3
}
</style>