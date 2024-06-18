<script setup>
  const news = await queryContent("news")
    .sort({ date: -1 })
    .limit(3)
    .only(["_path", "date", "title"])
    .find();

  useHead({
    title: "News",
  });
</script>

<template>
  <div class="relative pt-2">
    <nav
      class="absolute flex items-center -top-2"
      aria-label="breadcrumbs"
    >
      <IconHome />
      <NuxtLink
        class="text-xs text-gray-600 no-underline dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-800 hover:underline"
        to="/"
      >
        Home</NuxtLink
      >
    </nav>
    <h2>News</h2>
  </div>

  <ul class="p-0 m-0 list-none mt-7">
    <li
      v-for="page in news"
      :key="page._path"
      class="mb-5 leading-tight ps-0 ms-0"
    >
      <NuxtLink
        :to="page._path"
        class="text-lg/snug max-w-[55ch] block"
        ><span v-html="page.title"
      /></NuxtLink>
      <small class="block mt-0 text-sm">
        {{ formatDate(page.date, { dateStyle: "medium" }) }}
      </small>
    </li>
  </ul>
</template>
