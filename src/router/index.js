import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import isLoading from "../views/GlobalLoader/GlobalLoader.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/movie/:id",
    name: "Movie Details",
    component: () => import("../components/MovieDetail/MovieDetails.vue"),
    // Lazy-loaded component
  },
  {
    path: "/tv/:id",
    name: "TV Details",
    component: () => import("../components/MovieDetail/MovieDetails.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  isLoading.value = true;
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});

export default router;
