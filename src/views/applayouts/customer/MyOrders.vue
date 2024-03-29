<template>
  <div class="my-orders-page">
    <div class="my-orders-col col">
      <div class="my-orders-header">
        <h3>MY ORDERS</h3>
      </div>
      <div class="my-orders-content col">
        <DataTable
          :value="myOrders?.cartOrders"
          scrollable
          scrollHeight="400px"
          tableStyle="min-width: 50rem"
        >
          <template #header>
            Remaning amount to pay: {{ myOrders?.totalCartPrice }}
          </template>
          <Column field="threadType" header="Thread Type"> </Column>
          <Column header="Size">
            <template #body="slotProps">
              {{ slotProps.data?.details?.width }}/{{
                slotProps.data?.details?.aspectRatio
              }}/{{ slotProps.data?.details?.diameter }}
            </template>
          </Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column field="orderStatus" header="Status"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserOrders } from "@/services/Products/Products";
export default {
  data() {
    return {
      myOrders: null,
    };
  },

  methods: {
    async fetchUserOrders() {
      try {
        const response = await getUserOrders();
        this.myOrders = response || [];
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.fetchUserOrders();
  },
};
</script>

<style></style>
