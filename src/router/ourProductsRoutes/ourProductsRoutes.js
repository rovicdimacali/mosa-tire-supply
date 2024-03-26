import OurProducts from "@/views/applayouts/customer/OurProducts.vue";
import Cart from "@/views/applayouts/customer/Cart.vue";
import Checkout from "@/views/applayouts/customer/Checkout.vue";
import MyOrders from "@/views/applayouts/customer/MyOrders.vue";
import Queuing from "@/views/applayouts/customer/Queuing.vue";

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
  {
    path: "/queuing",
    name: "Queuing",
    component: Queuing,
    meta: {
      requiresFromCart: true,
    },
    props: (route) => ({ checkouts: route.query.checkouts }),
  },
  {
    path: "/my-orders",
    name: "My Orders",
    component: MyOrders,
    meta: {
      requiresAuth: true,
    },
  },
];

export default ourProductRoutes;
