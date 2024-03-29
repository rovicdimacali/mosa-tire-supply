<template>
  <Toast />
  <ProductDialog
    v-if="isProductDialogVisible"
    :isVisible="isProductDialogVisible"
    :product="selectedProduct"
    @close="
      () => {
        isProductDialogVisible = false;
      }
    "
    @success="handleSuccess"
  />
  <div class="products">
    <div class="header">
      <h1>Our Products</h1>
      <p>Discover the Grip of our Tires.</p>
    </div>
    <div class="dropdown-container">
      <label>Filter</label>
      <Dropdown
        v-model="selectedBrand"
        :options="brands"
        optionLabel="name"
        optionValue="name"
        placeholder="Select a Brand"
        class="dropdown-brands"
      />
    </div>

    <div class="products-wrap wrap">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @click="showProductDetails(product)"
      />
    </div>
  </div>
</template>

<script>
import { getBrands, getThreadTypes } from "@/services/Admin/Products";
import ProductCard from "./ProductCard/ProductCard.vue";
import ProductDialog from "../dialogs/ProductDialog.vue";

export default {
  components: { ProductCard, ProductDialog },
  data() {
    return {
      products: null,
      brands: null,
      selectedBrand: "",
      selectedProduct: null,
      isProductDialogVisible: false,
      accessToken: localStorage.getItem("token"),
    };
  },
  methods: {
    handleSuccess() {
      this.isProductDialogVisible = false;
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Item added to cart",
        life: 3000,
      });
    },

    showProductDetails(product) {
      this.isProductDialogVisible = true;
      this.selectedProduct = product;
    },

    async fetchBrands() {
      try {
        const response = await getBrands();
        this.brands = response || [];
      } catch (error) {
        console.error(error);
      }
    },

    async fetchThreadTypes() {
      try {
        const response = await getThreadTypes(this.selectedBrand);
        this.products = response || [];
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchBrands();
    this.fetchThreadTypes();
  },
};
</script>

<style></style>
