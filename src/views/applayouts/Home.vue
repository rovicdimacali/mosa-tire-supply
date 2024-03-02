<template>
  <div class="home col">
    <Hero />
    <Promotions />
    <Brands />
    <Pickup />
    <Footer />
  </div>
</template>
<script>
import Hero from "@/components/home/section/Hero/Hero.vue";
import Promotions from "@/components/home/section/Promotions/Promotions.vue";
import Brands from "@/components/home/section/Brands/Brands.vue";
import Pickup from "@/components/home/section/Pickup/Pickup.vue";
import Footer from "@/components/home/section/Footer/Footer.vue";

export default {
  components: { Hero, Promotions, Brands, Pickup, Footer },
};
</script>
