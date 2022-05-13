<script setup>
const route = useRoute();
const formatDate = useFormat();

const shows = await queryContent("shows")
  .sortBy("date", "desc")
  .where({ date: { $contains: route.params.year } })
  .find();

// if (isNaN(Number(route.params.year)))
//   throwError("😱 Oh no, an error has been thrown.");

// definePageMeta({
//   title: route.meta.title + " | Shows",
// });
</script>

<template>
  <div>xxx</div>
</template>
