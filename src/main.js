import "./assets/style.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-indigo/theme.css";
import "primeicons/primeicons.css";

import { Icon } from "@iconify/vue";

import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Carousel from "primevue/carousel";
import Card from "primevue/card";
import Image from "primevue/image";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);

app.component("Icon", Icon);
app.component("Button", Button);
app.component("Sidebar", Sidebar);
app.component("Carousel", Carousel);
app.component("Card", Card);
app.component("Image", Image);

app.mount("#app");
