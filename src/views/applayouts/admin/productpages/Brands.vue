<template>
  <Toast />
  <AddBrandDialog
    v-if="isAddBrandDialogVisible"
    :isVisible="isAddBrandDialogVisible"
    @close="
      () => {
        isAddBrandDialogVisible = false;
      }
    "
    @success="handleSuccess"
  />
  <div class="brands-container col">
    <DataTable
      :value="brands"
      scrollable
      scrollHeight="400px"
      class="brand-table"
    >
      <template #header>
        <h3>Brands</h3>
      </template>

      <Column field="name" header="Brand" style="min-width: 100px"></Column>
      <Column header="Image" style="min-width: 100px">
        <template #body="slotProps">
          <Image :src="slotProps.data.imageUrl" width="100px" /> </template
      ></Column>
    </DataTable>
    <Button
      label="Add Brand"
      class="add-brand-btn"
      @click="isAddBrandDialogVisible = true"
    />
  </div>
</template>

<script>
import { getBrands } from "@/services/Admin/Products.js";
import AddBrandDialog from "@/components/admin/Products/components/AddBrandDialog.vue";
export default {
  components: { AddBrandDialog },
  data() {
    return {
      brands: null,
      isAddBrandDialogVisible: false,
    };
  },

  methods: {
    async fetchBrands() {
      const response = await getBrands();
      this.brands = response || [];

      console.log(this.brands);
    },

    handleSuccess() {
      this.isAddBrandDialogVisible = false;
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Brand Added Successfully.",
        life: 3000,
      });
      this.fetchBrands();
    },
  },

  mounted() {
    this.fetchBrands();
  },
};
</script>

<style></style>
