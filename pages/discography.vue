<template>
  <div class="bg-white p-6 rounded">
    <h2 class="mb-3">Discography</h2>

    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/2">
        <h3>Albums</h3>

        <div
          v-for="(release, index) in albums"
          :key="'a' + index"
          class="mt-3 mb-3"
        >
          <Release :release="release" />
        </div>
      </div>

      <div class="md:w-1/2">
        <h3>EPs, 7"s</h3>

        <div
          v-for="(release, index) in eps"
          :key="'ep-' + index"
          class="mt-3 mb-3"
        >
          <Release :release="release" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const getReleases = () =>
  import('~/static/releases.json').then((m) => m.default || m);

function filterByFormat(labels, type = 'ALBUM') {
  const test = {
    ALBUM: ['CD', 'LP'],
    EP: ['EP', 'CDEP', '7"', '10"', 'Digital'],
  };
  let shouldReturn = false;

  for (const [label, formats] of Object.entries(labels)) {
    shouldReturn = formats.some((r) => test[type].includes(r));
  }
  return shouldReturn;
}

export default {
  data() {
    return {
      releases: [],
    };
  },

  async asyncData({ req }) {
    const releases = await getReleases();

    let eps = releases
      .map((item) => {
        let labels = item.labels;
        if (filterByFormat(labels, 'EP')) {
          return item;
        }
      })
      .filter((el) => {
        return el != null && el != '';
      });

    let albums = releases
      .map((item) => {
        let labels = item.labels;
        if (filterByFormat(labels, 'ALBUM')) {
          return item;
        }
      })
      .filter((el) => {
        return el != null && el != '';
      });

    return { releases, albums, eps };
  },
};
</script>