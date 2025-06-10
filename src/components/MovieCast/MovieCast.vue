<template>
  <div class="loading" v-if="isLoading">Loading...</div>
  <div class="movie-cast">
    <h2>
      <span class="title1">{{ title1 }}</span
      ><span class="title2">{{ title2 }}</span>
    </h2>
    <div class="cast-list" v-if="cast.length">
      <div class="cast-members" v-for="member in cast" :key="member.id">
        <img
          :src="
            member.profile_path
              ? `https://image.tmdb.org/t/p/w1280/${member.profile_path}`
              : 'https://placehold.co/50x75?text=No+Image'
          "
          :alt="member.name"
          class="cast-member-img"
        />
        <div class="cast-member-info">
          <h3>{{ member.name }}</h3>
          <p>{{ member.character }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No cast information found.</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, defineProps } from "vue";
import env from "@/env.js"; // Assuming you have an env.js file for your API key
const title1 = "Top";
const title2 = " Casts";
const props = defineProps({
  mediaId: {
    type: Number,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  },
});

const cast = ref([]);
const isLoading = ref(true);

const getCast = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${props.mediaType}/${props.mediaId}/credits?api_key=${env.tmdbApiKey}&language=en-US`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    cast.value = data.cast.slice(0, 12); // Limit to first 10 cast members
    //console.log("Fetched movie cast:", movieCast.value);
  } catch (error) {
    console.error("Failed to fetch movie cast:", error);
  } finally {
    isLoading.value = false;
  }
};
onMounted(getCast);
</script>

<style scoped>
.title1 {
  color: #42b883;
  font-weight: bold;
}
.title2 {
  color: #fff;
  font-weight: normal;
}
.movie-cast {
  padding: 20px;
  background-color: #050505;
  color: #ccc;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  h2 {
    margin-bottom: 20px;
  }
  .cast-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    .cast-members {
      display: flex;
      flex-direction: column;

      justify-content: center;
      align-items: center;

      text-align: center;
      margin-bottom: 5px;
      margin-right: 20px;
      .cast-member-img {
        width: 100px;
        height: auto;
        border-radius: 8px;
        margin-bottom: 10px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      h3 {
        font-size: 12px;
        margin-bottom: 5px;
        color: #42b883;
      }
      p {
        font-size: 11px;
        color: #ccc;
      }
    }
  }
}
@media (max-width: 600px) {
  .cast-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.1rem;
  }
  .cast-member-img {
    width: 60px !important;
    height: auto;
  }
  h3 {
    font-size: 0.8rem;
  }
  p {
    font-size: 0.6rem;
  }
}
</style>
