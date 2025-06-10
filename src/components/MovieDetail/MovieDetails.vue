<template>
  <div class="moviedetail">
    <div class="video-player">
      <div class="backdrop_overlay"></div>
      <img
        :src="`https://image.tmdb.org/t/p/w1280${mediaDetails.backdrop}`"
        alt="backdrop"
        width="100%"
        height="100%"
        class="player_backdrop"
      />
      <div class="play-button" @click="playTrailer">
        <i class="pi pi-play"></i>
      </div>
      <button class="trailer-btn" @click="playTrailer">
        <i class="pi pi-video"></i>
        Watch Trailer
      </button>
    </div>
    <div v-if="isLoading" class="loader">Loading...</div>
    <div class="movie_details" v-else-if="mediaDetails">
      <img
        :src="`https://image.tmdb.org/t/p/w1280${mediaDetails.poster}`"
        alt="poster"
        class="movie_poster"
      />
      <div class="movie-metadata">
        <h1 class="movie_title">{{ mediaDetails.title }}</h1>

        <div class="movie_info">
          <span class="tag">{{ mediaType.toUpperCase() }}</span>
          <span class="tag">{{ mediaDetails.year }}</span>
          <span class="tag">{{ Math.round(mediaDetails.rating * 10) / 10 }}/10</span>
          <span class="info_tag">Runtime: {{ mediaDetails.runtime }}</span>
        </div>
        <p class="movie_description">
          {{ mediaDetails.overview || "No description available." }}
          <br />
        </p>
        <div class="production_info">
          <ul class="movie_info_list">
            <li>
              Country:
              <span
                class="info_tag"
                v-for="country in rawDetails.production_countries"
                :key="country.iso_3166_1"
                >{{ country.name + ", " }}</span
              >
            </li>
            <li>
              Genres:
              <span class="info_tag" v-for="genre in rawDetails.genres" :key="genre.id">{{
                genre.name + ", "
              }}</span>
            </li>
            <li>
              Release Year: <span class="info_tag">{{ mediaDetails.year }}</span>
            </li>
            <li>
              Production Companies:
              <span
                class="info_tag"
                v-for="company in rawDetails.production_companies"
                :key="company.id"
                >{{ company.name + ", " }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else class="error">Failed to load movie details.</div>
  </div>

  <MovieCast v-if="rawDetails" :mediaId="mediaId" :mediaType="mediaType" />

  <div class="overlay" v-if="showOverlay">
    <div class="video-container">
      <MovieTrailer :movieId="mediaId" :mediaType="mediaType" />
      <button @click="showOverlay = false"><i class="pi pi-times-circle"></i></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import env from "@/env.js"; // Assuming you have an env.js file for your API key
import MovieCast from "@/components/MovieCast/MovieCast.vue";
import MovieTrailer from "@/components/MovieTrailer/MovieTrailer.vue";

import { useRoute } from "vue-router";
const route = useRoute();

const mediaType = route.path.split("/")[1]; // gets the name of path in your route
const mediaId = parseInt(route.params.id.replace("+", "")); // Remove '+' if necessary
const isLoading = ref(true);
const rawDetails = ref([]);
const showOverlay = ref(false);
const playTrailer = () => {
  showOverlay.value = true;
  // Logic to play the video can be added here
};
const getMedia = async () => {
  let url = "";
  const apiKey = env.tmdbApiKey;
  if (mediaType === "movie") {
    url = `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${apiKey}&language=en-US`;
  } else if (mediaType === "tv") {
    url = `https://api.themoviedb.org/3/tv/${mediaId}?api_key=${apiKey}&language=en-US`;
  } else {
    console.error("Unknown media type:", mediaType);
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    rawDetails.value = data; // Adjust based on API response structure
    //console.log(mediaDetails.value);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  } finally {
    isLoading.value = false; // ✅ Ensure this always runs
  }
};

// Mapped fields for use in template
const mediaDetails = computed(() => {
  if (!rawDetails.value) return {};

  return {
    title: rawDetails.value.title || rawDetails.value.name || "Untitled",
    year: (rawDetails.value.release_date || rawDetails.value.first_air_date || "").slice(
      0,
      4
    ),
    overview: rawDetails.value.overview || "No overview available.",
    poster: rawDetails.value.poster_path
      ? `https://image.tmdb.org/t/p/w500${rawDetails.value.poster_path}`
      : "https://placehold.co/300x450?text=No+Image",
    backdrop: rawDetails.value.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${rawDetails.value.backdrop_path}`
      : null,
    genres: rawDetails.value.genres?.map((g) => g.name) || [],
    rating: rawDetails.value.vote_average || "N/A",
    runtime:
      mediaType === "movie"
        ? `${rawDetails.value.runtime} mins`
        : `${rawDetails.value.episode_run_time?.[0] || "N/A"} mins/ep`,
  };
});

onMounted(getMedia);
</script>

<style scoped lang="scss">
.video-player {
  position: relative;
  background-color: yellow;
  width: 100%;
  height: auto;
  min-height: 550px;
  display: flex;
  justify-content: center;
  background-color: #000;
  .backdrop_overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150px;
    height: 150px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s ease;
    z-index: 2;
  }
  .play-button i {
    font-size: 3rem;
    color: #42b883;
  }

  .play-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  .trailer-btn {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #42b883;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 2;
    transition: background 0.3s ease;
  }
}
.loader {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
.movie_details {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  color: #fff;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8) 20%,
    rgba(0, 0, 0, 0.6) 60%,
    rgba(0, 0, 0, 0.2) 85%,
    rgba(0, 0, 0, 0) 100%
  );

  .movie_poster {
    width: 150px;
    height: auto;
    margin-right: 20px;
    border-radius: 8px;
  }

  .movie-metadata {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .movie_title {
      font-size: 24px;
      margin-bottom: 10px;
    }

    .movie_description {
      font-size: 1.2rem;
      width: 40%;
      overflow: visible;
      text-wrap: wrap;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      margin: 15px 15px 15px 0;
      color: #ccc;
    }

    .movie_info {
      display: flex;
      gap: 10px;

      .tag {
        background-color: #42b883;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
      }
      .info_tag {
        font-size: 14px;
        color: #ccc;
        padding: 5px 10px;
        font-style: italic;
      }
    }
    .production_info {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }
    .movie_info_list,
    .movie_info_list li {
      text-align: left;
      list-style: none !important;
      padding: 0;
      margin: 0;
      font-size: 1rem;
      color: #ccc;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
  .pi-times-circle {
    color: #fff;
    font-size: 2rem;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .video-container {
    position: relative;
    width: 80%;
    height: auto;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
    background-color: #000;
    border-radius: 10px;
    overflow: hidden;
    z-index: 11;
  }
}
@media (max-width: 460px) {
  .video-player {
    height: auto;
    min-height: 14rem;
    .player_backdrop {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
    .play-button {
      width: 100px;
      height: 100px;
      i {
        font-size: 2rem;
      }
    }
    .trailer-btn {
      font-size: 14px;
      padding: 8px 16px;
    }
  }
  .movie_details {
    flex-direction: row;
    align-items: center;
    text-align: center;
    padding: 10px;
    .movie_poster {
      width: 100px;
      margin-bottom: 20px;
    }
    .tag,
    .info_tag {
      font-size: 0.7rem;
      padding: 0.2rem 0.3rem !important;
      font-style: italic;
    }
    .movie-metadata {
      .movie_title {
        font-size: 20px;
      }
      .movie_description {
        width: 100%;
        font-size: 0.8rem;
        text-align: left;
      }
      .movie_info_list,
      .movie_info_list li {
        font-size: 0.8rem;
      }
    }
  }
}
</style>
