import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../views/pages/AppLayout.vue";
import Home from "../views/applayouts/customer/Home.vue";
import authRoutes from "./authRoutes/authRoutes";
import ourProductRoutes from "./ourProductsRoutes/ourProductsRoutes";
import adminRoutes from "./adminRoutes/adminRoutes";

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
        ...adminRoutes,
      ],
    },
    ...authRoutes,
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const is_staff =
    localStorage.getItem("is_staff") === "ADMINISTRATOR" ||
    localStorage.getItem("is_staff") === "PRODUCT_MANAGER" ||
    localStorage.getItem("is_staff") === "CONTENT_MANAGER" ||
    localStorage.getItem("is_staff") === "ORDER_MANAGER";

  if (to.matched.some((route) => route.meta.requiresGuest) && isAuthenticated) {
    // If the route requires guest (not authenticated) and the user is authenticated
    next({ name: "Home" }); // Redirect to home or another route
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "Login" });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: "Home" });
  } else if (
    to.meta.requiresFromCart &&
    from.name !== "Cart" &&
    from.name !== "Our Products"
  ) {
    next({ name: "Home" });
  } else if (
    (to.meta.requiresForgotPassword || to.meta.requiresSignUp) &&
    !(from.name === "Forgot Password" || from.name === "Sign Up")
  ) {
    next({ name: "Login" });
  } else if (to.meta.requiresAdmin && !is_staff) {
    next({ name: "Home" });
  } else if (to.path === "/admin-products" && isAuthenticated) {
    next("/admin-products/brands");
  } else if (to.path === "/admin-orders" && isAuthenticated) {
    next("/admin-orders/online");
  } else if (to.meta.requiresAdmin === false && is_staff) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
