<script setup>
const route = useRoute();
const formatDate = useFormat();

const { data: shows } = await useAsyncData("shows", () => {
  return queryContent("/shows")
    .sortBy("date", "desc")
    .where({ date: { $contains: route.params.year } })
    .find();
});

// if (isNaN(Number(route.params.year)))
//   throwError("😱 Oh no, an error has been thrown.");

// definePageMeta({
//   title: route.meta.title + " | Shows",
// });
</script>

<template>
  <div class="p-4">
    <h2 class="text-3xl">Shows</h2>

    <table v-if="shows && shows.length > 0" class="table-auto md:table-fixed">
      <tr v-for="(show, index) in shows" :key="index">
        <td class="align-top p-2 pl-0">
          {{ formatDate(show.date) }}
        </td>
        <td class="align-top p-2">
          {{ show.city }}
        </td>
        <td class="align-top p-2">
          {{ show.venue }}
          <template v-if="show.description"
            ><br />{{ show.description }}</template
          >
        </td>
      </tr>
    </table>
    <div v-else>No shows in this year.</div>
  </div>
</template>
