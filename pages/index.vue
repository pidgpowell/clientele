<template>
  <div class="flex flex-col md:flex-row bg-white p-6 rounded">
    <div class="md:w-1/3 max-w-sm md:pr-8">
      <h2 class="mb-3">Twitter</h2>

      <div class="mb-5 border p-3 pl-2 pb-2 hover:bg-gray-100 max-w-xs">
        <client-only placeholder="Twitter loading...">
          <Timeline
            id="theclientele"
            sourceType="profile"
            :options="{
              tweetLimit: '1',
              chrome: 'noheader nofooter noborders transparent',
              theme: 'light',
              dnt: true,
            }"
            class="-m-2"
          />
        </client-only>
      </div>
    </div>

    <div class="md:w-2/3 pr-0">
      <h2 class="mb-3">News</h2>
      <div v-for="(post, index) in news" :key="index">
        <p class="text-sm text-gray-700">{{ formatDate(post.date) }}</p>
        <NuxtLink :to="post.path" class="underline">{{ post.title }}</NuxtLink>
        <div v-html="post.description" />
      </div>
    </div>
  </div>
</template>

<script>
import { Timeline } from 'vue-tweet-embed';

export default {
  components: {
    Timeline,
  },
  async asyncData({ $content }) {
    const news = await $content('news')
      .only(['title', 'date', 'description', 'path'])
      .sortBy('date', 'desc')
      .limit(1)
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
.container {
  @apply min-h-screen flex justify-start text-left;
}
</style>
