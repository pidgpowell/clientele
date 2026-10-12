<script setup>
  const { venue } = defineProps(["venue"]);
</script>

<template>
  <span
    class="font-semibold text-gray-700 text-lg/none md:font-medium dark:text-gray-200"
    >{{ venue }}</span
  >
</template>
