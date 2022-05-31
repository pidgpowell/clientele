<script setup>
const latestPosts = await queryContent("news").sort({ date: -1 }).findOne();
const formatDate = useDateFormat();
const excerpt = true;
</script>

<template>
  <div>
    <h2 class="!mt-0">{{ latestPosts.title }}</h2>
    <p class="text-gray-500 mb-0 !text-sm">
      {{ formatDate(latestPosts.date, { dateStyle: "medium" }) }}
    </p>
    <MarkdownRenderer
      :value="latestPosts"
      :excerpt="excerpt"
      class="prose-table:max-w-sm"
    />
    <NuxtLink v-if="excerpt && latestPosts.excerpt" :to="latestPosts._path"
      >Read more</NuxtLink
    >

    <hr />

    <Shows label="Upcoming Shows" :upcoming="true" direction="asc" />
  </div>
</template>
