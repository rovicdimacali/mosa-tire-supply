import OurProducts from "@/views/applayouts/customer/OurProducts.vue";
import Cart from "@/views/applayouts/customer/Cart.vue";

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
