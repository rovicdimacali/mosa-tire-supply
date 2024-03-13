<template>
  <Toast />
  <AddThreadTypeDialog
    v-if="isAddThreadTypeDialogVisible"
    :isVisible="isAddThreadTypeDialogVisible"
    :brands="brands"
    @close="
      () => {
        isAddThreadTypeDialogVisible = false;
      }
    "
    @success="handleSuccess"
  />
  <div class="threadtype-container col">
    <DataTable
      :value="threadTypes"
      scrollable
      scrollHeight="calc(70vh - 100px)"
      class="threadtype-table"
    >
      <template #header>
        <div class="header-row row">
          <h3>Thread Types</h3>
          <div class="action-row row">
            <Button
              label="Add Thread Type"
              class="add-threadtype-btn"
              @click="isAddThreadTypeDialogVisible = true"
            />
            <Dropdown
              v-model="selectedBrand"
              :options="brands"
              optionLabel="name"
              optionValue="name"
              filter
              placeholder="Select a Brand"
              @change="fetchThreadTypes"
              class="w-full md:w-14rem"
            />
            <IconField iconPosition="left">
              <InputIcon class="pi pi-search"> </InputIcon>
              <InputText
                v-model="searchValue"
                placeholder="Search"
                @input="debouncedSearchThreadType"
              />
            </IconField>
          </div>
        </div>
      </template>
      <Column header="Image" style="min-width: 100px">
        <template #body="slotProps">
          <Image :src="slotProps.data.imageUrl" width="100px" /> </template
      ></Column>
      <Column
        field="type"
        header="Thread Type"
        style="min-width: 100px"
      ></Column>
      <Column
        field="brandName"
        header="Brand"
        style="min-width: 100px"
      ></Column>
      <Column header="No. of Tires" style="min-width: 100px">
        <template #body="slotProps">
          {{ slotProps.data.detail?.length }}
        </template></Column
      >
      <Column header="Description" style="min-width: 100px">
        <template #body="slotProps">
          <div v-html="slotProps.data.description"></div> </template
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
import {
  getBrands,
  getThreadTypes,
  searchThreadTypes,
} from "@/services/Admin/Products.js";
import AddThreadTypeDialog from "@/components/admin/Products/components/ThreadTypes/AddThreadTypeDialog.vue";
import _ from "lodash";

export default {
  components: { AddThreadTypeDialog },
  data() {
    return {
      brands: null,
      threadTypes: null,
      selectedBrand: null,
      isAddThreadTypeDialogVisible: false,
      searchValue: "",
    };
  },

  methods: {
    async fetchBrands() {
      const response = await getBrands();
      this.brands = response || [];
    },

    async fetchThreadTypes() {
      const response = await getThreadTypes(this.selectedBrand);
      this.threadTypes = response || [];
    },

    async searchThreadType() {
      let response;
      if (this.searchValue) {
        response = await searchThreadTypes(this.searchValue);
      } else {
        response = await getThreadTypes(this.selectedBrand);
      }
      this.threadTypes = response || [];
    },

    debouncedSearchThreadType: _.debounce(function () {
      this.searchThreadType();
    }, 800),

    handleSuccess() {
      this.isAddThreadTypeDialogVisible = false;
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
    this.fetchThreadTypes();
  },
};
</script>

<style></style>