<script setup>
import { byValue, byNumber, byString } from "sort-es";

const props = defineProps({
  label: {
    type: String,
    default: "Shows",
  },
  upcoming: {
    type: Boolean,
    default: true,
  },
});

let direction = ref({
  date: true,
});

let search = ref("");
let currentSort = ref("date");
let filterByYear = ref("");
const formatDate = useDateFormat();
const getRawShowsData = await queryContent("shows").findOne();
// sort tour dates
const years = computed(() => {
  return [
    ...new Set(
      getRawShowsData.body
        // simple search
        .map((item) => {
          let options = { year: "numeric" };
          return formatDate(item.date, options);
        })
    ),
  ].sort(byNumber({ desc: true }));
});

const dates = computed(() => {
  return (
    getRawShowsData.body
      .filter((item) => {
        // upcoming shows vs old shows
        if (props.upcoming !== undefined) {
          if (props.upcoming === true) {
            return new Date(item.date) >= new Date();
          } else {
            return new Date(item.date) < new Date();
          }
        } else {
          return true;
        }
      })
      // simple search
      .filter((item) => {
        if (search.value) {
          const searchFields = [item.venue, item.city, item.country];
          let searchResult = 0;
          searchFields.forEach((field) => {
            if (field.toLowerCase().includes(search.value.toLowerCase()))
              searchResult++;
          });
          return searchResult > 0 ? item : false;
        }
        return true;
      })
      // simple sort
      .sort(
        byValue(
          (i) =>
            currentSort.value === "date"
              ? new Date(i[currentSort.value])
              : i[currentSort.value],
          currentSort.value === "date"
            ? byNumber({ desc: direction.value[currentSort.value] })
            : byString({ desc: direction.value[currentSort.value] })
        )
      )
  );
});

const sort = (key) => {
  currentSort.value = key;
  direction.value[key] = !direction.value[key];
};
</script>

<template>
  <div>
    <div class="flex items-center mt-3 justify-end gap-4">
      <h2 class="!mt-0 mr-auto" v-html="label" />
      <select
        v-model="filterByYear"
        class="form-select border-gray-300 rounded-sm w-full max-w-[150px]"
        placeholder="Filter by year"
      >
        <option disabled selected value="">Filter by year</option>
        <option v-for="(year, index) in years" :value="year" :key="index">
          {{ year }}
        </option>
      </select>
      <input
        type="search"
        class="form-input border-gray-300 rounded-sm dark:bg-gray-800 dark:text-white max-w-[150px]"
        v-model="search"
        placeholder="Search"
      />
    </div>

    <table class="table mb-2 mt-7 prose-td:text-md prose-td:lg:text-lg">
      <thead>
        <tr>
          <th class="flex leading-snug">
            <button
              class="flex gap-1 items-center font-bold outline-none focus-visible:ring-2 no-wrap"
              @click="sort('date')"
            >
              Date
              <icon-triangle
                v-if="currentSort === 'date'"
                :class="{ 'rotate-180': direction.date }"
              />
            </button>
          </th>
          <th class="leading-snug">
            <button
              class="flex gap-1 items-center font-bold outline-none focus-visible:ring-2"
              @click="sort('venue')"
            >
              Venue
              <icon-triangle
                v-if="currentSort === 'venue'"
                :class="{ 'rotate-180': direction.venue }"
              />
            </button>
          </th>
          <th class="leading-snug">
            <button
              class="flex gap-1 items-center font-bold outline-none focus-visible:ring-2"
              @click="sort('city')"
            >
              City
              <icon-triangle
                v-if="currentSort === 'city'"
                :class="{ 'rotate-180': direction.city }"
              />
            </button>
          </th>
          <th class="leading-snug">
            <button
              class="flex gap-1 items-center font-bold outline-none focus-visible:ring-2"
              @click="sort('country')"
            >
              Country
              <icon-triangle
                v-if="currentSort === 'country'"
                :class="{ 'rotate-180': direction.country }"
              />
            </button>
          </th>
        </tr>
      </thead>
      <tbody class="leading-tight">
        <tr v-for="(show, index) in dates" :key="index">
          <td>
            {{ formatDate(show.date, { dateStyle: "long" }) }}
          </td>
          <td>
            {{ show.venue }}
          </td>
          <td>
            {{ show.city }}
          </td>
          <td>
            {{ show.country }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
