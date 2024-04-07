<template>
  <div class="products-preview col">
    <Carousel
      :value="products"
      :numVisible="this.products?.length >= 4 ? 4 : this.products?.length"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="3000"
      :showNavigators="false"
      class="products-preview-carousel"
    >
      <template #item="slotProps">
        <Card class="item-card">
          <template #content>
            <div class="item col">
              <div class="image-container">
                <Image :src="slotProps.data.imageUrl" preview />
              </div>
              <div class="item-details row">
                <div class="col">
                  <p>{{ slotProps.data.type }}</p>
                  <small>{{ slotProps.data.brandName }}</small>
                </div>

                <div class="actions row">
                  <RouterLink to="/our-products"
                    ><Button icon="pi pi-shopping-cart" class="ml-2"
                  /></RouterLink>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </template>
    </Carousel>
    <RouterLink to="/our-products" class="show-more-btn"
      ><Button label="Show More"
    /></RouterLink>
  </div>
</template>

<script>
import { getThreadTypes } from "@/services/Admin/Products";
import { EventBus } from "@/services/EventBus";

export default {
  props: ["brand"],
  data() {
    return {
      products: null,
      responsiveOptions: [
        {
          breakpoint: "1400px",
          numVisible: 3,
          numScroll: 1,
        },
        {
          breakpoint: "1199px",
          numVisible: 3,
          numScroll: 1,
        },
        {
          breakpoint: "767px",
          numVisible: 2,
          numScroll: 1,
        },
        {
          breakpoint: "575px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },

  methods: {
    async fetchThreadTypes(brand) {
      try {
        const response = await getThreadTypes(brand.name);
        this.products = response || [];
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.fetchThreadTypes();
    EventBus.on("brand change", (brand) => {
      this.fetchThreadTypes(brand);
    });
  },
};
</script>

<style></style>
