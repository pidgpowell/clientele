<script setup>
  const { venue } = defineProps(["venue"]);
</script>

<template>
  <span
    class="font-semibold text-gray-700 text-lg/none sm:font-medium dark:text-gray-200"
    >{{ venue }}</span
  >
</template>
