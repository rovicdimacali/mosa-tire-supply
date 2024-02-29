<template>
  <div class="products-preview">
    <Carousel
      :value="products"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
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
                <p>{{ slotProps.data.name }}</p>
                <div class="actions row">
                  <Button icon="pi pi-heart" severity="secondary" outlined />
                  <Button icon="pi pi-shopping-cart" class="ml-2" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </template>
    </Carousel>
  </div>
</template>

<script>
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
    };
  },

  mounted() {
    this.products = this.prinxProducts;
  },
};
</script>

<style></style>
