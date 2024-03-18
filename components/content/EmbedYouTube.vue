<script setup>
  import("@/components/vendor/lite-youtube.js");

  defineProps({
    videoId: {
      type: String,
    },
  });
</script>

<template>
  <client-only>
    <lite-youtube
      nocookie="true"
      :videoid="videoId"
    />
  </client-only>
</template>
