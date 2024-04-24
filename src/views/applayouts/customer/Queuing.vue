<template>
  <div class="queuing-page">
    <div v-if="!status" class="queuing-col col">
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
        <Button label="Cancel Order" @click="cancel" />
      </div>
    </div>
    <div v-else class="queuing-col col">
      <div class="queuing-content">
        <div class="queue-container col" style="text-align: center">
          <Success :message="`Congratulations on your successful purchase!`" />
          <small> Thank you for choosing us! </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  cancelKioskOrder,
  getKioskOrderStatus,
} from "@/services/Products/Products";
import Success from "@/components/userAuth/Success.vue";
export default {
  props: ["checkouts"],
  components: { Success },
  data() {
    return {
      checkouts: null,
      pollingInterval: null,
      status: false,
    };
  },

  methods: {
    async cancel() {
      try {
        await cancelKioskOrder();
        localStorage.removeItem("kioskToken");
        this.$router.push("/home");
      } catch (error) {
        console.error(error);
      }
    },

    async fetchKioskStatus() {
      try {
        const response = await getKioskOrderStatus();

        // After fetching items and updating the state, check if polling is needed
        if (!response) {
          // If there are items needing recheck, set up polling
          // Ensure previous polling is cleared to avoid multiple intervals
          if (this.pollingInterval) {
            clearTimeout(this.pollingInterval);
            this.pollingInterval = null;
          }

          // Set up a new polling interval
          this.pollingInterval = setTimeout(() => {
            this.fetchKioskStatus();
          }, 5000); // Adjust the delay as needed
        } else if (response) {
          this.status = response;
          // If no items need recheck and polling was set up, clear it
          clearTimeout(this.pollingInterval);
          this.pollingInterval = null;
          localStorage.removeItem("kioskToken");
        }
      } catch (error) {
        console.error(error);
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },
  },

  mounted() {
    this.checkouts = JSON.parse(atob(this.$route.query.checkouts));
    this.fetchKioskStatus();
  },
};
</script>

<style></style>
