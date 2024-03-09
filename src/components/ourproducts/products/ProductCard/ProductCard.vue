<template>
  <Card class="product-card">
    <template #content>
      <Image :src="product?.imageSrc" class="product-img" />
      <div class="product-details col">
        <p>{{ product?.name }}</p>
        <small>Php {{ product?.price.toLocaleString() }}</small>
      </div>
      <div class="actions row">
        <Rating
          v-model="product.rating"
          readonly
          :cancel="false"
          class="rating"
        />
        <Button icon="pi pi-cart-plus" rounded text class="add-to-cart-btn" />
      </div>
    </template>
  </Card>
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style></style>
