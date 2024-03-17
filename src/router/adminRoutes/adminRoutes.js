import Accounts from "@/views/applayouts/admin/Accounts.vue";
import Products from "@/views/applayouts/admin/Products.vue";
import Brands from "@/views/applayouts/admin/productpages/Brands.vue";
import ThreadTypes from "@/views/applayouts/admin/productpages/ThreadTypes.vue";
import ThreadVariants from "@/views/applayouts/admin/productpages/ThreadVariants.vue";

const adminRoutes = [
  {
    path: "/admin-accounts",
    name: "Admin Accounts",
    component: Accounts,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/admin-products",
    name: "Admin Products",
    component: Products,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: "/admin-products/brands",
        name: "Product Brands",
        component: Brands,
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "/admin-products/thread-types",
        name: "Product Thread Types",
        component: ThreadTypes,
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "/admin-products/thread-variants",
        name: "Product Thread Variants",
        component: ThreadVariants,
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
    ],
  },
];

export default adminRoutes;
