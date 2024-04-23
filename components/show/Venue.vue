<script setup>
  const { venue } = defineProps(["venue"]);
  const formatDate = useDateFormat();
</script>

<template>
  <span
    class="font-semibold text-gray-700 text-lg/tight sm:font-medium dark:text-gray-200"
  >
    {{ venue }}
  </span>
</template>
