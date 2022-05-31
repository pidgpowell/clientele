<script setup>
const latestPosts = await queryContent("news").sort({ date: -1 }).findOne();
const formatDate = useDateFormat();
const excerpt = true;
</script>

<template>
  <div class="relative pt-2">
    <nav class="absolute -top-2 flex items-center text-xs text-gray-500">
      <icon-home /> Home
    </nav>
    <h2>{{ latestPosts.title }}</h2>
    <p class="text-gray-500 mb-0 !text-sm">
      {{ formatDate(latestPosts.date, { dateStyle: "medium" }) }}
    </p>
    <MarkdownRenderer
      :value="latestPosts"
      :excerpt="excerpt"
      class="prose-table:max-w-sm"
    />
    <NuxtLink
      v-if="excerpt && latestPosts.excerpt"
      :to="latestPosts._path"
      class="border-1 px-4 py-3 border-black border-solid border rounded-md no-underline hover:bg-gray-100"
      >Read more</NuxtLink
    >

    <hr />

    <Shows label="Upcoming Shows" :upcoming="true" direction="asc" />

    <NuxtLink
      to="/shows"
      class="inline-block mt-3 border-1 px-4 py-3 border-black border-solid border rounded-md no-underline hover:bg-gray-100"
      >See all shows</NuxtLink
    >
  </div>
</template>
