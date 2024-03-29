<template>
  <Toast />
  <AddThreadVariantDialog
    v-if="isAddThreadVariantDialogVisible"
    :isVisible="isAddThreadVariantDialogVisible"
    :threadTypes="threadTypes"
    @close="
      () => {
        isAddThreadVariantDialogVisible = false;
      }
    "
    @success="handleSuccess"
  />
  <EditThreadVariantDialog
    v-if="isEditThreadTypeDialogVisible"
    :isVisible="isEditThreadTypeDialogVisible"
    :threadTypes="threadTypes"
    :variant="selectedThreadVariant"
    @close="
      () => {
        isEditThreadTypeDialogVisible = false;
      }
    "
    @success="handleSuccess"
  />
  <AddStocksDialog
    v-if="isAddStocksDialogVisible"
    :isVisible="isAddStocksDialogVisible"
    :threadTypes="threadTypes"
    :variant="selectedThreadVariant"
    @close="
      () => {
        isAddStocksDialogVisible = false;
      }
    "
    @success="handleSuccess"
  />
  <div class="threadtype-container col">
    <DataTable
      :value="threadVariants"
      v-model:selection="selectedProduct"
      dataKey="id"
      rowGroupMode="subheader"
      groupRowsBy="threadType"
      sortMode="single"
      sortField="threadType"
      :sortOrder="1"
      scrollable
      scrollHeight="calc(70vh - 100px)"
      tableStyle="min-width: 50rem"
      class="threadtype-table"
    >
      <template #header>
        <div class="header-row row">
          <h3>Thread Types</h3>
          <div class="action-row row">
            <Button
              v-if="selectedProduct?.length > 1"
              icon="pi pi-trash"
              :label="`Delete ${selectedProduct?.length} Variant/s`"
              class="add-threadtype-btn"
              severity="danger"
              @click="deleteMultipleVariants"
            />
            <Button
              icon="pi pi-plus"
              label="Add Variant"
              class="add-threadtype-btn"
              @click="isAddThreadVariantDialogVisible = true"
            />
            <div class="spinner-conat">
              <ProgressSpinner
                v-if="isUploading"
                style="width: 20px; height: 20px"
                strokeWidth="8"
                fill="var(--surface-ground)"
                animationDuration=".5s"
                aria-label="Custom ProgressSpinner"
              />
            </div>
            <FileUpload
              id="image-upload"
              mode="basic"
              :auto="true"
              :customUpload="true"
              @uploader="addThreadTypeDetailFile"
              :multiple="false"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              :maxFileSize="5000000"
              chooseLabel="Upload"
            />
            <a
              href="https://res.cloudinary.com/dpm5vdakr/raw/upload/v1710597463/mosawebapp/assets/Upload-Format_jt3sbe.xlsx"
            >
              <Button
                icon="pi pi-download"
                label="Format"
                class="add-threadtype-btn"
              />
            </a>
            <Dropdown
              v-model="selectedBrand"
              :options="brands"
              optionLabel="name"
              optionValue="name"
              filter
              placeholder="Select a Brand"
              @change="fetchThreadTypeDetails"
              class="w-full md:w-14rem"
            />
            <IconField iconPosition="left">
              <InputIcon class="pi pi-search"> </InputIcon>
              <InputText
                v-model="searchValue"
                placeholder="Search Thread Type"
                @input="debouncedSearchThreadType"
                style="width: 200px"
              />
            </IconField>
          </div>
        </div>
      </template>
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="threadType" header="Thread Type">
        <template #body="slotProps">
          <p>{{ slotProps.data.threadType }}</p>
        </template>
      </Column>
      <Column header="Size">
        <template #body="slotProps">
          {{ slotProps.data.width }}/{{ slotProps.data.aspectRatio }}/{{
            slotProps.data.diameter
          }}
        </template>
      </Column>
      <Column field="plyRating" header="Ply Rating"></Column>
      <Column field="sidewall" header="Side Wall"></Column>
      <Column header="Price">
        <template #body="slotProps"> ₱{{ slotProps.data.price }} </template>
      </Column>
      <Column field="stocks" header="Stocks"></Column>
      <Column header="Actions" style="min-width: 100px">
        <template #body="slotProps">
          <div class="action-row row">
            <Button
              icon="pi pi-plus"
              severity="info"
              @click="
                selectedThreadVariant = slotProps.data;
                isAddStocksDialogVisible = true;
              "
            ></Button>
            <Button
              icon="pi pi-pencil"
              @click="
                selectedThreadVariant = slotProps.data;
                isEditThreadTypeDialogVisible = true;
              "
            ></Button>
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="deleteVariant(slotProps.data.id)"
            ></Button>
          </div> </template
      ></Column>
      <template #groupheader="slotProps">
        <p
          style="
            margin: 0;
            font-weight: bold;
            font-size: 20px;
            text-align: center;
          "
        >
          {{ slotProps.data.threadType }}
        </p>
      </template>
    </DataTable>
  </div>
