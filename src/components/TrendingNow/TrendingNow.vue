<template>
  <div class="wrapper">
    <h2 class="trending-title">
      {{ title1.toUpperCase() }} <span class="title2">{{ title2.toUpperCase() }}</span>
    </h2>
    <div class="trending-slider">
      <swiper
        :breakpoints="{
          0: {
            slidesPerView: 4,
            spaceBetween: 2,
          },
          600: {
            slidesPerView: 6,
            spaceBetween: 2,
          },
        }"
        :modules="[Navigation]"
        :navigation="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: true,
        }"
        :pagination="false"
        class="mySwiper"
        v-if="trending.length > 1"
      >
        <swiper-slide v-for="movie in trending" :key="movie.id">
          <div class="movie-card">
            <router-link :to="`/${movie.media_type}/${movie.id}`" class="movie-card">
              <div class="poster">
                <img
                  :src="`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`"
                  :alt="movie.title"
                  class="poster-img"
                />
              </div>
            </router-link>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ref, onMounted } from "vue";
import env from "@/env.js";

const title1 = ref("Trending");
const title2 = ref(" Now");
const trending = ref([]);

const getTrendingMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${env.tmdbApiKey}&language=en-US&page=1`
    );
    const data = await response.json();
    trending.value = data.results || [];
    // console.log(trending.value);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};
onMounted(getTrendingMovies);
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  .mySwiper {
    display: flex;
    justify-content: center;
  }
  h2 {
    text-align: left;
    font-weight: 600;
    margin-bottom: 10px;
    color: #42b983 !important;
    font-size: 1.5rem;
    .title2 {
      color: #fff;
    }
  }
  .trending-slider {
    display: block;
  }
}
.poster-img {
  width: 250px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}
/* Optional: style the arrows */
.swiper-button-prev,
.swiper-button-next {
  color: white; /* or any color */
}

@media (max-width: 460px) {
  .title {
    font-size: 1.2rem;
  }
  .wrapper {
    padding: 10px !important;
  }

  .poster {
    width: 90px;
    height: auto;
    margin: 0.1px !important;
    .poster-img {
      width: 75px;
      height: auto;
    }
  }
}
</style>
