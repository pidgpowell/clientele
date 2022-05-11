<script setup>
const { data: home } = await useAsyncData("news", () => {
  return queryContent("/news").findOne();
});

const formatDate = useFormat();
</script>

<template>
  <div>
    <NuxtLayout>
      <div
        v-if="home"
        class="-mt-6 md:-mt-12 xl:-mt-[5%] ml-[3.4vw] py-2 pl-6 md:pl-[3.7vw] border-l sm:border-l-2 border-gray-100 prose md:max-w-[59vw]"
      >
        <p class="date text-xs text-gray-500">{{ formatDate(home.date) }}</p>
        <h1 class="mt-0 mb-0">{{ home.title }}</h1>
        <Content v-if="home" :document="home" />
      </div>
    </NuxtLayout>
  </div>
</template>
