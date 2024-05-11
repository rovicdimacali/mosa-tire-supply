<template>
  <RouterView />
</template>

<script>
import { getBrands } from "./services/Admin/Products";

export default {
  data() {
    return {
      pollingInterval: null,
    };
  },
  methods: {
    async fetchBrandsPolling() {
      try {
        await getBrands();
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    // Fetch brands immediately when the component is mounted
    this.fetchBrandsPolling();

    // Polling every 10 seconds
    this.pollingInterval = setInterval(() => {
      this.fetchBrandsPolling();
    }, 10000); // 10 seconds in milliseconds
  },
  beforeDestroy() {
    clearInterval(this.pollingInterval);
  },
};
</script>
