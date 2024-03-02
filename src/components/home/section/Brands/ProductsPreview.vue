<template>
  <div class="products-preview col">
    <Carousel
      :value="products"
      :numVisible="4"
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
                <Image :src="slotProps.data.imageSrc" preview />
              </div>
              <div class="item-details row">
                <div class="col">
                  <p>{{ slotProps.data.name }}</p>
                  <small>Prinx</small>
                </div>

                <div class="actions row">
                  <Button icon="pi pi-shopping-cart" class="ml-2" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </template>
    </Carousel>
    <Button label="Show More" class="show-more-btn" />
  </div>
</template>

<script>
import { EventBus } from "@/services/EventBus";

export default {
  data() {
    return {
      products: null,
      prinxProducts: [
        {
          name: "HiRACE HZ2 A/S",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219671/prinx/HiRace_mzycjm.png",
        },
        {
          name: "HiCITY HH2",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219704/prinx/HiCity_o1bbmu.png",
        },
        {
          name: "HiCOUNTRY HT2",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219738/prinx/HiCountry-HT2_zpkvy0.png",
        },
        {
          name: "HiCOUNTRY HA2",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219771/prinx/HiCountry-HA2_kzbxnr.png",
        },
        {
          name: "HiCOUNTRY HM1",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219800/prinx/HiCountry-HM1_udjpf9.png",
        },
        {
          name: "HiFREE HV1",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219883/prinx/HiFree_ztoqvq.jpg",
        },
      ],
      sunnyProducts: [
        {
          name: "SUNNY HZ2 A/S",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219671/prinx/HiRace_mzycjm.png",
        },
        {
          name: "SUNNY HH2",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219704/prinx/HiCity_o1bbmu.png",
        },
        {
          name: "SUNNY HT2",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219738/prinx/HiCountry-HT2_zpkvy0.png",
        },
        {
          name: "SUNNY HA2",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219771/prinx/HiCountry-HA2_kzbxnr.png",
        },
        {
          name: "SUNNY HM1",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219800/prinx/HiCountry-HM1_udjpf9.png",
        },
        {
          name: "SUNNY HV1",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219883/prinx/HiFree_ztoqvq.jpg",
        },
      ],
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

  mounted() {
    EventBus.on("brandSelected", (brand) => {
      this.products =
        brand.name === "Prinx" ? this.prinxProducts : this.sunnyProducts;
    });
    this.products = this.prinxProducts;
  },
};
</script>

<style></style>
