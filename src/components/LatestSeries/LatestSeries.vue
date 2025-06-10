<script setup>
import { ref, onMounted } from "vue";
import env from "@/env.js";

const title1 = "Latest ";
const title2 = "TV Series";
const apiKey = env.tmdbApiKey;
const latestSeries = ref([]);
const isLoading = ref(true);
const getLatestSeries = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`
    );
    const data = await response.json();
    latestSeries.value = data.results || [];
    console.log(latestSeries);
  } catch (error) {
    console.log("error fetching latest Series", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(getLatestSeries);
</script>

<template>
  <div class="wrapper">
    <h2 class="title">
      <span class="title1">{{ title1 }}</span>
      <span class="title2">{{ title2 }}</span>
    </h2>
    <div class="loading" v-if="isLoading"><p>Loading...</p></div>
    <div class="latest_container" v-if="latestSeries">
      <div class="latest_series" v-for="series in latestSeries" :key="series.id">
        <router-link :to="/tv/ + `${series.id}`">
          <div class="movie_container">
            <img
              class="movie_poster"
              :src="`https://image.tmdb.org/t/p/w1280/${series.poster_path}`"
              :alt="series.title"
            />
          </div>
        </router-link>
      </div>
    </div>
    <div v-else>
      <p>No series found.</p>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 40px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.movie_poster {
  width: 200px;
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
    margin-bottom: 10px !important;
  }
  .movie_poster {
    width: 75px;
    height: auto;
    margin-right: 2px;
  }
}
</style>
