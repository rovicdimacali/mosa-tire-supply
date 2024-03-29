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
            :loading="isLoading"
            label="Proceed"
            class="proceed-btn"
            :disabled="isDisabled"
            @click="onPayCheckout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckoutSuccessDialog from "@/components/ourproducts/dialogs/CheckoutSuccessDialog.vue";
import { cancelCheckout, payCheckout } from "@/services/Products/Products";
export default {
  components: { CheckoutSuccessDialog },
  props: ["checkouts"],
  data() {
    return {
      selectAll: false,
      selectedItems: null,
      selectedOption: null,
      options: ["Gcash", "BPI"],
      selectedPaymentMethod: "Gcash",
      isDisabled: true,
      isKioskOrder: false,
      isOnlineOrder: false,
      isSuccessDialogVisible: false,
      checkouts: null,
      referenceNumber: null,
      isLoading: false,
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

    async onPayCheckout() {
      this.isLoading = true;
      const itemArray = this.checkouts.carts.map((item) => item.cartOrderId);
      try {
        await payCheckout({
          refNo: this.referenceNumber,
          paymentMethod: this.selectedPaymentMethod,
          ids: itemArray,
        });
        this.isSuccessDialogVisible = true;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
  },

  mounted() {
    this.checkouts = JSON.parse(atob(this.$route.query.checkouts));
    if (localStorage.getItem("token")) {
      this.isOnlineOrder = true;
    } else if (localStorage.getItem("kioskToken")) {
      this.isKioskOrder = localStorage.getItem("kioskToken");
    }

    window.addEventListener("beforeunload", this.onCancelCheckout);
  },

  unmounted() {
    this.onCancelCheckout;
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.onCancelCheckout);
  },
};
</script>

<style></style>
