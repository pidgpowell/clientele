<script setup>
const { path } = useRoute();
const formatDate = useDateFormat();
const news = await queryContent("news").sort({ date: -1 }).limit(3).find();

const isNewsPage = path.includes("/news/");
const isNewsIndex = path === "/news";
</script>

<template>
  <div>
    <ContentDoc v-if="isNewsPage" :path="path" v-slot="{ doc }">
      <div class="relative">
        <NuxtLink
          class="absolute -top-6 text-xs text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-800 no-underline"
          to="/news"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="flex-shrink-0 w-4 h-4 mr-1 inline text-gray-400"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m11 19l-7-7l7-7m8 14l-7-7l7-7"
            ></path></svg
          >Back</NuxtLink
        >
        <h2>{{ doc.title }}</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-0 !text-sm">
          {{ formatDate(doc.date, { dateStyle: "medium" }) }}
        </p>
        <MarkdownRenderer :value="doc" />
      </div>
    </ContentDoc>

    <template v-if="isNewsIndex">
      <h2>News</h2>
      <ul class="list-none m-0 mt-7 p-0">
        <li
          v-for="page in news"
          :key="page._path"
          class="leading-tight mb-5 ml-0 pl-0"
        >
          <NuxtLink :to="page._path" class="text-lg -mb-1">{{
            page.title
          }}</NuxtLink>
          <small class="text-sm block mt-0">
            {{ formatDate(page.date, { dateStyle: "medium" }) }}
          </small>
        </li>
      </ul>
    </template>
  </div>
</template>
