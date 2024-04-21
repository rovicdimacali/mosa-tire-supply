<template>
  <div class="orders-management-page">
    <div class="orders-management col">
      <h1>Orders Management</h1>
      <div class="wrap" style="margin: 20px 0; gap: 10px">
        <Card style="flex-grow: 1; flex-basis: 250px; min-height: 150px">
          <template #content>
            <div
              class="col"
              style="justify-content: space-between; height: 100%"
            >
              <h4 style="margin-top: 0">Today's Order Count</h4>
              <h2 style="align-self: flex-end">
                {{ statistics?.currentDayCount }}
              </h2>
            </div>
          </template>
        </Card>
        <Card style="flex-grow: 1; flex-basis: 250px; min-height: 150px">
          <template #content>
            <div
              class="col"
              style="justify-content: space-between; height: 100%"
            >
              <h4 style="margin-top: 0">This Week's Order Count</h4>
              <h2 style="align-self: flex-end">
                {{ statistics?.currentWeekCount }}
              </h2>
            </div>
          </template>
        </Card>
        <Card style="flex-grow: 1; flex-basis: 250px; min-height: 150px">
          <template #content>
            <div
              class="col"
              style="justify-content: space-between; height: 100%"
            >
              <h4 style="margin-top: 0">This Month's Order Count</h4>
              <h2 style="align-self: flex-end">
                {{ statistics?.currentMonthCount }}
              </h2>
            </div>
          </template>
        </Card>
        <Card style="flex-grow: 1; flex-basis: 250px; min-height: 150px">
          <template #content>
            <div
              class="col"
              style="justify-content: space-between; height: 100%"
            >
              <h4 style="margin-top: 0">Top Brand</h4>
              <h2 style="align-self: flex-end">
                {{ statistics?.topBrandOrdered }}
              </h2>
            </div>
          </template>
        </Card>
        <Card style="flex-grow: 1; flex-basis: 250px; min-height: 150px">
          <template #content>
            <div
              class="col"
              style="justify-content: space-between; height: 100%"
            >
              <h4 style="margin-top: 0">Daily Orders Ave.</h4>
              <h2 style="align-self: flex-end">
                {{ statistics?.dailyOrders }}
              </h2>
            </div>
          </template>
        </Card>
        <Card style="flex-grow: 1; flex-basis: 250px; min-height: 150px">
          <template #content>
            <div
              class="col"
              style="justify-content: space-between; height: 100%"
            >
              <h4 style="margin-top: 0">Weekly Orders Ave.</h4>
              <h2 style="align-self: flex-end">
                {{ statistics?.weeklyOrders }}
              </h2>
            </div>
          </template>
        </Card>
        <Card style="flex-grow: 1; flex-basis: 250px; min-height: 150px">
          <template #content>
            <div
              class="col"
              style="justify-content: space-between; height: 100%"
            >
              <h4 style="margin-top: 0">Monthly Orders Ave.</h4>
              <h2 style="align-self: flex-end">
                {{ statistics?.monthlyOrders }}
              </h2>
            </div>
          </template>
        </Card>
      </div>
      <TabMenu :model="tabs" :activeIndex="activeIndex" />
      <div class="orders-management-routerview-container">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script>
import { orderStatistics } from "@/services/Admin/Orders";
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
      statistics: null,
    };
  },
  methods: {
    async fetchOrderStatistics() {
      try {
        const response = await orderStatistics();
        this.statistics = response || [];
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
    this.fetchOrderStatistics();
  },
};
</script>
