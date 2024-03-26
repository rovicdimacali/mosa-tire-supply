<template>
  <OrderTypeDialog
    v-if="isOrderTypeDialogVisible"
    :isVisible="isOrderTypeDialogVisible"
    :item="orderForm"
    :cartOrOrder="cartOrOrder"
    @close="
      () => {
        isOrderTypeDialogVisible = false;
      }
    "
    @success="
      () => {
        isOrderTypeDialogVisible = false;
        this.$emit('success');
      }
    "
  />
  <Dialog
    v-model:visible="localVisible"
    header="Product Details"
    :style="{ width: '60vw' }"
    modal
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="
      () => {
        this.$emit('close');
      }
    "
    class="product-dialog"
  >
    <div class="product-container row">
      <div class="image-container">
        <Image :src="product?.imageUrl" />
      </div>
      <div class="product-content col">
        <h1>{{ product?.type }}</h1>
        <div class="price-rating row">
          <p>
            {{
              selectedPrice !== null
                ? `₱${selectedPrice?.toLocaleString()}`
                : `₱${product?.minPrice.toLocaleString()} - ₱${product?.maxPrice.toLocaleString()}`
            }}
          </p>
          <Rating
            v-model="product.rating"
            readonly
            :cancel="false"
            class="rating"
          />
        </div>
        <div class="inputs-container col">
          <div class="size-wrap wrap">
            <div class="size-inputs col">
              <label for="width">Width</label>
              <Dropdown
                id="width"
                v-model="orderForm.width"
                :options="width"
                filter
                placeholder="Width"
                class="w-full md:w-14rem"
                @change="handleAspectRatioSelection()"
              />
            </div>
            <div class="size-inputs col">
              <label for="aspectRatio">Aspect Ratio</label>
              <Dropdown
                id="aspectRatio"
                v-model="orderForm.aspectRatio"
                :options="aspectRatio"
                filter
                placeholder="Aspect Ratio"
                class="w-full md:w-14rem"
                :disabled="orderForm.width === null"
                @change="handleDiameterSelection()"
              />
            </div>
            <div class="size-inputs col">
              <label for="diameter">Rim Diameter</label>
              <Dropdown
                id="diameter"
                v-model="orderForm.diameter"
                :options="diameter"
                filter
                placeholder="Rim Diameter"
                class="w-full md:w-14rem"
                :disabled="orderForm.aspectRatio === null"
                @change="
                  () => {
                    handleSidewallSelection();
                    handlePlyRatingSelection();
                  }
                "
              />
            </div>
          </div>
          <div class="size-wrap wrap">
            <div class="size-inputs col">
              <label for="sidewall">Sidewall</label>
              <Dropdown
                id="sidewall"
                v-model="orderForm.sidewall"
                :options="sidewall"
                filter
                placeholder="Sidewall"
                class="w-full md:w-14rem"
                :disabled="orderForm.diameter === null"
                @change="handleSelectedPrice"
              />
            </div>
            <div class="size-inputs col">
              <label for="plyrating">Ply Rating</label>
              <Dropdown
                id="plyrating"
                v-model="orderForm.plyRating"
                :options="plyRating"
                filter
                placeholder="Ply Rating"
                class="w-full md:w-14rem"
                :disabled="orderForm.diameter === null"
                @change="handleSelectedPrice()"
              />
            </div>
          </div>
          <div class="size-wrap wrap" style="align-items: end">
            <div class="quantity-input col">
              <label for="quantity">Quantity</label>
              <InputNumber
                id="quantity"
                v-model="orderForm.quantity"
                showButtons
                buttonLayout="horizontal"
                :min="1"
                :max="99"
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </div>
            <div class="stocks">{{ stocks }} pcs.</div>
          </div>
        </div>
        <div v-html="product?.description"></div>
      </div>
    </div>
    <template #footer>
      <div class="actions row">
        <Button
          label="Add to Cart"
          @click="handleCartSubmit"
          :disabled="disableAddToCart"
        />
        <Button
          label="Order Now"
          severity="info"
          @click="orderNow"
          :disabled="disableOrderNow"
        />
      </div>
    </template>
  </Dialog>
