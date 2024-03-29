<template>
  <div class="queuing-page">
    <div class="queuing-col col">
      <div class="queuing-header">
        <h3>DO NOT REFRESH THIS PAGE</h3>
      </div>
      <div class="queuing-content col">
        <div class="queue-container col">
          <h1 style="font-size: 50px">{{ checkouts?.queueingNumber }}</h1>
          <p style="text-align: center">
            Please wait for your number to be called and prepare
            <b>₱{{ checkouts?.priceToPay.toLocaleString() }}</b> for the payment
          </p>
        </div>
        <div class="items-container col">
          <div
            v-for="item in checkouts?.kiosks"
            :key="item.kioskId"
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
    </div>
  </div>
</template>

<script>
export default {
  props: ["checkouts"],
  data() {
    return {
      checkouts: null,
    };
  },

  mounted() {
    this.checkouts = JSON.parse(atob(this.$route.query.checkouts));
    localStorage.removeItem("kioskToken");
  },
};
</script>

<style></style>
