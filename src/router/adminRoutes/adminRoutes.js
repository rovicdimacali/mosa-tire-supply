import Accounts from "@/views/applayouts/admin/Accounts.vue";
import Products from "@/views/applayouts/admin/Products.vue";
import Brands from "@/views/applayouts/admin/productpages/Brands.vue";
import ThreadTypes from "@/views/applayouts/admin/productpages/ThreadTypes.vue";
import ThreadVariants from "@/views/applayouts/admin/productpages/ThreadVariants.vue";
import OrdersManagement from "@/views/applayouts/admin/OrdersManagement.vue";
import OnlineOrders from "@/views/applayouts/admin/orderspages/OnlineOrders.vue";
import KioskOrders from "@/views/applayouts/admin/orderspages/KioskOrders.vue";
import OnsiteOrders from "@/views/applayouts/admin/orderspages/OnsiteOrders.vue";
import OnSiteOrders from "@/views/applayouts/admin/OnSiteOrders.vue";
import ActivityLogs from "@/views/applayouts/admin/ActivityLogs.vue";

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
  {
    path: "/admin-orders",
    name: "Orders Management",
    component: OrdersManagement,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: "/admin-orders/online",
        name: "Online Orders",
        component: OnlineOrders,
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "/admin-orders/kiosk",
        name: "Kiosk Orders",
        component: KioskOrders,
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "/admin-orders/on-site",
        name: "On Site Orders",
        component: OnsiteOrders,
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
    ],
  },
  {
    path: "/admin-on-site-orders",
    name: "Onsite Ordering",
    component: OnSiteOrders,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/admin-activity-logs",
    name: "Activity Logs",
    component: ActivityLogs,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    props: (route) => ({ page: parseInt(route.query.page) || 0 }),
  },
];

export default adminRoutes;
