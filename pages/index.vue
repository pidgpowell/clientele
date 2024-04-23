<script setup>
  const { data } = await useAsyncData("news-home", () =>
    queryContent("news").sort({ date: -1 }).limit(1).find()
  );
  const formatDate = useDateFormat();
  const excerpt = true;

  useHead({
    title: "",
  });
</script>

<template>
  <div class="relative pt-2">
    <nav
      class="absolute flex items-center text-xs text-gray-500 -top-2"
      aria-label="breadcrumbs"
    >
      <icon-home /> Home
    </nav>

    <div
      v-for="post in data"
      :key="post._id"
    >
      <h2>
        <NuxtLink
          :to="post._path"
          class="no-underline hover:underline"
        >
          <span v-html="post.title" />
        </NuxtLink>
      </h2>

      <p class="text-gray-500 dark:text-gray-400 mb-0 !text-sm">
        {{ formatDate(post.date, { dateStyle: "medium" }) }}
      </p>

      <ContentRenderer
        :value="post"
        :excerpt="excerpt"
        class="prose-table:max-w-sm"
      />

      <NuxtLink
        v-if="excerpt && post.excerpt"
        :to="post._path"
        class="px-4 py-3 no-underline border border-black border-solid border-1 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Read more
      </NuxtLink>
    </div>

    <hr />

    <Shows
      label="Upcoming Shows"
      :upcoming="true"
      direction="asc"
    />

    <NuxtLink
      to="/shows"
      class="block px-4 py-2 mt-6 no-underline border border-black border-solid max-w-fit border-1 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      See all shows
    </NuxtLink>
  </div>
</template>
