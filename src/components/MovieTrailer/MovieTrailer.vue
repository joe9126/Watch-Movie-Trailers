<template>
  <div class="movie_trailer">
    <h1 class="trailer_title">Trailer</h1>
    <div class="iframe-wrapper">
      <iframe
        v-if="videoKey"
        :src="`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`"
        frameborder="0"
        width="100%"
        height="100%"
        allow="autoplay; encrypted-media"
        allowfullscreen
        playsinline
        controls
        :muted="false"
      ></iframe>
      <div v-else class="no-trailer-message">
        <p>No trailer available for this title.</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import env from "@/env.js"; // Assuming you have an env.js file for your API key
const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
  mediaType: {
    type: String,
    default: "movie",
  },
});
const videoKey = ref(null);

const getTrailer = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${props.mediaType}/${props.movieId}/videos?api_key=${env.tmdbApiKey}&language=en-US`
  );

  const data = await response.json();
  // Filter only trailers hosted on YouTube
  console.log(data);
  const movieTrailer = data.results.filter(
    (video) =>
      video.site === "YouTube" && video.type === "Trailer" && video.official === true
  );
  // Fallback: loosen filter if no official trailer is found
  const fallback = data.results.filter(
    (video) =>
      video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
  );

  const trailer = movieTrailer.length > 0 ? movieTrailer[0] : fallback[0];

  videoKey.value = trailer?.key || null;

  console.log(movieTrailer.value);
};
onMounted(getTrailer);
</script>
<style scoped>
.iframe-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
}
.iframe-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.no-trailer-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #000;
  color: #fff;
  font-size: 1.2rem;
  padding: 1rem;
  text-align: center;
}
</style>
