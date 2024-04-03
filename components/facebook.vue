<script setup>
  defineProps({
    url: {
      type: String,
      default: "",
    },
  });
</script>

<template>
  <a
    :href="url"
    class="icon outline-none focus-visible:ring-2 w-[6vw] p-0 m-0"
    aria-label="Facebook"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 448"
      class="rounded-xl"
    >
      <path
        d="M400-21.695H50.17c-26.51 0-74.315-15.39-74.034 11.119L-19.525 400c.28 26.508 17.437 75.749 43.66 71.864L185.25 448V295.69h-63V224h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V224h68.78l-11 71.69h-57.78V448L400 465.356c26.3 3.326 62.538 17.553 63.186-8.95l10.848-443.118c.649-26.502-47.524-34.983-74.034-34.983Z"
      />
    </svg>
  </a>
</template>
