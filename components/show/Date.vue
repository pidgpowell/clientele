<script setup lang="ts">
  const { date, options } = withDefaults(
    defineProps<{
      date: string;
      options?: { month: string; day: string; year: string };
    }>(),
    {
      options: { month: "short", day: "numeric", year: "numeric" },
    }
  );

  const formatDate = useDateFormat();
</script>

<template>
  <div
    class="font-light text-base/snug"
    v-if="date"
  >
    {{ formatDate(date, { month: options.month, day: options.day }) }}
    <span>, </span>
    {{ formatDate(date, { year: options.year }) }}
  </div>
</template>
