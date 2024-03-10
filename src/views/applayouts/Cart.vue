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
          <div class="item row" v-for="(item, index) in items" :key="index">
            <div class="item-info checkbox" style="width: 3%">
              <Checkbox
                v-model="selectedItems"
                :inputId="index"
                :value="item"
              />
            </div>
            <div class="item-info product row" style="width: 35%">
              <Image :src="item.imageSrc" />
              <div class="product-info col">
                <p>{{ item.threadType }}</p>
                <small
                  >Size: {{ item.width }}/{{ item.aspectRatio }}/{{
                    item.diameter
                  }}</small
                >
                <small>Qty: {{ item.quantity }}</small>
                <small
                  >Total Price: Php
                  {{ item.totalPrice.toLocaleString() }}</small
                >
              </div>
            </div>
            <div class="item-info size" style="width: 15%">
              <p>{{ item.width }}/{{ item.aspectRatio }}/{{ item.diameter }}</p>
            </div>
            <div class="item-info unit-price" style="width: 14%">
              <p>Php {{ item.unit_price.toLocaleString() }}</p>
            </div>
            <div class="item-info quantity" style="width: 7%">
              <p>{{ item.quantity }}</p>
            </div>
            <div class="item-info total-price" style="width: 15%">
              <p>Php {{ item.totalPrice.toLocaleString() }}</p>
            </div>
            <div class="item-info actions" style="width: 10%">
              <Button icon="pi pi-trash" severity="danger" rounded raised />
            </div>
          </div>
        </div>
      </div>
      <div class="order-container row">
        <div class="checkout-col col">
          <p>CHECKOUT OPTIONS</p>
          <div
            v-for="checkoutOption in checkoutOptions"
            :key="checkoutOption.id"
            class="checkout-option row"
          >
            <RadioButton
              v-model="selectedOption"
              :inputId="checkoutOption.id"
              :value="checkoutOption"
            />
            <div class="col">
              <label :for="checkoutOption.id" class="col"
                >{{ checkoutOption.option }}
                <small>
                  {{ checkoutOption.description }}
                </small>
              </label>
            </div>
          </div>
        </div>
        <div class="cost-action col">
          <small>Total:</small>
          <p>Php {{ totalCost ? totalCost?.toLocaleString() : 0 }}</p>
          <Button label="Proceed" class="proceed-btn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
        },
      ],
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
    };
  },
  computed: {
    totalCost() {
      return this.selectedItems?.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
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
  },
  watch: {
    selectedItems(newItems) {
      console.log("Selected Items:", newItems);
    },
  },
};
</script>

<style></style>
