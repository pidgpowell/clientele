<script setup>
const { data: shows } = await useAsyncData("shows", () => {
  return queryContent("/shows").find();
});
const formatDate = useFormat();
</script>

<template>
  <div>
    <h2 class="text-3xl">Shows</h2>

    <div class="p-4">
      <div class="flex flex-col gap-4">
        <div v-for="(show, index) in shows" :key="index">
          {{ formatDate(show.date) }} {{ show.city }}
        </div>
      </div>
    </div>
  </div>
</template>
