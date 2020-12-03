<template>
  <div>
    <header>
      Test
    </header>
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