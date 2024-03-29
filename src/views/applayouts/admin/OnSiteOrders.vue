<template>
  <Toast />
  <ProductDialog
    v-if="isProductDialogVisible"
    :isVisible="isProductDialogVisible"
    :product="selectedProduct"
    :isOnsite="true"
    @close="
      () => {
        isProductDialogVisible = false;
      }
    "
    @success="handleSuccess"
  />
  <div class="onsite-ordering-page">
    <div class="onsite-ordering col">
      <h1>Onsite Ordering</h1>
      <div v-if="!token" class="start-btn-container">
        <Button
          :loading="isLoading"
          label="Start Order"
          @click="startOnsiteOrder"
        />
      </div>
      <div v-else class="col" style="gap: 100px">
        <div class="products">
          <div class="dropdown-container">
            <label>Filter</label>
            <Dropdown
              v-model="selectedBrand"
              :options="brands"
              optionLabel="name"
              optionValue="name"
              placeholder="Select a Brand"
              class="dropdown-brands"
            />
          </div>

          <div class="products-wrap wrap">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @click="showProductDetails(product)"
            />
          </div>
        </div>
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
                    @click="removeOrder(item)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="order-container row">
            <div class="checkout-col col"></div>
            <div class="cost-action col">
              <small>Total:</small>
              <p>Php {{ totalCost ? totalCost?.toLocaleString() : 0 }}</p>
              <div class="row" style="gap: 5px">
                <Button
                  label="Cancel"
                  class="proceed-btn"
                  @click="checkout"
                  severity="secondary"
                />
                <Button label="Proceed" class="proceed-btn" @click="cancel" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBrands, getThreadTypes } from "@/services/Admin/Products";
import ProductCard from "@/components/ourproducts/products/ProductCard/ProductCard.vue";
import ProductDialog from "@/components/ourproducts/dialogs/ProductDialog.vue";
import {
  startOrder,
  getCurrentOrders,
  deleteOrder,
  cancelOrders,
  checkoutOrders,
} from "@/services/Admin/OnSiteOrdering";
export default {
  components: {
    ProductCard,
    ProductDialog,
  },
  data() {
    return {
      token: null,
      isLoading: false,
      products: null,
      brands: null,
      selectedBrand: "",
      selectedProduct: null,
      isProductDialogVisible: false,
      cartItems: null,
      selectAll: true,
      selectedItems: null,
    };
  },

  methods: {
    async startOnsiteOrder() {
      try {
        this.isLoading = true;
        await startOrder();
        localStorage.setItem("onsiteToken", "onsiteToken123");
        this.token = localStorage.getItem("onsiteToken");
        this.fetchBrands();
        this.fetchThreadTypes();
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    handleSuccess() {
      this.isProductDialogVisible = false;
      this.fetchCurrentOrders();
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Item added to order",
        life: 3000,
      });
    },

    showProductDetails(product) {
      this.isProductDialogVisible = true;
      this.selectedProduct = product;
    },

    async fetchBrands() {
      try {
        const response = await getBrands();
        this.brands = response || [];
      } catch (error) {
        console.error(error);
      }
    },

    async fetchThreadTypes() {
      try {
        const response = await getThreadTypes(this.selectedBrand);
        this.products = response || [];
      } catch (error) {
        console.error(error);
      }
    },

    async fetchCurrentOrders() {
      try {
        const response = await getCurrentOrders();
        this.cartItems = response || [];

        if (this.selectAll) {
          this.selectedItems = this.cartItems ? [...this.cartItems] : null;
        } else {
          this.selectedItems = [];
        }
      } catch (error) {}
    },

    async removeOrder(item) {
      try {
        await deleteOrder(item.orderId);
        this.fetchCurrentOrders();
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Item deleted from order",
          life: 3000,
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
    },

    async checkout() {
      try {
        const itemArray = this.selectedItems.map((item) => item.orderId);
        await checkoutOrders({ ids: itemArray });
        localStorage.removeItem("onsiteToken");
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Order Complete",
          life: 3000,
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error Occured",
          life: 3000,
        });
      }
    },

    async cancel() {
      try {
        const itemArray = this.selectedItems.map((item) => item.orderId);
        await checkoutOrders({ ids: itemArray });
        localStorage.removeItem("onsiteToken");
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Order Cancelled",
          life: 3000,
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error Occured",
          life: 3000,
        });
      }
    },
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

  mounted() {
    this.token = localStorage.getItem("onsiteToken")
      ? localStorage.getItem("onsiteToken")
      : null;
    if (this.token) {
      this.fetchBrands();
      this.fetchThreadTypes();
      this.fetchCurrentOrders();
    }
  },
};
</script>

<style></style>
