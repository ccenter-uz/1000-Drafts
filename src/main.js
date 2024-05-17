import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import { routes } from "./app/utils/routes";
import { createVuetify } from "vuetify/lib/framework.mjs";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Vuetify
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { pinia } from "./app/store/Pinia";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");
