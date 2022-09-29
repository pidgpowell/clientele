<script setup>
const { path, params } = useRoute();
const formatDate = useDateFormat();

const isNewsPage = params.slug !== '';
const isNewsIndex = params?.slug === '';

let news, query;
const today = new Date().toISOString().slice(0, 10);
if (isNewsIndex) {
  news = await queryContent("news")
    .where({ date: { $lte: today } })
    .sort({ date: -1 })
    .limit(3)
    .find();
} else {
  query = {
    path: '/news',
    where: {
      date: {
        $lte: today
      }
    },
    limit: 1,
    sort: { date: -1 }
  };
}
</script>

<template>
  <div>
    <template v-if="isNewsPage">
      <div class="relative pt-2">
        <nav class="absolute -top-2 flex items-center">
          <icon-home />
            <NuxtLink
            class="text-xs text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-800 no-underline hover:underline"
            to="/"
          >
            Home</NuxtLink
          >
          <icon-breadcrumb-divider />
          <NuxtLink
            class="text-xs text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-800 no-underline hover:underline"
            to="/news"
            >News</NuxtLink
          >
        </nav>

        <ContentDoc :query="query">
          <template v-slot="{ doc }">
            <h2 class="!font-medium">{{ doc.title }}</h2>
            <p class="text-gray-500 dark:text-gray-400 mb-0 !text-sm">
              {{ formatDate(doc.date, { dateStyle: "medium" }) }}
            </p>
            <ContentRenderer :value="doc" />
          </template>
          <template #not-found>
            <p>No articles found.</p>
          </template>
        </ContentDoc>
      </div>
    </template>

    <template v-else>
      <div class="relative pt-2">
        <nav class="absolute -top-2 flex items-center">
          <icon-home />
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
