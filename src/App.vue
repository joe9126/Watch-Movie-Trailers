<template>
  <div class="bg-wrapper">
    <div class="container">
      <header>
        <router-link :to="`/`" aria-label="Go to homepage">
          <h1><span>Trailaz</span>{{ title }}</h1>
        </router-link>
      </header>
      <GlobalLoader />
      <Search></Search>
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import SearchComponent from "./components/SearchComponent.vue";
import GlobalLoader from "./views/GlobalLoader/GlobalLoader.vue";
/*import bgImage from "@/assets/images/wallpaper.jpg"; */
export default {
  components: {
    Search: SearchComponent,
    GlobalLoader,
  },
  data() {
    return {
      title: "Db",
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira Sans", sans-serif;

  &::selection {
    background: transparentize(#42b883, 0.5);
  }
}
.bg-wrapper {
  width: 100%;
  height: 100vh;
}
/*
.bg-wrapper::before {
  content: "";
  position: absolute;
  inset: 0;
   z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
 
}
*/
.container {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: #2c3d4e;
  min-height: 100vh;
  padding: 0 5px;
  width: 80%;
  margin: 0 auto;
}
body {
  background: #070707;
}
a {
  text-decoration: none;
}
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #070707;
  position: sticky;
  h1 {
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    span {
      color: #42b883;
    }
  }
}

@media (max-width: 600px) {
  * {
    margin: 0;
  }

  .container {
    position: relative;
    height: 100vh;
    padding: 2px;
    width: 100%;
  }
  header {
    padding: 10px 8px;
    h1 {
      font-size: 22px;
    }
  }
}
</style>
