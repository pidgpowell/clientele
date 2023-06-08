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
  direction: {
    type: String,
    default: "desc",
    required: false,
  },
});

let direction = ref({
  date: props.direction === "desc",
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
      .filter(item => {
        if (filterByYear.value) {
          return formatDate(item.date, { year: "numeric" }) === filterByYear.value;
        }
        return item;
      })
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
  <div class="block">
    <div class="flex flex-col xs:flex-row xs:items-center justify-end gap-2">
      <h2 class="!mt-0 mr-auto !mb-0" v-html="label" :id="`table-label-${upcoming ? 'upcoming' : 'old'}`" />
      <div class="flex gap-2" v-if="!upcoming">
        <select
          v-model="filterByYear"
          class="form-select border-gray-300 dark:bg-black dark:border-gray-600 rounded-sm w-full max-w-[100px] md:max-w-[150px] px-2 py-1 text-sm md:text-base"
        >
          <option disabled selected value="">Year</option>
          <option value="">All Years</option>
          <option v-for="(year, index) in years" :value="year" :key="index">
            {{ year }}
          </option>
        </select>
        <input
          type="search"
          class="form-input border-gray-300 dark:bg-black dark:border-gray-600 rounded-sm dark:text-white max-w-[100px] md:max-w-[150px] px-2 py-1 text-sm md:text-base"
          v-model="search"
          placeholder="Search"
        />
      </div>
    </div>

    <table
      class="table mb-2 mt-7 prose-td:text-md prose-td:text-sm prose-td:lg:text-lg"
      v-if="dates.length > 0"
      :aria-labelledby="`table-label-${upcoming ? 'upcoming' : 'old'}`"
    >
      <thead>
        <tr>
          <th class="flex leading-snug">
            <button
              class="flex gap-1 items-center font-bold outline-none focus-visible:ring-2 no-wrap"
              @click="sort('date')"
            >
              Date
              <IconTriangle
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
              <IconTriangle
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
              <IconTriangle
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
              <IconTriangle
                v-if="currentSort === 'country'"
                :class="{ 'rotate-180': direction.country }"
              />
            </button>
          </th>
        </tr>
      </thead>
      <tbody class="leading-tight">
        <tr v-for="(show, index) in dates" :key="index">
          <td class="whitespace-nowrap font-light">
            {{ formatDate(show.date, { month: "short", day: "numeric" })
            }}<span class="block sm:hidden"></span
            ><span class="hidden sm:inline-block">, </span>
            {{ formatDate(show.date, { year: "numeric" }) }}
          </td>
          <td class="font-normal flex flex-col items-start leading-0 break-all md:break-normal">
            <div class="text-lg font-medium leading-tight text-gray-700 dark:text-gray-200">{{ show.venue }}</div>
            <div class="flex gap-2">
              <span v-if="show.info" v-html="show.info" class="text-sm leading-tight text-gray-700 dark:text-gray-500" />
              <a
                v-if="show['ticket-url']"
                class="text-xs underline"
                :href="show['ticket-url']"
                rel="noopener noreferrer"
              >
                Buy Tickets
              </a>
            </div>
          </td>
          <td class="break-all md:break-normal">
            {{ show.city }}
          </td>
          <td class="break-all md:break-normal">
            {{ show.country }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="text-gray-500 font-light mb-6">
      No shows scheduled.
    </p>
  </div>
</template>
