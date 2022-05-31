<script setup></script>

<template>
  <Shows label="Upcoming Shows" :upcoming="true" />

  <hr />

  <Shows label="Before" :upcoming="false" />
</template>
