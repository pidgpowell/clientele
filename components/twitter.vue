<template>
  <a
    :href="url"
    class="outline-none focus-visible:ring-2"
  >
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      aria-labelledby="title-twitter"
    >
      <title id="title-twitter">Twitter</title>
      <rect
        :fill="colorDark"
        height="512"
        rx="15%"
        width="512"
      />
      <path
        d="m437 152a72 72 0 0 1 -40 12 72 72 0 0 0 32-40 72 72 0 0 1 -45 17 72 72 0 0 0 -122 65 200 200 0 0 1 -145-74 72 72 0 0 0 22 94 72 72 0 0 1 -32-7 72 72 0 0 0 56 69 72 72 0 0 1 -32 1 72 72 0 0 0 67 50 200 200 0 0 1 -105 29 200 200 0 0 0 309-179 200 200 0 0 0 35-37"
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

  @media (prefers-color-scheme: dark) {
    svg {
      @apply rounded-2xl;
      border: 1px #444 solid;
    }
    svg rect {
      fill: none;
    }
  }
</style>
