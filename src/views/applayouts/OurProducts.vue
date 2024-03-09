<template>
  <div class="col">
    <div class="our-products row">
      <div class="products-container col"><Products /></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Products from "@/components/ourproducts/products/Products.vue";
import Footer from "@/components/home/section/Footer/Footer.vue";

export default {
  components: { Products, Footer },
};
</script>

<style></style>
