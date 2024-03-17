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
    showProductDetails(product) {
      if (this.accessToken) {
        this.isProductDialogVisible = true;
        this.selectedProduct = product;
      } else {
        setTimeout(() => {
          this.$toast.add({
            severity: "info",
            summary: "Info",
            detail: "You have to be logged in first before viewing a product.",
            life: 3000,
          });
        }, 50);
        this.$router.push("/login");
      }
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
