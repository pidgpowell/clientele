<template>
  <div>
    <header>
      <nuxt-link to="/"><h1>The Clientele</h1></nuxt-link>

      <nav class="space-x-2">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink
          to="/news"
          :class="{
            'nuxt-link-exact-active':
              $route.path.includes('/news/') && $route.path !== '/news',
          }"
        >
          News
        </NuxtLink>
        <NuxtLink to="/discography">Discography</NuxtLink>
      </nav>
    </header>

    <div class="p-0 sm:p-4 m-auto">
      <Nuxt />
    </div>
  </div>
</template>

<style>
html, body {
  background-color: #ffffff;
  @media all and (min-width: 767px) {
  background-color: #f5f5f5;
  height: 100vh;
  }

}
h2 {
    font-family: 'Public Sans', sans-serif;
    font-size: 30px;
}
</style>

<style scoped>
header {
  padding: 1.5rem 2rem 0.2rem 2rem;
  background: #000;
  color: #fff;
}
h1 {
  font-size: 60px;
  font-family: 'Public Sans', sans-serif;
  font-weight: 100;
  letter-spacing: -0.14ch;
  margin-left: -13px;
  margin-bottom: -1rem;
}
nav {
  margin-bottom: 0.5rem;
}
a.nuxt-link-exact-active {
  @apply font-bold;
}
</style>