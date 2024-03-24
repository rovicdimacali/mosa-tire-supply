<template>
  <div class="my-orders-page">
    <div class="my-orders-col col">
      <div class="my-orders-header">
        <h3>MY ORDERS</h3>
      </div>
      <div class="my-orders-content col">
        <DataTable
          :value="customers"
          scrollable
          scrollHeight="400px"
          tableStyle="min-width: 50rem"
        >
          <Column field="name" header="Name"></Column>
          <Column field="country.name" header="Country"></Column>
          <Column field="representative.name" header="Representative"></Column>
          <Column field="company" header="Company"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserOrders } from "@/services/Products/Products";
export default {
  data() {
    return {};
  },

  methods: {
    async fetchUserOrders() {
      try {
        const response = await getUserOrders();
        console.log(response);
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
