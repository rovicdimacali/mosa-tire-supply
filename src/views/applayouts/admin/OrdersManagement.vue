<template>
  <div class="orders-management-page">
    <div class="orders-management col">
      <h1>Orders Management</h1>
      <TabMenu :model="tabs" :activeIndex="activeIndex" />
      <div class="orders-management-routerview-container">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          label: "Online",
          icon: "pi pi-tags",
          to: "/admin-orders/online",
          command: () => {
            this.$router.push("/admin-orders/online");
          },
        },
        {
          label: "Kiosk",
          icon: "pi pi-tags",
          to: "/admin-orders/kiosk",
          command: () => {
            this.$router.push("/admin-orders/kiosk");
          },
        },
        {
          label: "On site",
          icon: "pi pi-tags",
          to: "/admin-orders/on-site",
          command: () => {
            this.$router.push("/admin-orders/on-site");
          },
        },
      ],
      activeIndex: 0,
    };
  },
  watch: {
    $route(to) {
      this.activeIndex = this.tabs.findIndex((tab) => tab.to === to.path);
    },
  },
  created() {
    this.activeIndex = this.tabs.findIndex(
      (tab) => tab.to === this.$route.path
    );
  },
};
</script>
