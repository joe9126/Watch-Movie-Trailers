<template>
  <div class="search-wrapper">
    <form @submit.prevent="searchMovies()">
      <div class="search-items">
        <input
          type="text"
          class="search-box"
          placeholder="Search for movies and series..."
          v-model="searchQuery"
        />
        <button class="search-btn" type="submit"><i class="pi pi-search"></i></button>
      </div>
    </form>
    <div class="results_container" ref="wrapper">
      <div class="search-results" v-show="movies.length > 0" v-if="showResults">
        <!-- This div displays the search results when the movies result search returns -->
        <!-- The v-show directive conditionally shows this section based on the searchQuery -->

        <h3 class="search_title">Search results for {{ searchQuery }}</h3>
        <button class="btn-close" @click="showResults = !showResults">
          <i class="pi pi-times-circle"></i>
        </button>
        <div v-if="movies.length > 0">
          <!-- This div displays the search results if there are any movies found -->
          <router-link
            v-for="movie in movies"
            :key="movie.id"
            :to="`/${movie.type}/${movie.id}`"
          >
            <!-- Each movie is displayed as a link that navigates to the movie details page -->
            <div class="movie-item">
              <img
                :src="
                  movie.poster !== 'N/A' ? movie.poster : 'https://placehold.co/50x75'
                "
                alt="Movie Poster"
                class="movie-poster"
              />
              <div class="movie-detail">
                <span class="movie-title">{{ movie.title }}</span>
                <div class="metatags">
                  <span class="tag">{{ movie.year }}</span>
                  <span class="tag">{{ movie.type.toUpperCase() }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from "vue";
import env from "@/env.js";
const searchQuery = ref("");
const showResults = ref(false);
const wrapper = ref(null);
// This is a simple search component that allows users to input a search query
// and submit it. The searchQuery variable is bound to the input field.
const movies = ref([]);
// This is a placeholder for the movies array, which can be populated with movie data
// from an API or other source in the future.

const searchMovies = async () => {
  showResults.value = true; // Show the search results section when a search is made
  if (searchQuery.value.trim() !== "") {
    // Here you would typically make an API call to fetch movies based on the search query.
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${
          env.tmdbApiKey
        }&query=${searchQuery.value.trim()}&language=en-US&page=1&include_adult=false`
      );
      const data = await response.json();

      console.log(data);
      movies.value = (data.results || [])
        .filter((item) => item.media_type === "movie" || item.media_type === "tv")
        .map((item) => {
          return {
            id: item.id,
            title: item.title || item.name,
            year: (item.release_date || item.first_air_date || "").slice(0, 4),
            date: item.release_date || item.first_air_date || "", // Keep full date for sorting
            poster: item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://placehold.co/200x300?text=No+Image",
            type: item.media_type,
          };
        })
        .sort((a, b) => {
          if (!a.date) return 1;
          if (!b.date) return -1;
          return new Date(b.date) - new Date(a.date); // Descending by date
        });

      // If you want to clear the search input after submission, uncomment the line below
      // searchQuery.value = ""; // Clear the search input after submission

      // If no results found, you can handle it here
      if (movies.value.length === 0) {
        console.log("No results found");
      }
      // If no results found, set to empty array
      // searchQuery.value = ""; // Clear the search input after submission
    } catch (error) {
      console.error("Error fetching search results:", error);
      movies.value = []; // Reset movies to empty array on error
    }
  } else {
    movies.value = []; // Reset movies if search query is empty
  }
};

const handleClickOutside = (event) => {
  if (wrapper.value && !wrapper.value.contains(event.target)) {
    showResults.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<style scoped lang="scss">
.search-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: transparent;
  form {
    .search-items {
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    input.search-box {
      width: 500px;
      height: 40px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 10px 0 0 10px;
      background: #000;
      color: #42b883;
      font-weight: bold;
      font-size: 16px;
      border: 1px 0 1px 1px solid #0a0a0a;
    }
    &[type="text"] {
      border-radius: 8px;
      margin-bottom: 15px;
      transition: 0.4s;
      text-transform: uppercase;
      &:placeholder {
        color: #f3f3f3;
      }
      &:focus {
        box-shadow: 0 0 5px rgba(66, 184, 131, 0.5);
        color: #42b883;
      }
    }
    button.search-btn {
      padding: 8px 8px;
      border-radius: 0 10px 10px 0 !important;
      height: 40px;
      background-color: #42b883;
      color: #fff;
      border: none;
      border-radius: 4px;
      text-transform: uppercase;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background-color: darken(#42b883, 10%);
      }
    }
    &[type="submit"] {
      text-transform: uppercase;
      transition: 0.4s;
      &:active {
        background: color #3b3b3b;
      }
      &:hover {
        background-color: darken(#42b883, 10%);
      }
    }
  }
  .results_container {
    position: relative;
    width: 100%;
    height: auto;
  }
  .search-results {
    position: absolute;
    top: calc(100% + 8px); /* appears just below the input */
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
    max-height: 550px;
    overflow-y: scroll;
    width: 550px;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    .btn-close {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: none;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
    }
    h3.search_title {
      margin-bottom: 6px;
      font-size: 0.8rem;
    }
  }
  .movie-item {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    border-bottom: 0.5px solid #ccc;
  }

  .movie-poster {
    width: 50px;
    height: 75px;
    margin-bottom: 2px;
  }
  .movie-detail {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 8px;
    margin-bottom: 16px;
    .metatags {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: 3px;
    }
    .tag {
      background-color: #42b883;
      color: #fff;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.8rem;
      margin-left: 8px;
    }
    .movie-title {
      font-size: 0.9rem;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-weight: bold;
      color: #fff;
    }
    h5 {
      color: #fff;
      margin-bottom: 8px;
    }
    p {
      color: #ccc;
      margin: 0 8px;
    }
  }
}
@media (max-width: 600px) {
  .search-items {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input.search-box {
    width: 250px !important;
    height: 20px;
    padding: 6px;
    border-radius: 10px 0 0 10px;
    background: #000;
    color: #42b883;
    font-weight: bold;
    font-size: 0.6rem;
    border: 1px 0 1px 1px solid #0a0a0a;
  }
  .search-btn {
    /*  padding: 0.3rem 0.5rem !important;*/
    font-size: 0.8rem;
    padding: 4px;
  }
  .search-results {
    width: 300px !important;
    padding: 2px;
    height: 400px;
  }
  h3.search_title {
    font-size: 0.5rem;
  }
  .movie-poster {
    width: 40px;
    height: auto;
    border-radius: 4px;
  }
  .movie-title {
    font-size: 0.8rem !important;
  }
  .tag {
    margin-top: 5px;
    font-size: 0.6rem !important;
    font-style: italic;
    padding: 1px 2px;
  }
}
</style>
