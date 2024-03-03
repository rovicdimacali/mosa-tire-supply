import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../views/pages/AppLayout.vue";
import Home from "../views/applayouts/Home.vue";
import LoginPage from "@/views/pages/userAuth/LoginPage.vue";
import ForgotPassword from "@/views/pages/userAuth/ForgotPassword.vue";
import OTP from "@/views/pages/userAuth/OTP.vue";

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
    {
      path: "/otp",
      name: "OTP",
      component: OTP,
    },
  ],
});

export default router;
