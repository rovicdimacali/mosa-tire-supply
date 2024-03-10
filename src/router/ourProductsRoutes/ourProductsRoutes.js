import OurProducts from "@/views/applayouts/OurProducts.vue";
import Cart from "@/views/applayouts/Cart.vue";

const ourProductRoutes = [
  {
    path: "/our-products",
    name: "Our Products",
    component: OurProducts,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      requiresAuth: true,
    },
  },
];

export default ourProductRoutes;
