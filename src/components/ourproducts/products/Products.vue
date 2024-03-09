<template>
  <ProductDialog
    v-if="isProductDialogVisible"
    :isVisible="isProductDialogVisible"
    :product="selectedProduct"
    @close="
      () => {
        isProductDialogVisible = false;
      }
    "
  />
  <div class="products">
    <div class="header">
      <h1>Our Products</h1>
      <p>Discover the Grip of Prinx and the Radiance of Sunny</p>
    </div>
    <div class="dropdown-container">
      <label>Filter</label>
      <Dropdown
        v-model="selectedBrand"
        :options="brands"
        placeholder="Select a Brand"
        class="dropdown-brands"
      />
    </div>

    <div class="products-wrap wrap">
      <ProductCard
        v-for="product in products"
        :key="product.name"
        :product="product"
        @click="
          () => {
            if (accessToken) {
              isProductDialogVisible = true;
              selectedProduct = product;
            } else this.$router.push('/login');
          }
        "
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard/ProductCard.vue";
import ProductDialog from "../dialogs/ProductDialog.vue";
export default {
  components: { ProductCard, ProductDialog },
  data() {
    return {
      products: [
        {
          name: "HiRACE HZ2 A/S",
          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219671/prinx/HiRace_mzycjm.png",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "HiCITY HH2",

          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219704/prinx/HiCity_o1bbmu.png",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "HiCOUNTRY HT2",

          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219738/prinx/HiCountry-HT2_zpkvy0.png",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "HiCOUNTRY HA2",

          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219771/prinx/HiCountry-HA2_kzbxnr.png",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "HiCOUNTRY HM1",

          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219800/prinx/HiCountry-HM1_udjpf9.png",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "HiFREE HV1",
          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219883/prinx/HiFree_ztoqvq.jpg",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "SUNNY HZ2 A/S",

          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219671/prinx/HiRace_mzycjm.png",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "SUNNY HH2",

          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219704/prinx/HiCity_o1bbmu.png",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "SUNNY HT2",

          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219738/prinx/HiCountry-HT2_zpkvy0.png",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "SUNNY HA2",

          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219771/prinx/HiCountry-HA2_kzbxnr.png",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "SUNNY HM1",

          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219800/prinx/HiCountry-HM1_udjpf9.png",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
        {
          name: "SUNNY HV1",

          price: 15000,
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219883/prinx/HiFree_ztoqvq.jpg",
          rating: 5,
          description:
            "<ul><li>Closed and Rigid shoulder design to help eliminate abnormal wear.</li><li>NBC (Nano Blend Compound) technology is used to ensure the consistency of product performance throughout the life cycle, to suppress performance degradation, and to balance the braking, wear, and durability of tires throughout the life cycle.</li><li>Unique tread design and dense siping for enhanced wet traction and braking.</li><li>Pattern design easily evacuates water to reduce hydroplaning and improve wet handling performance.</li><li>Application of PNS (Pattern Noise Simulation) technology for reduced road noise and quieter ride.</li><li>Asymmetrical tread pattern improves handling at highway speeds for enhanced performance.</li><li>Four wide asymmetrical grooves improve traction and handling in wet conditions.</li></ul>",
        },
      ],
      brands: ["All", "Prinx", "Sunny"],
      selectedBrand: null,
      selectedProduct: null,
      isProductDialogVisible: false,
      accessToken: localStorage.getItem("token"),
    };
  },
};
</script>

<style></style>
