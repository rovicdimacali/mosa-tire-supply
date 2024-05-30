<template>
  <div class="brands col">
    <div class="brand-heading col">
      <h1>Our Brands</h1>
      <small>Click on a brand to filter the products.</small>
    </div>

    <div class="brand-row wrap">
      <div
        v-for="brand in brands"
        :key="brand.id"
        :class="{
          'image-container': true,
          active: brand.id === selectedBrand.id,
        }"
        @click="selectBrand(brand)"
      >
        <img :src="brand.imageUrl" alt="mosa-tire-shop-brands" />
      </div>
    </div>
    <ProductsPreview :brand="selectedBrand" />
  </div>
</template>

<script>
import { getBrands } from "@/services/Admin/Products";
import ProductsPreview from "./ProductsPreview.vue";
import { EventBus } from "@/services/EventBus";
export default {
  components: { ProductsPreview },
  data() {
    return {
      brands: null,
      selectedBrand: null,
    };
  },

  methods: {
    selectBrand(brand) {
      this.selectedBrand = brand;
      EventBus.emit("brand change", this.selectedBrand);
    },

    async fetchBrands() {
      try {
        const response = await getBrands();
        this.brands = response || [];
        this.selectedBrand = this.brands[0];
        EventBus.emit("brand change", this.selectedBrand);
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.fetchBrands();
  },
};
</script>
