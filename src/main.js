import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles/styles.scss"; // Import global styles
import router from "./router/index.js";
import { register } from "swiper/element/bundle";
import { createPinia } from "pinia";

register(); // Register Swiper elements globally

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
