<template>
  <div class="bg-white p-6 rounded relative">
    <BackButton class="absolute z-10" style="top: -60px; right: 0px" />

    <div class="flex flex-col md:flex-row pb-4">
      <div class="md:w-1/2 md:pr-8 order-0 md:order-1 relative">
        <h4 class="mb-3 border-b border-gray-300">Lyrics</h4>

        <Song
          :key="$route.params.id"
          :id="$route.params.id"
          :song="song"
          class="mb-8"
        />
      </div>

      <div class="md:w-1/2 pr-0 order-1 md:order-0">
        <h3 class="mb-3 border-b border-gray-300">Release</h3>

        <Release :release="release" />
      </div>
    </div>
  </div>
</template>

<script>
const getReleases = () =>
  import('~/static/releases.json').then((m) => m.default || m);
export default {
  data() {
    return {
      song: {},
    };
  },

  async asyncData({ req, route }) {
    const releases = await getReleases();

    const song_id = route.params.id;
    let songs = releases.map((item) => {
      return item.songs;
    });
    let flattenedSongs = songs.flat();
    let song = flattenedSongs.filter((item) => item.id == song_id)[0];
    console.log(song.release_id);
    let release = releases.filter((item) => {
      return item.id == song.release_id;
    })[0];
    return { song, release };
  },
};
</script>
