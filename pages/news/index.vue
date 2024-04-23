<script setup>
  const formatDate = useDateFormat();
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
      class="absolute -top-2 flex items-center"
      aria-label="breadcrumbs"
    >
      <IconHome />
      <NuxtLink
        class="text-xs text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-800 no-underline hover:underline"
        to="/"
      >
        Home</NuxtLink
      >
    </nav>
    <h2>News</h2>
  </div>

  <ul class="list-none m-0 mt-7 p-0">
    <li
      v-for="page in news"
      :key="page._path"
      class="leading-tight mb-5 ml-0 pl-0"
    >
      <NuxtLink
        :to="page._path"
        class="text-lg/snug max-w-[55ch] block"
        ><span v-html="page.title"
      /></NuxtLink>
      <small class="text-sm block mt-0">
        {{ formatDate(page.date, { dateStyle: "medium" }) }}
      </small>
    </li>
  </ul>
</template>
