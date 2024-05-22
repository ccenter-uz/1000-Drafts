import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./app/App.vue";
import { routes } from "./app/utils/routes";
import { createVuetify } from "vuetify/lib/framework.mjs";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import { mdiAccount } from "@mdi/js";
import { VueClipboard } from "@soerenmartius/vue3-clipboard";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      account: mdiAccount,
    },
    sets: {
      mdi,
    },
  },
});

createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .use(VueSweetalert2)
  .use(VueClipboard)
  .mount("#app");
