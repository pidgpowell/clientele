<template>
  <a
    :href="url"
    class="outline-none focus-visible:ring-2"
  >
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      aria-labelledby="title-facebook"
    >
      <title id="title-facebook">Facebook</title>
      <rect
        :fill="colorDark"
        height="512"
        rx="15%"
        width="512"
      />
      <path
        d="m355.6 330 11.4-74h-71v-48c0-20.2 9.9-40 41.7-40h32.3v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6v56.4h-65v74h65v182h80v-182z"
        :fill="colorLight"
      />
    </svg>
  </a>
</template>

<script>
  export default {
    props: {
      width: {
        type: [Number, String],
        default: null,
      },
      colorDark: {
        type: String,
        default: "#ffffff",
      },
      colorLight: {
        type: String,
        default: "#000000",
      },
      colorHover: {
        type: String,
        default: "#cccccc",
      },
      url: {
        type: String,
        default: "",
      },
    },
  };
</script>

<style scoped>
  svg:hover rect {
    fill: v-bind(colorHover);
  }
</style>
