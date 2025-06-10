<script setup>
import { ref, onMounted } from "vue";
import env from "@/env.js";
import { useLoadingStore } from "@/stores/loadingStore";
const loading = useLoadingStore();

const title1 = "Latest ";
const title2 = "Movies";
const apiKey = env.tmdbApiKey;
const latestMovies = ref([]);
const isLoading = ref(true);
const getLatestMovies = async () => {
  loading.startLoading();
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    );
    const data = await response.json();
    latestMovies.value = data.results || [];
    //console.log(latestMovies);
  } catch (error) {
    console.log("error fetching latest movies", error);
  } finally {
    isLoading.value = false;
    loading.stopLoading(); // this is for the global modal loader.
  }
};

onMounted(getLatestMovies);
</script>

<template>
  <div class="wrapper">
    <h2 class="title">
      <span class="title1">{{ title1 }}</span>
      <span class="title2">{{ title2 }}</span>
    </h2>
    <div class="loading" v-if="isLoading"><p>Loading...</p></div>
    <div class="latest_container" v-if="latestMovies">
      <div class="latest_movies" v-for="movie in latestMovies" :key="movie.id">
        <router-link :to="/movie/ + `${movie.id}`">
          <div class="movie_container">
            <img
              class="movie_poster"
              :src="`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`"
              :alt="movie.title"
            />
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>No movies found.</p>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 40px;
  display: flex;
  flex-direction: column;
}
h2 {
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-transform: uppercase;
  text-align: left !important;
}
.title1 {
  color: #42b983;
}
.title2 {
  color: #fff;
}

.latest_container {
  display: flex;
  gap: 1rem;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.movie_poster {
  width: 250px;
  height: auto;
  border-radius: 8px;
  margin-right: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

@media (max-width: 600px) {
  .latest_container {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 items per row */
    gap: 0.5rem;
  }
  .title {
    font-size: 1.2rem;
  }
  .wrapper {
    padding: 10px;
  }
  .movie_poster {
    width: 75px;
    height: auto;
    margin-right: 2px;
  }
}
</style>
