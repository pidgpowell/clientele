<script setup></script>

<template>
  <div>
    <Shows label="Upcoming Shows" :upcoming="true" direction="asc" />

    <hr />

    <Shows label="Before" :upcoming="false" />
  </div>
</template>
