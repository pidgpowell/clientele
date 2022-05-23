<script setup>
const { path } = useRoute();
const { data } = await useAsyncData(`${path}`, () => {
  return queryContent().where({ _path: path }).findOne();
});
const formatDate = useFormat();
</script>

<template>
  <div>
    <NuxtLayout>
      <div
        class="-mt-6 md:-mt-12 xl:-mt-[5%] ml-[3.4vw] py-2 pl-6 md:pl-[3.7vw] border-l sm:border-l-2 border-gray-100 prose md:max-w-[59vw]"
      >
        <template v-if="data">
          x
          <p class="date text-xs text-gray-500">{{ formatDate(data.date) }}</p>
          <h1 class="mt-0 mb-0">{{ data.title }}</h1>
          <ContentDoc />
        </template>
        <template v-else>
        1  <ContentDoc />
        </template>
      </div>
    </NuxtLayout>
  </div>
</template>
