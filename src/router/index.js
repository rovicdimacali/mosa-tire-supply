import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../views/pages/AppLayout.vue";
import Home from "../views/applayouts/Home.vue";
import LoginPage from "@/views/pages/userAuth/LoginPage.vue";
import ForgotPassword from "@/views/pages/userAuth/ForgotPassword.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AppLayout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "Home",
          component: Home,
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/forgot-password",
      name: "Forgot Password",
      component: ForgotPassword,
    },
  ],
});

export default router;
