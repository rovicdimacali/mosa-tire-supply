<template>
  <div class="cart-page">
    <div class="cart-col col">
      <div class="cart-contents col">
        <div class="cart-header row">
          <div class="header-title checkbox" style="width: 3%">
            <Checkbox
              v-model="selectAll"
              :binary="true"
              @change="handleSelectAll"
            />
          </div>
          <div class="header-title product" style="width: 35%">
            <p>Product</p>
          </div>
          <div class="header-title size" style="width: 15%">
            <p>Size</p>
          </div>
          <div class="header-title unit-price" style="width: 14%">
            <p>Unit Price</p>
          </div>
          <div class="header-title quantity" style="width: 7%">
            <p>Quantity</p>
          </div>
          <div class="header-title total-price" style="width: 15%">
            <p>Total Price</p>
          </div>
          <div class="header-title actions" style="width: 10%">
            <p>Actions</p>
          </div>
        </div>
        <div class="cart-items col">
          <div
            class="item row"
            v-for="item in cartItems"
            :key="item.cartOrderId"
          >
            <div class="item-info checkbox" style="width: 3%">
              <Checkbox
                v-model="selectedItems"
                :inputId="item.cartOrderId"
                :value="item"
              />
            </div>
            <div class="item-info product row" style="width: 35%">
              <Image :src="item.imageUrl" />
              <div class="product-info col">
                <p>{{ item.details.threadType }}</p>
                <small
                  >Size: {{ item.details.width }}/{{
                    item.details.aspectRatio
                  }}/{{ item.details.diameter }}</small
                >
                <small>Qty: {{ item.quantity }}</small>
                <small
                  >Total Price: Php
                  {{ item.totalPrice.toLocaleString() }}</small
                >
              </div>
            </div>
            <div class="item-info size" style="width: 15%">
              <p>
                {{ item.details.width }}/{{ item.details.aspectRatio }}/{{
                  item.details.diameter
                }}
              </p>
            </div>
            <div class="item-info unit-price" style="width: 14%">
              <p>Php {{ item.details.price.toLocaleString() }}</p>
            </div>
            <div class="item-info quantity" style="width: 7%">
              <p>{{ item.quantity }}</p>
            </div>
            <div class="item-info total-price" style="width: 15%">
              <p>Php {{ item.totalPrice.toLocaleString() }}</p>
            </div>
            <div class="item-info actions" style="width: 10%">
              <Button
                icon="pi pi-trash"
                severity="danger"
                rounded
                raised
                @click="deleteFromCart(item)"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="order-container row">
        <div class="checkout-col col">
          <p>CHECKOUT OPTIONS</p>
          <div v-if="isOnlineOrder" class="checkout-option col">
            <p>Online Order</p>
            <small
              >We require 50% downpayment upon checkout of the selected
              items.</small
            >
          </div>
          <div v-if="isKioskOrder" class="checkout-option col">
            <p>Kiosk Order</p>
            <small
              >We will provide you a queuing number upon checkout of the
              selected items.</small
            >
          </div>
        </div>
        <div class="cost-action col">
          <small>Total:</small>
          <p>Php {{ totalCost ? totalCost?.toLocaleString() : 0 }}</p>
          <Button
            label="Proceed"
            class="proceed-btn"
            @click="checkoutItems"
            :disabled="checkSelectedItems"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCartItems,
  getKioskCart,
  checkoutCartItems,
  removeCartItem,
  deleteKioskOrder,
  checkoutKioskOrder,
} from "@/services/Products/Products";
export default {
  data() {
    return {
      selectAll: false,
      selectedItems: null,
      cartItems: null,
      selectedOption: null,
      checkoutOptions: [
        {
          id: "orderNow",
          option: "Order Now, Pick Up Later",
          description: "Downpayment is needed.",
        },
        {
          id: "kiosk",
          option: "Kiosk Ordering",
          description: "Order onsite to queue your order.",
        },
      ],
      isKioskOrder: false,
      isOnlineOrder: false,
      isDisabled: false,
      checkouts: null,
    };
  },
  computed: {
    totalCost() {
      return this.selectedItems?.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },
    checkSelectedItems() {
      if (this.selectedItems === null) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    handleSelectAll() {
      if (this.selectAll) {
        this.selectedItems = [...this.cartItems];
      } else {
        this.selectedItems = [];
      }
    },

    async fetchCart() {
      try {
        if (localStorage.getItem("token")) {
          const response = await getCartItems();
          this.cartItems = response || [];
        } else if (localStorage.getItem("kioskToken")) {
          const response = await getKioskCart();
          this.cartItems = response || [];
        }

        this.selectedItems = this.cartItems.map((item) => item);
        if (this.selectedItems.length !== 0) {
          this.selectAll = true;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async deleteFromCart(item) {
      try {
        if (localStorage.getItem("token")) {
          await removeCartItem(item.cartOrderId);
        } else if (localStorage.getItem("kioskToken")) {
          await deleteKioskOrder(item.kioskId);
        }
        this.fetchCart();
      } catch (error) {
        console.error(error);
      }
    },

    async checkoutItems() {
      try {
        if (localStorage.getItem("token")) {
          const itemArray = this.selectedItems.map((item) => item.cartOrderId);
          const response = await checkoutCartItems({ ids: itemArray });
          if (response && response.carts.length > 0) {
            this.$router.push({
              name: "Checkout",
              query: {
                checkouts: btoa(JSON.stringify(response)),
              },
            });
          }
        } else if (localStorage.getItem("kioskToken")) {
          const itemArray = this.selectedItems.map((item) => item.kioskId);
          const response = await checkoutKioskOrder({ ids: itemArray });
          if (response && response.kiosks.length > 0) {
            this.$router.push({
              name: "Queuing",
              query: {
                checkouts: btoa(JSON.stringify(response)),
              },
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },

  watch: {
    selectedItems: {
      handler(newSelectedItems) {
        if (newSelectedItems.length === this.cartItems.length) {
          this.selectAll = true;
        } else {
          this.selectAll = false;
        }
      },
      deep: true,
    },
  },

  mounted() {
    this.fetchCart();
    if (localStorage.getItem("token")) {
      this.isOnlineOrder = true;
    } else if (localStorage.getItem("kioskToken")) {
      this.isKioskOrder = localStorage.getItem("kioskToken");
    }
  },
};
</script>

<style></style>
