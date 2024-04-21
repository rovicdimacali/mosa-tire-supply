<template>
  <div class="admin-products-page">
    <div class="admin-products col">
      <h1>Products</h1>
      <Card style="margin: 0 0 20px 0">
        <template #content>
          <div
            class="wrap"
            style="justify-content: space-between; align-items: center"
          >
            <h2 style="margin: 0">Critical Stocks</h2>
            <div class="wrap" style="width: 350px">
              <small
                v-for="(criticalStock, index) in criticalStocks"
                :key="index"
                style="flex-grow: 1; margin: 4px 0"
              >
                {{ criticalStock.threadType }} {{ criticalStock.width }}/{{
                  criticalStock.aspectRatio
                }}/{{ criticalStock.diameter }} {{ criticalStock.sidewall }}
                {{ criticalStock.plyRating }}
                <span style="font-weight: 700"
                  >({{ criticalStock.stocks }} pcs.)</span
                >
              </small>
            </div>
          </div>
        </template>
      </Card>
      <TabMenu :model="tabs" :activeIndex="activeIndex" />
      <div class="products-routerview-container">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import { getCriticalStocks } from "@/services/Products/Products";
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
      criticalStocks: null,
    };
  },

  methods: {
    async fetchCriticalStocks() {
      try {
        const response = await getCriticalStocks();
        this.criticalStocks = response || [];
      } catch (error) {
        console.error(error);
      }
    },
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
    this.fetchCriticalStocks();
  },
};
</script>