</template>

<script>
import {
  getBrands,
  getThreadTypes,
  addThreadTypeDetails,
  deleteThreadTypeDetail,
  deleteThreadTypeDetails,
  searchThreadTypes,
} from "@/services/Admin/Products";
import _ from "lodash";
import AddThreadVariantDialog from "@/components/admin/Products/components/ThreadVariants/AddThreadVariantDialog.vue";
import EditThreadVariantDialog from "@/components/admin/Products/components/ThreadVariants/EditThreadVariantDialog.vue";
import AddStocksDialog from "@/components/admin/Products/components/ThreadVariants/AddStocksDialog.vue";
export default {
  components: {
    AddThreadVariantDialog,
    EditThreadVariantDialog,
    AddStocksDialog,
  },
  data() {
    return {
      brands: null,
      selectedBrand: null,
      threadTypes: null,
      threadVariants: null,
      selectedProduct: null,
      selectedThreadVariant: null,
      isUploading: false,
      isLoading: false,
      isAddThreadVariantDialogVisible: false,
      isEditThreadTypeDialogVisible: false,
      isAddStocksDialogVisible: false,
    };
  },
  methods: {
    async fetchBrands() {
      const response = await getBrands();
      this.brands = response || [];
    },

    async fetchThreadTypeDetails() {
      try {
        const response = await getThreadTypes(this.selectedBrand);
        this.threadTypes = response || [];
        const tireDetails = response
          .map((tire) => tire.detail)
          .filter((detail) => detail !== null);
        const mergedDetails = tireDetails.reduce(
          (acc, curr) => acc.concat(curr),
          []
        );
        this.threadVariants = mergedDetails;
      } catch (error) {
        console.error(error);
      }
    },

    async searchThreadType() {
      let response;
      if (this.searchValue) {
        response = await searchThreadTypes(this.searchValue);
        const tireDetails = response
          .map((tire) => tire.detail)
          .filter((detail) => detail !== null);
        const mergedDetails = tireDetails.reduce(
          (acc, curr) => acc.concat(curr),
          []
        );
        this.threadVariants = mergedDetails;
      } else {
        this.fetchThreadTypeDetails();
      }
    },

    debouncedSearchThreadType: _.debounce(function () {
      this.searchThreadType();
    }, 300),

    async addThreadTypeDetailFile(event) {
      this.isUploading = true;
      const file = event.files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        await addThreadTypeDetails(formData);
        this.fetchThreadTypeDetails();
      } catch (error) {
        console.error("Failed to upload excel file: ", error);
      } finally {
        this.isUploading = false;
      }
    },

    deleteMultipleVariants() {
      let variantsToDelete;
      variantsToDelete = this.selectedProduct.map((item) => item.id);
      this.$confirm.require({
        message: "Are you sure you want to delete?",
        header: "Delete",
        icon: "pi pi-exclamation-triangle",
        rejectLabel: "No",
        acceptLabel: "Yes",
        accept: async () => {
          try {
            await deleteThreadTypeDetails({ ids: variantsToDelete });
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Success",
              life: 3000,
            });
            this.fetchThreadTypeDetails();
          } catch (error) {
            console.error(error);
            this.$toast.add({
              severity: "error",
              summary: "error",
              detail: "Error",
              life: 3000,
            });
          }
        },
        reject: () => {},
      });
    },

    deleteVariant(id) {
      this.$confirm.require({
        message: "Are you sure you want to delete?",
        header: "Delete",
        icon: "pi pi-exclamation-triangle",
        rejectLabel: "No",
        acceptLabel: "Yes",
        accept: async () => {
          try {
            await deleteThreadTypeDetail(id);
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Success",
              life: 3000,
            });
            this.fetchThreadTypeDetails();
          } catch (error) {
            console.error(error);
            this.$toast.add({
              severity: "error",
              summary: "error",
              detail: "Error",
              life: 3000,
            });
          }
        },
        reject: () => {},
      });
    },

    handleSuccess() {
      this.isAddThreadVariantDialogVisible = false;
      this.isEditThreadTypeDialogVisible = false;
      this.isAddStocksDialogVisible = false;
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Success",
        life: 3000,
      });
      this.fetchThreadTypeDetails();
    },
  },
  mounted() {
    this.fetchBrands();
    this.fetchThreadTypeDetails();
  },
};
</script>
