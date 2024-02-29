<template>
  <div class="home col">
    <Hero />
    <Promotions />
    <Brands />
  </div>
</template>
<script>
import Hero from "@/components/home/section/Hero/Hero.vue";
import Promotions from "@/components/home/section/Promotions/Promotions.vue";
import Brands from "@/components/home/section/Brands/Brands.vue";

export default {
  components: { Hero, Promotions, Brands },
};
</script>
