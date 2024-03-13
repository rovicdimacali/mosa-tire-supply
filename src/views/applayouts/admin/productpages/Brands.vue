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
  <EditBrandDialog
    v-if="isEditBrandDialogVisible"
    :isVisible="isEditBrandDialogVisible"
    :brand="brandToEdit"
    @close="
      () => {
        isEditBrandDialogVisible = false;
      }
    "
    @success="handleSuccess"
  />
  <div class="brands-container col">
    <DataTable
      :value="brands"
      scrollable
      scrollHeight="calc(70vh - 100px)"
      class="brand-table"
    >
      <template #header>
        <div class="header-row row">
          <h3>Brands</h3>
          <Button
            label="Add Brand"
            class="add-brand-btn"
            @click="isAddBrandDialogVisible = true"
          />
        </div>
      </template>

      <Column field="name" header="Brand" style="min-width: 100px"></Column>
      <Column header="Image" style="min-width: 100px">
        <template #body="slotProps">
          <Image :src="slotProps.data.imageUrl" width="100px" /> </template
      ></Column>
      <Column header="Actions" style="min-width: 100px">
        <template #body="slotProps">
          <div class="action-row row">
            <Button
              icon="pi pi-pencil"
              @click="
                brandToEdit = slotProps.data;
                isEditBrandDialogVisible = true;
              "
            ></Button>
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="removeBrand(slotProps.data.id)"
            ></Button>
          </div> </template
      ></Column>
    </DataTable>
  </div>
</template>

<script>
import { getBrands, deleteBrand } from "@/services/Admin/Products.js";
import AddBrandDialog from "@/components/admin/Products/components/Brands/AddBrandDialog.vue";
import EditBrandDialog from "@/components/admin/Products/components/Brands/EditBrandDialog.vue";
export default {
  components: { AddBrandDialog, EditBrandDialog },
  data() {
    return {
      brands: null,
      isAddBrandDialogVisible: false,
      isEditBrandDialogVisible: false,
      brandToEdit: null,
      brandToDelete: null,
    };
  },

  methods: {
    async fetchBrands() {
      const response = await getBrands();
      this.brands = response || [];
    },

    handleSuccess() {
      this.isAddBrandDialogVisible = false;
      this.isEditBrandDialogVisible = false;
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Brand Added Successfully.",
        life: 3000,
      });
      this.fetchBrands();
    },

    removeBrand(id) {
      this.$confirm.require({
        message: "Are you sure you want to delete this brand?",
        header: "Delete",
        icon: "pi pi-exclamation-triangle",
        rejectLabel: "No",
        acceptLabel: "Yes",
        accept: async () => {
          try {
            await deleteBrand(id);
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Brand Deleted Successfully.",
              life: 3000,
            });
            await this.fetchBrands(); // Wait for the fetchBrands API request to complete
          } catch (error) {
            console.error("Error deleting brand:", error);
          } finally {
            this.$confirm.clear(); // Close the dialog after the API request is complete
          }
        },
        reject: () => {},
      });
    },
  },

  mounted() {
    this.fetchBrands();
  },
};
</script>

<style></style>
