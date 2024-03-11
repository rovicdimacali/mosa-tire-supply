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
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputNumber from "primevue/inputnumber";
import InputOtp from "primevue/inputotp";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";
import Dropdown from "primevue/dropdown";
import Rating from "primevue/rating";
import Dialog from "primevue/dialog";
import Checkbox from "primevue/checkbox";
import RadioButton from "primevue/radiobutton";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Message from "primevue/message";

const app = createApp(App);

app.directive("tooltip", Tooltip);

app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);

app.component("Icon", Icon);
app.component("Button", Button);
app.component("Sidebar", Sidebar);
app.component("Carousel", Carousel);
app.component("Card", Card);
app.component("Image", Image);
app.component("FloatLabel", FloatLabel);
app.component("InputText", InputText);
app.component("Password", Password);
app.component("InputGroup", InputGroup);
app.component("InputGroupAddon", InputGroupAddon);
app.component("InputNumber", InputNumber);
app.component("InputOtp", InputOtp);
app.component("ConfirmDialog", ConfirmDialog);
app.component("Dropdown", Dropdown);
app.component("Rating", Rating);
app.component("Dialog", Dialog);
app.component("Checkbox", Checkbox);
app.component("RadioButton", RadioButton);
app.component("Toast", Toast);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Message", Message);

app.mount("#app");
