import "./assets/style.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-indigo/theme.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";
import Sidebar from "primevue/sidebar";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component("Button", Button);
app.component("Sidebar", Sidebar);

app.mount("#app");
