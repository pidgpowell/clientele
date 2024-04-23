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
    class="outline-none icon focus-visible:ring-2"
    aria-label="X"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 448"
      class="rounded-md lg:rounded-xl"
    >
      <path
        d="m175.49 123.18 140.15 199.708H278.38l-139.9-199.708Zm272.46 323.854h-448v-448h448Zm-86.166-99.556L257.599 198.394l85.17-99.805h-32.63l-67.3 78.65-54.929-78.65H92.088l98.087 140.2-93.01 108.69h33.177l74.692-87.51 61.176 87.51z"
        style="stroke-width: 24.8889"
      />
    </svg>
  </a>
</template>
