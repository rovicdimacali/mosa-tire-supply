<template>
  <div class="hero">
    <div class="overlay">
      <div class="heading col">
        <h1>MOSA</h1>
        <Carousel
          :value="taglines"
          :numVisible="1"
          :numScroll="1"
          orientation="vertical"
          circular
          :autoplayInterval="3000"
          contentClass="flex"
          :showNavigators="false"
          :showIndicators="false"
          class="tagline-carousel"
        >
          <template #item="slotProps">
            <p>{{ slotProps.data.text }}</p>
          </template>
        </Carousel>
      </div>
      <div class="scroll-down col">
        <p>Scroll down for more</p>
        <i
          class="pi pi-angle-down fadeout animation-duration-1000 animation-iteration-infinite"
          style="fontsize: 2rem"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taglines: [
        {
          text: "Step into a world where your journey begins with precision and style",
        },
        { text: "Cruise in Style, Drive with Confidence" },
        { text: "Tires That Define Your Drive" },
        { text: "Engineered Excellence, Designed for You" },
        { text: "Style Without Sacrifice" },
      ],
    };
  },
};
</script>
