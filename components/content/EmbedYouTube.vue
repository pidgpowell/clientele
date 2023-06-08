<template>
  <client-only>
    <lite-youtube
      nocookie="true"
      params="modestbranding=1"
      :videoid="videoId"
    />
  </client-only>
</template>

<script>
import( '@/components/vendor/lite-youtube.js' );

export default {
  name: 'EmbedYouTube',

  props: {
    videoId: {
      type: String,
    },
  }
};
</script>