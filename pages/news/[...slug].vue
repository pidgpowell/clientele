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
        <IconBreadcrumbDivider />
        <NuxtLink
          class="text-xs text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-800 no-underline hover:underline"
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
