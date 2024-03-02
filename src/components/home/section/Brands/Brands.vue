<template>
  <div class="brands col">
    <div class="brand-heading col">
      <h1>Our Brands</h1>
      <small>Click on a brand to filter the products.</small>
    </div>

    <div class="brand-row row">
      <div
        v-for="image in imageSrc"
        :key="image.id"
        :class="{ 'image-container': true, active: image.id === selectedBrand }"
        @click="selectBrand(image)"
      >
        <img :src="image.src" alt="mosa-tire-shop-brands" />
      </div>
    </div>
    <ProductsPreview />
  </div>
</template>

<script>
import ProductsPreview from "./ProductsPreview.vue";
import { EventBus } from "@/services/EventBus";
export default {
  components: { ProductsPreview },
  data() {
    return {
      imageSrc: [
        {
          id: 1,
          name: "Prinx",
          src: "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709216831/mosawebapp/brands/prinx_square_2_ca8rvl.png",
        },
        {
          id: 2,
          name: "Sunny",
          src: "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709216828/mosawebapp/brands/sunny_square_1_wjospn.png",
        },
      ],
      selectedBrand: null,
    };
  },

  mounted() {
    this.selectedBrand = this.imageSrc[0].id;
  },

  methods: {
    selectBrand(image) {
      this.selectedBrand = image.id;
      EventBus.emit("brandSelected", image);
    },
  },
};
</script>
