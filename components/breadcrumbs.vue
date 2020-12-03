<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <button @click="$router.back()" class="px-2 py-1 border b-gray-200 rounded">
      Back
    </button>

    <ul>
      <li v-for="(item, i) in crumbs" :key="i" :class="item.classes">
        <nuxt-link :to="item.path">
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    crumbs() {
      const crumbs = [];
      this.$route.matched.map((item, i, { length }) => {
        const crumb = {};
        crumb.path = item.path;
        crumb.name = item.name || item.path;

        // is last item?
        if (i === length - 1) {
          // is param route? .../.../:id
          if (item.regex.keys.length > 0) {
            crumbs.push({
              path: item.path.replace(/\/:[^/:]*$/, ''),
              name: item.name.replace(/-[^-]*$/, ''),
            });
            crumb.path = this.$route.path;
            crumb.name = crumb.path.match(/[^/]*$/)[0];
          }
          crumb.classes = 'is-active';
        }

        crumbs.push(crumb);
      });

      return crumbs;
    },
  },
};
</script>

<style>
</style>