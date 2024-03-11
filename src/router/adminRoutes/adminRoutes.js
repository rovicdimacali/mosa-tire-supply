import Accounts from "@/views/applayouts/admin/Accounts.vue";

const adminRoutes = [
  {
    path: "/admin-accounts",
    name: "Admin Accounts",
    component: Accounts,
    meta: {
      requiresAdmin: true,
    },
  },
];

export default adminRoutes;
