<script setup>
// const news = await queryContent("news").sort("date", "desc").findOne();
// const latestPosts = await queryContent("news")
//   .sort("date", "desc")
//   .limit(1)
//   .find();
// const formatDate = useFormat();

// const { data: navigation } = await useAsyncData("navigation", () => {
//   return fetchContentNavigation();
// });
</script>

<template>
  <div>
    <NuxtLayout>
      <div
        class="-mt-6 md:-mt-12 xl:-mt-[5%] ml-[3.4vw] py-2 pl-6 md:pl-[3.7vw] border-l sm:border-l-2 border-gray-100 prose md:max-w-[59vw]"
      >
        <ContentList v-slot="{ list }">
        {{ list }}
        </ContentList>

        <!-- {{ latestPosts }} -->
        <!-- <ContentNavigation path="/shows" /> -->
        <!-- <AppNavigation :navigation-tree="navigation" /> -->
        <!--
        <p class="date text-xs text-gray-500">{{ formatDate(news.date) }}</p>
        <h1 class="mt-0 mb-0">{{ news.title }}</h1>

        <ContentRenderer v-if="news" :value="news" />

        <ContentQuery path="/shows" v-slot="{ data }">
          1 {{ data }}2
        </ContentQuery> -->
        <!-- {{ latestPosts }} -->
      </div>
    </NuxtLayout>
  </div>
</template>
