<script setup></script>

<template>
  <Shows label="Upcoming Shows" :upcoming="true" direction="asc" />

  <hr />

  <Shows label="Before" :upcoming="false" />
</template>
