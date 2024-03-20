import OurProducts from "@/views/applayouts/customer/OurProducts.vue";
import Cart from "@/views/applayouts/customer/Cart.vue";
import Checkout from "@/views/applayouts/customer/Checkout.vue";

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
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      requiresAuth: true,
      requiresFromCart: true,
    },
    props: (route) => ({ checkouts: route.query.checkouts }),
  },
];

export default ourProductRoutes;
