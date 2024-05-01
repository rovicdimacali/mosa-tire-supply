<template>
  <Toast />
  <div class="online-orders-container col">
    <DataTable
      :value="orders"
      scrollable
      scrollHeight="calc(70vh - 100px)"
      class="online-orders-table"
    >
      <template #header>
        <div class="header-row row">
          <h3>Online Orders</h3>
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
      <Column header="Order Date" style="min-width: 100px"
        >\
        <template #body="slotProps">
          {{ slotProps.data.dateOrdered.toLocaleString() }}
        </template>
      </Column>
      <Column header="Customer" style="min-width: 100px"
        >\
        <template #body="slotProps">
          <div class="col">
            <small>{{ slotProps.data.customerName }}</small>
            <small>{{ slotProps.data.customerEmail }}</small>
          </div>
        </template>
      </Column>
      <Column
        field="paymentMethod"
        header="Payment Method"
        style="min-width: 100px"
      ></Column>
      <Column
        field="referenceNumber"
        header="Ref No."
        style="min-width: 100px"
      ></Column>
      <Column header="Items Ordered" style="min-width: 100px">
        <template #body="slotProps">
          <ul>
            <li
              v-for="onlineOrder in slotProps.data.onlineOrders"
              :key="onlineOrder.cartOrderId"
            >
              <small
                >{{ onlineOrder.details?.threadType }}
                {{ onlineOrder.details?.width }}/{{
                  onlineOrder.details?.aspectRatio
                }}/{{ onlineOrder.details?.diameter }}
                {{
                  onlineOrder.details?.plyRating
                    ? onlineOrder.details?.plyRating
                    : ""
                }}
                {{ onlineOrder.details?.sidewall }}
                x{{ onlineOrder.quantity }}</small
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
              v-if="
                slotProps.data.status === 'FOR_VERIFICATION' ||
                slotProps.data.status === 'INVALID_REFERENCE_NUMBER'
              "
              severity="success"
              label="Verify"
              @click="verify(slotProps.data)"
              :loading="slotProps.data.loadingVerify"
            ></Button>
            <Button
              v-if="slotProps.data.status === 'FOR_VERIFICATION'"
              severity="danger"
              label="Invalid"
              @click="invalidate(slotProps.data)"
              :loading="slotProps.data.loadingInvalidate"
            ></Button>
            <Button
              v-if="slotProps.data.status === 'VERIFIED'"
              severity="primary"
              label="Pickup"
              @click="pickup(slotProps.data)"
              :loading="slotProps.data.loadingPickup"
            ></Button>
            <Button
              v-if="slotProps.data.status === 'FOR_PICKUP'"
              severity="info"
              label="Complete"
              @click="complete(slotProps.data)"
              :loading="slotProps.data.loadingComplete"
            ></Button>
            <Button
              severity="info"
              label="Cancel"
              @click="cancel(slotProps.data)"
              :loading="slotProps.data.loadingComplete"
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import {
  getOrders,
  verifyOrder,
  invalidOrder,
  pickupOrder,
  completeOrder,
  cancelOrder,
} from "@/services/Admin/Orders";
export default {
  data() {
    return {
      orders: null,
      selectedFilter: null,
      filters: [
        { name: "For Verification", value: "FOR_VERIFICATION" },
        { name: "Verified", value: "VERIFIED" },
        { name: "For Pickup", value: "FOR_PICKUP" },
        { name: "Completed", value: "ORDER_COMPLETED" },
        { name: "Invalid", value: "INVALID_REFERENCE_NUMBER" },
        { name: "Cancelled", value: "INVALID_REFERENCE_NUMBER" },
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
              order.orderType === "ONLINE" &&
              order.status === this.selectedFilter
            );
          }) || [];
        console.log(this.orders);
      } catch (error) {
        console.error(error);
      }
    },

    async verify(order) {
      try {
        order.loadingVerify = true; // Set loading state
        await verifyOrder(order.orderId);
        this.$toast.add({
          severity: "success",
          summary: "Verified",
          detail: "Payment Verified",
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
        order.loadingVerify = false; // Reset loading state
      }
    },

    async invalidate(order) {
      try {
        order.loadingInvalidate = true; // Set loading state
        await invalidOrder(order.orderId);
        this.$toast.add({
          severity: "success",
          summary: "Invalidated",
          detail: "Payment Invalidated",
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
        order.loadingInvalidate = false; // Reset loading state
      }
    },

    async pickup(order) {
      try {
        order.loadingPickup = true; // Set loading state
        await pickupOrder(order.orderId);
        this.$toast.add({
          severity: "success",
          summary: "Status Changed",
          detail: "Ready for Pickup",
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
        order.loadingPickup = false; // Reset loading state
      }
    },

    async complete(order) {
      try {
        order.loadingComplete = true; // Set loading state
        await completeOrder(order.orderId);
        this.$toast.add({
          severity: "success",
          summary: "Completed",
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
    async cancel(order) {
      try {
        order.loadingComplete = true; // Set loading state
        await cancelOrder(order.orderId);
        this.$toast.add({
          severity: "success",
          summary: "Cancelled",
          detail: "Order Cancelled",
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
