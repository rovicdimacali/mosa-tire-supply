<template>
  <Toast />
  <div class="kiosk-orders-container col">
    <DataTable
      :value="orders"
      scrollable
      scrollHeight="calc(70vh - 100px)"
      class="kiosk-orders-table"
    >
      <template #header>
        <div class="header-row row">
          <h3>Kiosk Orders</h3>
          <SelectButton
            v-model="selectedFilter"
            :options="filters"
            optionLabel="name"
            optionValue="value"
            aria-labelledby="multiple"
            @change="fetchOrders"
          />
        </div>
      </template>
      <Column
        v-if="selectedFilter === 'PROCESSING'"
        field="queueingNumber"
        header="Queue No."
        style="
          min-width: 100px;
          font-size: 20px;
          font-weight: bold;
          text-align: center;
        "
      />
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
              v-for="kioskOrder in slotProps.data.kioskOrders"
              :key="kioskOrder.cartOrderId"
            >
              <small
                >{{ kioskOrder.details?.threadType }}
                {{ kioskOrder.details?.width }}/{{
                  kioskOrder.details?.aspectRatio
                }}/{{ kioskOrder.details?.diameter }}
                {{
                  kioskOrder.details?.plyRating
                    ? kioskOrder.details?.plyRating
                    : ""
                }}
                {{ kioskOrder.details?.sidewall }}
                x{{ kioskOrder.quantity }}</small
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
      <Column header="Actions" style="min-width: 100px">
        <template #body="slotProps">
          <div class="col" style="gap: 5px">
            <Button
              v-if="slotProps.data.status === 'PROCESSING'"
              severity="success"
              label="Complete"
              @click="complete(slotProps.data)"
              :loading="slotProps.data.loadingComplete"
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { getOrders, kioskCompleteOrder } from "@/services/Admin/Orders";

export default {
  data() {
    return {
      orders: null,
      selectedFilter: null,
      filters: [
        { name: "Processing", value: "PROCESSING" },
        { name: "Completed", value: "ORDER_COMPLETED" },
      ],
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
            return (
              order.orderType === "KIOSK" &&
              order.status === this.selectedFilter
            );
          }) || [];
        console.log(this.orders);
      } catch (error) {
        console.error(error);
      }
    },

    async complete(order) {
      try {
        order.loadingComplete = true; // Set loading state
        await kioskCompleteOrder(order.kioskToken);
        this.$toast.add({
          severity: "success",
          summary: "Verified",
          detail: "Order Completed",
          life: 3000,
        });
        this.fetchOrders();
      } catch (error) {
        console.error(error);
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error Occurred",
          life: 3000,
        });
      } finally {
        order.loadingComplete = false; // Reset loading state
      }
    },
  },

  mounted() {
    this.fetchOrders();
    this.selectedFilter = localStorage.getItem("selectedFilter")
      ? localStorage.getItem("selectedFilter")
      : "PROCESSING";
  },

  watch: {
    selectedFilter(newVal) {
      localStorage.setItem("selectedFilter", newVal);
    },
  },
};
</script>

<style></style>
