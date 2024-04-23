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
  let year = ref("");
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

  const filterByYear = (item) => {
    if (!year.value) return true;
    return formatDate(item.date, { year: "numeric" }) === year.value;
  };

  const filterByUpcoming = (item) => {
    const itemDate = new Date(item.date);
    const currentDate = new Date();
    return props.upcoming ? itemDate >= currentDate : itemDate < currentDate;
  };

  const filterBySearch = (item) => {
    if (!search.value) return true;
    const searchFields = [item.venue, item.city, item.country];
    return searchFields.some((field) =>
      field.toLowerCase().includes(search.value.toLowerCase())
    );
  };

  const dates = computed(() => {
    return getRawShowsData.body
      .filter(filterByYear)
      .filter(filterByUpcoming)
      .filter(filterBySearch)
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
      );
  });

  const sort = (key) => {
    currentSort.value = key;
    direction.value[key] = !direction.value[key];
  };

  const mobileDateFormat = { month: "long", day: "numeric", year: "numeric" };
</script>

<template>
  <div class="block">
    <div class="flex flex-col xs:flex-row xs:items-center justify-end gap-2">
      <h2
        class="!mt-0 mr-auto !mb-0"
        v-html="label"
        :id="`table-label-${upcoming ? 'upcoming' : 'old'}`"
      />
      <div
        class="flex gap-2"
        v-if="!upcoming"
      >
        <label
          for="year"
          class="sr-only"
          >Year</label
        >
        <select
          id="year"
          v-model="year"
          class="form-select border-gray-300 dark:bg-black dark:border-gray-600 rounded-sm w-full max-w-[100px] md:max-w-[150px] px-2 py-1 text-sm sm:text-base"
        >
          <option
            disabled
            selected
            value=""
          >
            Year
          </option>
          <option value="">All Years</option>
          <option
            v-for="(year, index) in years"
            :value="year"
            :key="index"
          >
            {{ year }}
          </option>
        </select>
        <label
          for="search"
          class="sr-only"
          >Search</label
        >
        <input
          id="search"
          type="search"
          class="form-input border-gray-300 dark:bg-black dark:border-gray-600 rounded-sm dark:text-white max-w-[100px] md:max-w-[150px] px-2 py-1 text-sm md:text-base"
          v-model="search"
          placeholder="Search"
        />
      </div>
    </div>

    <div v-if="dates.length > 0">
      <table
        class="hidden sm:block mb-2 mt-7 prose-td:text-md prose-td:text-sm prose-td:sm:text-lg"
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
          <tr
            v-for="(show, index) in dates"
            :key="index"
          >
            <td class="whitespace-nowrap font-light">
              <ShowDate :date="show.date" />
            </td>
            <td
              class="font-normal flex flex-col items-start leading-0 break-all md:break-normal"
            >
              <ShowVenue :venue="show.venue" />

              <div
                class="flex flex-col flex-wrap lg:flex-row gap-1 text-sm leading-tight"
              >
                <span
                  v-if="show.info"
                  v-html="show.info"
                  class="text-sm text-gray-700 dark:text-gray-500"
                />
                <ShowTickets
                  :show="show"
                  v-if="upcoming && show['ticket-url']"
                />
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
    </div>
    <div class="flex flex-col gap-4 sm:hidden not-prose my-4">
      <div
        v-for="(show, index) in dates"
        :key="index"
      >
        <ShowDate
          :date="show.date"
          :options="mobileDateFormat"
        />
        <ShowVenue :venue="show.venue" />
        <p class="not-prose leading-6">
          {{ show.city }},
          {{ show.country }}
        </p>
        <p
          v-if="show.info"
          v-html="show.info"
          class="text-sm/tight font-light text-gray-700 dark:text-gray-500 not-prose leading-0 p-0 m-0"
        />
        <Tickets
          :show="show"
          v-if="upcoming && show['ticket-url']"
        />
      </div>
    </div>
  </div>
  <p
    v-if="dates.length === 0"
    class="text-gray-500 font-light mb-6"
  >
    No shows scheduled.
  </p>
</template>
