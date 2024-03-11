<template>
  <div class="admin-products-page">
    <div class="admin-products col">
      <h1>Products</h1>
      <TabMenu :model="tabs" :activeIndex="activeIndex" />
      <div class="products-routerview-container">
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
          label: "Brands",
          icon: "pi pi-tags",
          to: "/admin-products/brands",
          command: () => {
            this.$router.push("/admin-products/brands");
          },
        },
        {
          label: "Thread Types",
          icon: "pi pi-car",
          to: "/admin-products/thread-types",
          command: () => {
            this.$router.push("/admin-products/thread-types");
          },
        },
        {
          label: "Thread Variants",
          icon: "pi pi-list",
          to: "/admin-products/thread-variants",
          command: () => {
            this.$router.push("/admin-products/thread-variants");
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