</template>
<script>
import { addItemToCart, orderNowItems } from "@/services/Products/Products";
import OrderTypeDialog from "./OrderTypeDialog.vue";
export default {
  components: { OrderTypeDialog },
  props: ["isVisible", "product"],
  data() {
    return {
      localVisible: true,
      loading: false,
      orderForm: {
        threadType: this.product?.type,
        width: null,
        aspectRatio: null,
        diameter: null,
        sidewall: null,
        plyRating: null,
        quantity: 1,
      },
      selectedPrice: null,
      stocks: null,
      width: null,
      aspectRatio: null,
      diameter: null,
      sidewall: null,
      plyRating: null,
      cartOrOrder: null,
      isOrderTypeDialogVisible: false,
    };
  },
  computed: {
    disableOrderNow() {
      return (
        !this.orderForm.width ||
        !this.orderForm.aspectRatio ||
        !this.orderForm.diameter ||
        !this.orderForm.sidewall
      );
    },
    disableAddToCart() {
      return (
        !this.orderForm.width ||
        !this.orderForm.aspectRatio ||
        !this.orderForm.diameter ||
        !this.orderForm.sidewall
      );
    },
  },

  methods: {
    handleAspectRatioSelection() {
      // Find all items in this.product.detail where the width matches selectedWidth
      const matchingItems = this.product.detail.filter(
        (item) => item.width === this.orderForm.width
      );
      console.log(matchingItems);
      // If matching items are found, extract their aspectRatio values
      if (matchingItems.length > 0) {
        this.aspectRatio = matchingItems.flatMap((item) => item.aspectRatio);
      } else {
        // Handle case where no matching item is found
        console.error(
          `No item found with width equal to ${this.orderForm.width}`
        );
        // Reset aspectRatio if no matching item is found
        this.aspectRatio = [];
      }
    },

    handleDiameterSelection() {
      const matchingItems = this.product.detail.filter(
        (item) =>
          item.width === this.orderForm.width &&
          item.aspectRatio === this.orderForm.aspectRatio
      );
      if (matchingItems.length > 0) {
        // If there are multiple matching items, extract diameters from all items
        if (matchingItems.length > 1) {
          this.diameter = matchingItems.map((item) => item.diameter);
          // Flatten the array of diameters
          this.diameter = this.diameter.flat();
        } else {
          // If there's only one matching item, directly assign its diameter
          this.diameter = [matchingItems[0].diameter]; // Wrap diameter in an array
        }
      } else {
        console.error(
          `No item found with width equal to ${this.orderForm.width} and aspect ratio ${this.orderForm.aspectRatio}`
        );
        this.diameter = [];
      }
    },

    handleSidewallSelection() {
      const matchingItems = this.product.detail.filter(
        (item) =>
          item.width === this.orderForm.width &&
          item.aspectRatio === this.orderForm.aspectRatio &&
          item.diameter === this.orderForm.diameter
      );

      if (matchingItems.length > 0) {
        // If there are multiple matching items, extract diameters from all items
        if (matchingItems.length > 1) {
          this.sidewall = matchingItems.map((item) => item.sidewall);
          // Flatten the array of diameters
          this.sidewall = this.sidewall.flat();
        } else {
          // If there's only one matching item, directly assign its diameter
          this.sidewall = [matchingItems[0].sidewall]; // Wrap diameter in an array
        }
      } else {
        console.error(
          `No item found with width equal to ${this.orderForm.width}, aspect ratio ${this.orderForm.aspectRatio}, and ${this.orderForm.diameter}`
        );
        this.sidewall = [];
      }
    },

    handlePlyRatingSelection() {
      const matchingItems = this.product.detail.filter(
        (item) =>
          item.width === this.orderForm.width &&
          item.aspectRatio === this.orderForm.aspectRatio &&
          item.diameter === this.orderForm.diameter
      );
      if (matchingItems.length > 0) {
        if (matchingItems.length > 1) {
          this.plyRating = matchingItems.map((item) => item.plyRating);

          this.plyRating = this.plyRating.flat();
        } else if (
          matchingItems[0].plyRating === "" ||
          matchingItems[0].plyRating === null
        ) {
          this.plyRating = null;
        } else {
          this.plyRating = [matchingItems[0].plyRating];
        }
      } else {
        console.error(
          `No item found with width equal to ${this.orderForm.width}, aspect ratio ${this.orderForm.aspectRatio}, and ${this.orderForm.diameter}`
        );
        this.plyRating = [];
      }
    },

    handleSelectedPrice() {
      const matchingItems = this.product.detail.filter(
        (item) =>
          (item.width === this.orderForm.width &&
            item.aspectRatio === this.orderForm.aspectRatio &&
            item.diameter === this.orderForm.diameter &&
            item.sidewall === this.orderForm.sidewall) ||
          item.plyRating === this.orderForm.plyRating
      );
      this.selectedPrice = matchingItems[0].price;
    },

    handleSelectedPrice() {
      const matchingItems = this.product.detail.filter(
        (item) =>
          (item.width === this.orderForm.width &&
            item.aspectRatio === this.orderForm.aspectRatio &&
            item.diameter === this.orderForm.diameter &&
            item.sidewall === this.orderForm.sidewall) ||
          item.plyRating === this.orderForm.plyRating
      );
      this.stocks = matchingItems[0].stocks;
    },

    async handleCartSubmit() {
      const token = localStorage.getItem("token");
      if (token === null) {
        this.cartOrOrder = "cart";
        this.isOrderTypeDialogVisible = true;
      } else {
        try {
          await addItemToCart(this.orderForm);
          this.$emit("success");
        } catch (error) {
          console.error(error);
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error Occured",
            life: 3000,
          });
        }
      }
    },

    async orderNow() {
      const token = localStorage.getItem("token");
      if (token === null) {
        this.cartOrOrder = "cart";
        this.isOrderTypeDialogVisible = true;
      } else {
        try {
          const response = await orderNowItems(this.orderForm);
          this.$router.push({
            name: "Checkout",
            query: {
              checkouts: btoa(JSON.stringify(response)),
            },
          });
        } catch (error) {
          console.error(error);
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error Occured",
            life: 3000,
          });
        }
      }
    },
  },
  mounted() {
    this.localVisible = this.isVisible;
    console.log(this.product);
    this.width = [...new Set(this.product.detail.map((item) => item.width))];
  },
  watch: {
    isVisible(newVal) {
      this.localVisible = newVal;
    },
    localVisible(newVal) {
      this.$emit("update:isVisible", newVal);
    },
  },
};
</script>
