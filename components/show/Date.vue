<script setup lang="ts">
  const { date, options } = defineProps<{
    date: string;
    options?: { month: string; day: string; year: string };
  }>();
</script>

<template>
  <time
    class="block font-light text-base/snug"
    :datetime="date"
    v-if="date"
  >
    {{
      formatDate(date, {
        month: options?.month || "short",
        day: options?.day || "numeric",
      })
    }}
    <span>, </span>
    {{ formatDate(date, { year: options?.year || "numeric" }) }}
    &nbsp;
  </time>
</template>
