import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../views/pages/AppLayout.vue";
import Home from "../views/applayouts/Home.vue";
import authRoutes from "./authRoutes/authRoutes";
import ourProductRoutes from "./ourProductsRoutes/ourProductsRoutes";

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
        ...ourProductRoutes,
      ],
    },
    ...authRoutes,
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (to.matched.some((route) => route.meta.requiresGuest) && isAuthenticated) {
    // If the route requires guest (not authenticated) and the user is authenticated
    next({ name: "Home" }); // Redirect to home or another route
  } else if (to.meta.requiresOtp && from.name !== "OTP") {
    // If the route requires OTP and the user didn't come from the OTP page
    next({ name: "OTP" }); // Redirect to OTP page or another appropriate route
  } else if (
    (to.meta.requiresForgotPassword || to.meta.requiresSignUp) &&
    (from.name !== "Forgot Password" || from.name !== "Sign Up")
  ) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
