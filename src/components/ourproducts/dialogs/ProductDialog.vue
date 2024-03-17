<template>
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
                v-model="selectedWidth"
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
                v-model="selectedAspectRatio"
                :options="aspectRatio"
                filter
                placeholder="Aspect Ratio"
                class="w-full md:w-14rem"
                :disabled="selectedWidth === null"
                @change="handleDiameterSelection()"
              />
            </div>
            <div class="size-inputs col">
              <label for="diameter">Rim Diameter</label>
              <Dropdown
                id="diameter"
                v-model="selectedDiameter"
                :options="diameter"
                filter
                placeholder="Rim Diameter"
                class="w-full md:w-14rem"
                :disabled="selectedAspectRatio === null"
                @change="handleSelectedPrice"
              />
            </div>
          </div>
          <div class="quantity-input col">
            <label for="quantity">Quantity</label>
            <InputNumber
              id="quantity"
              v-model="quantity"
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
        </div>
        <div v-html="product?.description"></div>
      </div>
    </div>
    <template #footer>
      <div class="actions row">
        <Button label="Add to Cart" />
        <Button label="Order Now" severity="info" />
      </div>
    </template>
  </Dialog>
</template>
<script>
export default {
  props: ["isVisible", "product"],
  data() {
    return {
      localVisible: true,
      loading: false,
      width: null,
      aspectRatio: null,
      diameter: ["22", "24", "28"],
      selectedWidth: null,
      selectedAspectRatio: null,
      selectedDiameter: null,
      selectedPrice: null,
      quantity: 1,
    };
  },
  methods: {
    handleAspectRatioSelection() {
      // Find all items in this.product.detail where the width matches selectedWidth
      const matchingItems = this.product.detail.filter(
        (item) => item.width === this.selectedWidth
      );
      console.log(matchingItems);
      // If matching items are found, extract their aspectRatio values
      if (matchingItems.length > 0) {
        this.aspectRatio = matchingItems.flatMap((item) => item.aspectRatio);
      } else {
        // Handle case where no matching item is found
        console.error(
          `No item found with width equal to ${this.selectedWidth}`
        );
        // Reset aspectRatio if no matching item is found
        this.aspectRatio = [];
      }
    },
    handleDiameterSelection() {
      const matchingItems = this.product.detail.filter(
        (item) =>
          item.width === this.selectedWidth &&
          item.aspectRatio === this.selectedAspectRatio
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
          `No item found with width equal to ${this.selectedWidth} and aspect ratio ${this.selectedAspectRatio}`
        );
        this.diameter = [];
      }
    },

    handleSelectedPrice() {
      const matchingItems = this.product.detail.filter(
        (item) =>
          item.width === this.selectedWidth &&
          item.aspectRatio === this.selectedAspectRatio &&
          item.diameter === this.selectedDiameter
      );
      console.log(matchingItems);
      this.selectedPrice = matchingItems[0].price;
      console.log(this.selectedPrice);
    },
  },
  mounted() {
    this.localVisible = this.isVisible;
    console.log(this.product.detail);
    this.width = this.product.detail.map((item) => item.width);
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
