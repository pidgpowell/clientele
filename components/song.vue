<template>
  <div>
    <h2 class="text-lg font-extrabold">{{ song.title }}</h2>

    <p class="mt-3 whitespace-pre-line leading-snug" v-html="song.lyrics" />
  </div>
</template>

<script>
export default {
  props: ['id', 'release', 'song'],
};
</script>