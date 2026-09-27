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
  const shows = await queryCollection("shows").all();
  // sort tour dates
  const years = computed(() => {
    return [
      ...new Set(
        shows
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
    return shows
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
</script>

<template>
  <div class="block">
    <div class="flex flex-col justify-end xs:flex-row xs:items-center gap-2">
      <h2
        class="!mt-0 me-auto !mb-0"
        v-html="label"
        :id="`table-label-${upcoming ? 'upcoming' : 'old'}`"
      />
      <div class="flex gap-2" v-if="!upcoming">
        <label for="year" class="sr-only">Year</label>
        <select
          id="year"
          v-model="year"
          class="form-select border-gray-300 dark:bg-black dark:border-gray-600 rounded-sm w-full max-w-[100px] md:max-w-[150px] px-2 py-1 text-sm sm:text-base"
        >
          <option disabled selected value="">Year</option>
          <option value="">All Years</option>
          <option v-for="(year, index) in years" :value="year" :key="index">
            {{ year }}
          </option>
        </select>
        <label for="search" class="sr-only">Search</label>
        <input
          id="search"
          type="search"
          class="form-input border-gray-300 dark:bg-black dark:border-gray-600 rounded-sm dark:text-white md:max-w-[150px] px-2 py-1 text-sm md:text-base"
          v-model="search"
          placeholder="Search"
        />
      </div>
    </div>

    <table
      v-if="dates.length > 0"
      class="shows-table mt-7 prose-td:text-md prose-td:text-sm prose-td:md:text-lg prose-td:p-0 md:prose-td:p-2 prose-th:p-0 md:prose-th:px-2 md:prose-th:pb-2"
      :aria-labelledby="`table-label-${upcoming ? 'upcoming' : 'old'}`"
    >
      <thead>
        <tr class="shows-row shows-row--header">
          <th>
            <button
              class="flex items-center font-bold outline-none gap-1 focus-visible:ring-2 no-wrap"
              @click="sort('date')"
            >
              Date
              <IconTriangle
                v-if="currentSort === 'date'"
                :class="{ 'rotate-180': direction.date }"
              />
            </button>
          </th>
          <th>
            <button
              class="flex items-center font-bold outline-none gap-1 focus-visible:ring-2"
              @click="sort('venue')"
            >
              Venue
              <IconTriangle
                v-if="currentSort === 'venue'"
                :class="{ 'rotate-180': direction.venue }"
              />
            </button>
          </th>
          <th class="shows-location">
            <button
              class="shows-city flex items-center font-bold outline-none gap-1 focus-visible:ring-2"
              @click="sort('city')"
            >
              City
              <IconTriangle
                v-if="currentSort === 'city'"
                :class="{ 'rotate-180': direction.city }"
              />
            </button>
            <button
              class="shows-country flex items-center font-bold outline-none gap-1 focus-visible:ring-2"
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
      <tbody>
        <tr
          v-for="(show, index) in dates"
          :key="index"
          class="shows-row leading-tight"
        >
          <td class="font-light whitespace-nowrap">
            <ShowDate :date="show.date" />
          </td>
          <td class="flex flex-col items-start font-normal leading-0 break-normal">
            <ShowVenue :venue="show.venue" />

            <div class="flex flex-wrap text-sm leading-tight flex-row gap-y-0 gap-x-1">
              <span
                v-if="show.info"
                v-html="show.info"
                class="text-sm text-gray-700 dark:text-gray-500 mt-1"
              />
              <ShowTickets
                :show="show"
                v-if="upcoming && show['ticket-url']"
              />
            </div>
          </td>
          <td class="shows-location">
            <span class="shows-city break-all md:break-normal text-base">{{ show.city }}</span>
            <span class="shows-country break-all md:break-normal text-base">{{ show.country }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="dates.length === 0" class="mb-6 font-light text-gray-500">
      No shows scheduled.
    </p>
  </div>
</template>

<style scoped>
  /*
   * One real <table> serves both the mobile card layout and the desktop
   * table layout: on mobile every table element is just `display: block`
   * (stacking in DOM order like a card), on desktop the table becomes a
   * CSS grid and every row/cell inherits its column tracks via `subgrid`
   * so columns stay aligned across all rows without per-row width
   * calculations. "City"/"Country" stay one semantic cell (matching the
   * header) but use a second, nested subgrid so they can present as two
   * aligned sub-columns on desktop while reading as "City, Country" on
   * mobile - real table semantics for screen readers either way.
   * The breakpoint matches Tailwind's `md:` (768px), not `sm:` (640px) -
   * the table needs more room than a plain sm: breakpoint gives it before
   * Venue/City/Country start wrapping awkwardly. The nested Show*
   * components' own internal breakpoints (Venue.vue, Tickets.vue) were
   * moved to `md:` too, so everything switches together - a container
   * query here would risk that flipping at a different width than this
   * grid does.
   */
  /*
   * Prose's default table styling (borders, vertical-align, header
   * font-weight/color) is only wanted for the desktop table - the mobile
   * cards never had any of that, just gap spacing (padding is handled
   * via the prose-td:p-0/md:prose-td:p-2 utility classes on the table
   * itself). Reset it at the base (mobile) level; the desktop media
   * query below restores just what it actually needs.
   */
  .shows-table :where(thead, tbody, tr, th, td) {
    display: block;
    text-align: left;
    border: 0;
    font-weight: inherit;
    color: inherit;
  }

  .shows-row--header {
    display: none;
  }

  .shows-row + .shows-row {
    margin-block-start: 1rem;
  }

  .shows-location .shows-country::before {
    content: ", ";
  }

  @media (min-width: 768px) {
    .shows-table {
      display: grid;
      /*
       * `minmax(0, ...)` tracks (not plain `auto`/`1fr`) so columns can
       * still shrink below their content size - grid items get an
       * implicit `min-width: auto` that otherwise pins every column to
       * its max-content width forever (even with break-normal/break-all
       * on the text), which is exactly what caused the whole table to
       * overflow its container whenever any one of the 270 shows had an
       * unusually long venue/city name. Venue gets `1fr` (not `auto`) so
       * it claims the container's remaining width instead of shrink-
       * wrapping to its own content, matching the original table's
       * auto-layout giving it the lion's share of the space - but it
       * still shrinks to 0 rather than overflowing when the container
       * is tight, since fr tracks respect the minmax floor too.
       */
      grid-template-columns: minmax(0, auto) minmax(47%, 2fr) minmax(0, auto) minmax(0, auto);
      column-gap: 0;
    }

    .shows-table :where(thead, tbody) {
      display: contents;
    }

    .shows-table :where(tr) {
      display: grid;
      grid-column: 1 / -1;
      grid-template-columns: subgrid;
      /*
       * Matches the original table's `vertical-align: initial`, which
       * gives table-cell *baseline* alignment rather than top alignment
       * (the difference is subtle for this row's font sizes, but this
       * is the semantically-equivalent grid property, not `start`).
       */
      align-items: baseline;
    }

    .shows-row + .shows-row {
      margin-block-start: 0;
    }

    .shows-row--header {
      display: grid;
      /* Matches the original's `vertical-align: bottom` on thead th. */
      align-items: end;
      border-bottom: 1px solid var(--tw-prose-th-borders);
    }

    .shows-table :where(tbody .shows-row) {
      border-bottom: 1px solid var(--tw-prose-td-borders);
    }

    .shows-table :where(td, th) {
      display: block;
      min-width: 0;
    }

    .shows-row--header :where(th) {
      vertical-align: bottom;
      font-weight: 600;
      color: var(--tw-prose-headings);
    }

    .shows-table :where(tr > :first-child) {
      padding-inline-start: 0;
    }

    .shows-table :where(tr > :last-child) {
      padding-inline-end: 0;
    }

    .shows-table :where(.shows-location) {
      display: grid;
      grid-column: 3 / 5;
      grid-template-columns: subgrid;
      /*
       * City/Country are bare spans sharing one merged <td>, not two
       * separate real cells each with their own padding like the
       * original table - without an explicit gap here they'd sit flush
       * against each other. 1rem roughly matches the original's
       * effective spacing (each cell's own inline padding, summed).
       */
      column-gap: 1rem;
    }

    .shows-location :where(.shows-city, .shows-country, button) {
      min-width: 0;
    }

    .shows-country {
      grid-column: 2;
    }

    .shows-location .shows-country::before {
      content: none;
    }
  }
</style>
