<template>
  <Toast />
  <div class="onsite-orders-container col">
    <DataTable
      :value="orders"
      scrollable
      scrollHeight="calc(70vh - 100px)"
      class="onsite-orders-table"
    >
      <template #header>
        <div class="header-row row">
          <h3>On Site Orders</h3>
        </div>
      </template>
      <Column header="Order Date" style="min-width: 100px"
        >\
        <template #body="slotProps">
          {{ slotProps.data.dateOrdered.toLocaleString() }}
        </template>
      </Column>
      <Column header="Items Ordered" style="min-width: 100px">
        <template #body="slotProps">
          <ul>
            <li
              v-for="onsiteOrder in slotProps.data.onsiteOrders"
              :key="onsiteOrder.orderId"
            >
              <small
                >{{ onsiteOrder.details?.threadType }}
                {{ onsiteOrder.details?.width }}/{{
                  onsiteOrder.details?.aspectRatio
                }}/{{ onsiteOrder.details?.diameter }}
                {{
                  onsiteOrder.details?.plyRating
                    ? onsiteOrder.details?.plyRating
                    : ""
                }}
                {{ onsiteOrder.details?.sidewall }}
                x{{ onsiteOrder.quantity }}</small
              >
            </li>
          </ul>
        </template>
      </Column>
      <Column header="Total Price" style="min-width: 100px">
        <template #body="slotProps">
          ₱{{ slotProps.data.orderTotalPrice.toLocaleString() }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { getOrders } from "@/services/Admin/Orders";
export default {
  data() {
    return {
      orders: null,
    };
  },

  methods: {
    async fetchOrders() {
      try {
        const response = await getOrders();
        // Filter orders based on selected filter value
        this.orders =
          response.filter((order) => {
            // Check if order type is online and status matches selected filter
            return order.orderType === "ONSITE";
          }) || [];
        console.log(this.orders);
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.fetchOrders();
    this.selectedFilter = localStorage.getItem("selectedFilter")
      ? localStorage.getItem("selectedFilter")
      : "FOR_VERIFICATION";
  },

  watch: {
    selectedFilter(newVal) {
      localStorage.setItem("selectedFilter", newVal);
    },
  },
};
</script>

<style></style>
