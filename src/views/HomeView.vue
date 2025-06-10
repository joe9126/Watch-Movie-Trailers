<template>
  <div class="home">
    <NowPlaying></NowPlaying>
    <TrendingNow></TrendingNow>
    <LatestMovies></LatestMovies>
    <LatestSeries></LatestSeries>
    <Footer></Footer>
  </div>
</template>
<script>
import NowPlaying from "@/components/NowPlaying/NowPlaying.vue";
import TrendingNow from "@/components/TrendingNow/TrendingNow.vue";
import LatestMovies from "@/components/LatestMovies/LatestMovies.vue";
import LatestSeries from "@/components/LatestSeries/LatestSeries.vue";
import Footer from "@/views/FooterView.vue";
export default {
  components: {
    NowPlaying,
    TrendingNow,
    LatestMovies,
    LatestSeries,
    Footer,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss"></style>
