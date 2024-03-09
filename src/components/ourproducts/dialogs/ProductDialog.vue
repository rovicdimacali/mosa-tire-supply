<template>
  <Toast />
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
        <Image :src="product?.imageSrc" />
      </div>
      <div class="product-content col">
        <h1>{{ product?.name }}</h1>
        <div class="price-rating row">
          <p>Php {{ product?.price.toLocaleString() }}</p>
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
      width: ["22", "24", "28"],
      aspectRatio: ["22", "24", "28"],
      diameter: ["22", "24", "28"],
      selectedWidth: null,
      selectedAspectRatio: null,
      selectedDiameter: null,
      quantity: null,
    };
  },
  mounted() {
    this.localVisible = this.isVisible;
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
