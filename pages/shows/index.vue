<template>
  <div>
    <Shows label="Upcoming Shows" :upcoming="true" direction="asc" />

    <hr class="mt-6 mb-8" />

    <Shows label="Old shows" :upcoming="false" direction="desc" />
  </div>
</template>
