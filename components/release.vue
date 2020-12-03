<template>
  <div class="mb-8">
    <img v-if="release.cover" :src="release.cover" width="200" class="mb-2" />

    <h2 class="text-lg font-extrabold">{{ release.name }}</h2>

    <p class="text-sm text-gray-700">{{ release.dateFormatted }}</p>

    <ol class="list-inside list-decimal mt-2">
      <li v-for="(song, index) in release.songs" :key="'s' + index">
        <NuxtLink
          :to="'/lyrics/' + song.id"
          v-if="song.lyrics"
          class="items-center inline-flex"
          >{{ song.title }}

          <svg
            class="pl-1"
            height="18"
            viewBox="0 -71 512 512"
            width="18"
            fill="#777"
          >
            <path
              d="M407 0H105C47.102 0 0 47.102 0 105v160.68c0 57.894 47.102 105 105 105h302c57.898 0 105-47.106 105-105V105C512 47.102 464.898 0 407 0zm75 265.68c0 41.351-33.645 75-75 75H105c-41.355 0-75-33.649-75-75V105c0-41.355 33.645-75 75-75h302c41.355 0 75 33.645 75 75zm0 0"
            />
            <path
              d="M399.805 117.316H202.69c-8.285 0-15 6.715-15 15s6.715 15 15 15h197.114c8.285 0 15-6.714 15-15s-6.715-15-15-15zm0 0M112.195 147.316h45.723c8.285 0 15-6.714 15-15s-6.715-15-15-15h-45.723c-8.285 0-15 6.715-15 15s6.715 15 15 15zm0 0M112.195 200.34H309.31c8.285 0 15-6.719 15-15 0-8.285-6.715-15-15-15H112.195c-8.285 0-15 6.715-15 15 0 8.281 6.715 15 15 15zm0 0M399.805 170.34h-45.723c-8.285 0-15 6.715-15 15 0 8.281 6.715 15 15 15h45.723c8.285 0 15-6.719 15-15 0-8.285-6.715-15-15-15zm0 0M399.805 223.36H202.69c-8.285 0-15 6.718-15 15 0 8.285 6.715 15 15 15h197.114c8.285 0 15-6.715 15-15 0-8.282-6.715-15-15-15zm0 0M157.918 223.36h-45.723c-8.285 0-15 6.718-15 15 0 8.285 6.715 15 15 15h45.723c8.285 0 15-6.715 15-15 0-8.282-6.715-15-15-15zm0 0"
            />
          </svg>
        </NuxtLink>
        <template v-else>{{ song.title }}</template>
      </li>
    </ol>

    <ul class="list-inside flex mt-2">
      <li v-for="(formats, label) in release.labels" :key="label" class="">
        <span class="mr-2">{{ label }} ({{ formats.join(', ') }})</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['release'],
};
</script>

<style scoped>
</style>