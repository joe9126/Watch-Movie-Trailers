<template>
  <div class="wrapper">
    <swiper
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 4000 }"
      :pagination="{ clickable: true }"
      class="mySwiper"
      v-if="movies.length > 1"
    >
      <swiper-slide v-for="movie in movies" :key="movie.id">
        <div class="slide-caption">
          <div class="caption-overlay">
            <div class="caption-content">
              <h2 class="movie-title">
                {{ movie.media_type === "tv" ? movie.name : movie.title }}
              </h2>
              <div class="vidmetadata">
                <span class="tag">{{ movie.media_type }}</span>
                <span class="tag">{{
                  new Date(movie.release_date).getFullYear() ||
                  new Date(movie.first_air_date).getFullYear()
                }}</span>

                <span class="tag">{{ movie.vote_average.toFixed(1) }}</span>
              </div>
            </div>
            <p class="overview">{{ movie.overview }}</p>
            <router-link :to="`/movie/${movie.id}`" class="watch-now-btn"
              >Watch Now</router-link
            >
          </div>
          <img
            :src="`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`"
            :alt="movie.title"
            class="slider-img"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import env from "@/env.js"; // Assuming you have an env.js file for your API key
export default {
  name: "NowPlaying",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.getNowPlayingMovies();
  },
  methods: {
    async getNowPlayingMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${env.tmdbApiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        this.movies = data.results;
        // console.log(this.movies) || [];
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    },
  },
};
</script>

<style scoped>
.now-playing-slider {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  overflow: hidden;
}
.slider-img {
  position: absolute;
  top: 0;
  right: 0;
  flex: 0 0 45%; /* 60% width */
  z-index: 2;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0;
  display: block;
}
.slide-caption {
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  overflow: hidden;
}
.caption-overlay {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 55%; /*40% width */
  height: 100%;
  padding: 20px;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  background: linear-gradient(to right, black 0%, rgba(0, 0, 0, 0) 70%);
  color: #fff;
}
.caption-content {
  max-width: 90%;
}
.movie-title {
  font-size: 2rem;
  margin-bottom: 5px;
}
.watch-now-btn {
  display: inline-block;
  background-color: #42b883;
  color: white;
  margin-bottom: 1rem;
  padding: 10px 20px !important;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  align-self: flex-start;
}
.watch-now-btn:hover {
  background-color: #369f6f;
}

.overview {
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 16px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  width: 40%; /* Your desired width */
  height: auto;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4 !important; /* ← Number of lines to show */
  line-clamp: 4 !important; /* (Optional: non-standard, mostly ignored) */
  text-overflow: ellipsis !important;
}
.vidmetadata {
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.tag {
  background-color: #42b883;
  color: white;
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  font-style: italic;
  text-transform: uppercase;
}

@media (max-width: 460px) {
  .slide-caption {
    padding: 0;
    height: 15rem;
  }
  .slider-img {
    width: 100%;
    height: auto;
  }
  .movie-title {
    font-size: 1rem;
  }
  .tag {
    padding: 4px;

    font-size: 0.6rem;
  }
  .overview {
    font-size: 0.6rem; /* You can adjust this as needed */
    line-height: 1rem; /* Adjust to control spacing between lines */
    width: 80%; /* Your desired width */
    overflow: wrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4; /* ← Number of lines to show */
    line-clamp: 4; /* (Optional: non-standard, mostly ignored) */
    text-overflow: ellipsis;
  }
  .watch-now-btn {
    font-size: 0.8rem;
    padding: 5px 10px !important;
  }
}
</style>
