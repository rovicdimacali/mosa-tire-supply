<template>
  <div class="promotions row">
    <div v-for="promo in promos" :key="promo.title" class="promo row">
      <lord-icon
        :src="promo.icon"
        trigger="loop"
        delay="500"
        colors="primary:#1b014a"
        style="width: 50px; height: 50px; color: rgb(90, 90, 90)"
      >
      </lord-icon>
      <div class="promo-details col">
        <p>{{ promo.title }}</p>
        <small>{{ promo.description }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      promos: [
        {
          icon: "https://cdn.lordicon.com/mwikjdwh.json",
          title: "Fast Transaction",
          description:
            "Experience the speed of service like never before! Swift transactions ensure you get back on the road in no time. Because we value your time as much as you do.",
        },
        {
          icon: "https://cdn.lordicon.com/oqdmuxru.json",
          title: "Guaranteed Quality",
          description:
            "Drive with confidence! Our tires are a testament to uncompromising quality. You're not just buying tires; you're investing in safety and performance.",
        },
        {
          icon: "https://cdn.lordicon.com/mfmkufkr.json",
          title: "Quick Delivery",
          description:
            "Need tires in a hurry? We've got you covered. Enjoy doorstep delivery that's as quick as our service. Get ready to hit the road with convenience at your doorstep.",
        },
      ],
    };
  },
};
</script>

<style></style>
