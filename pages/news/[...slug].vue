<script setup>
  const { path } = useRoute();
  const formatDate = useDateFormat();
</script>

<template>
  <ContentDoc
    :path="path"
    v-slot="{ doc }"
  >
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
        <IconBreadcrumbDivider />
        <NuxtLink
          class="text-xs text-gray-600 no-underline dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-800 hover:underline"
          to="/news"
          >News</NuxtLink
        >
      </nav>

      <h2 class="!font-medium"><span v-html="doc.title" /></h2>
      <p class="text-gray-500 dark:text-gray-400 mb-0 !text-sm">
        {{ formatDate(doc.date, { dateStyle: "medium" }) }}
      </p>
      <ContentRenderer :value="doc" />
    </div>
  </ContentDoc>
</template>
