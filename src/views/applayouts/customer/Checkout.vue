<template>
  <CheckoutSuccessDialog
    v-if="isSuccessDialogVisible"
    :isVisible="isSuccessDialogVisible"
    @close="
      () => {
        isSuccessDialogVisible = false;
      }
    "
  />
  <div class="checkout-page">
    <div class="checkout-col col">
      <div class="checkout-header">
        <h3>CHECKOUT</h3>
      </div>
      <div class="checkout-content col">
        <div class="payments-container col">
          <SelectButton
            v-model="selectedPaymentMethod"
            :options="options"
            aria-labelledby="basic"
          />
          <Image
            :src="
              selectedPaymentMethod === 'Gcash'
                ? 'https://chrpphilippines.com/wp-content/uploads/2023/02/bsgc-gcash-qr.jpg'
                : 'https://www.yugatech.com/wp-content/uploads/2018/08/BPIQR_BPI-yugatech-ph.jpg'
            "
            class="image-container"
            imageStyle="width: 300px"
          />
        </div>
        <div class="items-container col">
          <div
            v-for="item in checkouts?.carts"
            :key="item.cartOrderId"
            class="items-row row"
          >
            <Image :src="item.imageUrl" class="image-container" />
            <div class="product-info col">
              <p>{{ item.threadType }}</p>
              <small
                >Size: {{ item.details.width }}/{{
                  item.details.aspectRatio
                }}/{{ item.details.diameter }}</small
              >
              <small>Qty: {{ item.quantity }}</small>
              <small
                >Total Price: Php {{ item.totalPrice.toLocaleString() }}</small
              >
            </div>
          </div>
        </div>
      </div>
      <div class="order-container row">
        <div class="checkout-details-col col">
          <label>Reference No.</label>
          <InputText
            v-model="referenceNumber"
            @input="handleCountCharReferenceNumber"
          />
        </div>
        <div class="cost-action col">
          <small>Downpayment:</small>
          <p>Php {{ checkouts?.priceToPay.toLocaleString() }}</p>
          <Button
            label="Proceed"
            class="proceed-btn"
            :disabled="isDisabled"
            @click="isSuccessDialogVisible = true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckoutSuccessDialog from "@/components/ourproducts/dialogs/CheckoutSuccessDialog.vue";
import { cancelCheckout } from "@/services/Products/Products";
export default {
  components: { CheckoutSuccessDialog },
  props: ["checkouts"],
  data() {
    return {
      selectAll: false,
      selectedItems: null,
      items: [
        {
          threadType: "HiCOUNTRY HT2",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219738/prinx/HiCountry-HT2_zpkvy0.png",
          width: "165",
          aspectRatio: "65",
          plyRating: "R13",
          unit_price: 4890,
          quantity: 1,
          totalPrice: 4890,
        },
        {
          threadType: "HiRACE HZ2 A/S",
          imageSrc:
            "https://res.cloudinary.com/dpm5vdakr/image/upload/v1709219671/prinx/HiRace_mzycjm.png",
          width: "165",
          aspectRatio: "65",
          plyRating: "R13",
          unit_price: 5200,
          quantity: 1,
          totalPrice: 5200,
          referenceNumber: "",
        },
      ],
      selectedOption: null,
      options: ["Gcash", "BPI"],
      selectedPaymentMethod: "Gcash",
      isDisabled: true,
      isKioskOrder: false,
      isOnlineOrder: false,
      isSuccessDialogVisible: false,
      checkouts: null,
    };
  },
  computed: {
    totalCost() {
      return this.items?.reduce((sum, item) => sum + item.totalPrice, 0) / 2;
    },
  },
  methods: {
    handleSelectAll() {
      if (this.selectAll) {
        this.selectedItems = [...this.items];
      } else {
        this.selectedItems = [];
      }
    },

    handleCountCharReferenceNumber() {
      if (this.referenceNumber?.length <= 10) this.isDisabled = true;
      else this.isDisabled = false;
    },

    async onCancelCheckout() {
      const itemArray = this.checkouts.carts.map((item) => item.cartOrderId);
      try {
        await cancelCheckout({ ids: itemArray });
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    selectedItems(newItems) {
      console.log("Selected Items:", newItems);
    },
  },
  mounted() {
    this.checkouts = JSON.parse(atob(this.$route.query.checkouts));
    if (localStorage.getItem("token")) {
      this.isOnlineOrder = true;
    } else if (localStorage.getItem("kioskToken")) {
      this.isKioskOrder = localStorage.getItem("kioskToken");
    }
  },
  unmounted() {
    this.onCancelCheckout();
  },
};
</script>

<style></style>
