<script setup>
  const { venue } = defineProps(["venue"]);
  const formatDate = useDateFormat();
</script>

<template>
  <div
    class="text-base/tight sm:text-lg font-semibold sm:font-medium text-gray-700 dark:text-gray-200"
  >
    {{ venue }}
  </div>
</template>
