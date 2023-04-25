<template>
  <lite-youtube
    nocookie="true"
    params="modestbranding=1"
    :videoid="videoId"
  />
</template>

<script>
if ( process.client ) {
  import( '@/components/vendor/lite-youtube.js' );
}

export default {
  name: 'EmbedYouTube',

  props: {
    videoId: {
      type: String,
    },
  }
};
</script>