<template>
  <div class="bg-white p-6 rounded">
    <h2 class="mb-3">News</h2>

    <div v-for="(post, index) in news" :key="index" class="mb-3">
      <p class="text-sm text-gray-700">{{ formatDate(post.date) }}</p>

      <NuxtLink :to="post.path" class="underline">{{ post.title }}</NuxtLink>

      <div v-html="post.description" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const news = await $content('news')
      .only(['title', 'date', 'description'])
      .sortBy('date', 'desc')
      .limit(10)
      .fetch();
    return {
      news,
    };
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
</style>