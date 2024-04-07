<template>
  <Dialog
    v-model:visible="localVisible"
    :style="{ width: '60vw' }"
    modal
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="
      () => {
        this.$emit('close');
      }
    "
    class="checkout-success-dialog"
  >
    <div class="checkout-success-col col">
      <Success :message="`Congratulations on your successful checkout!`" />
      <small>
        Thank you for choosing us! Your order is now being processed, and our
        dedicated team is working diligently to verify your payment.
      </small>
      <RouterLink to="/my-orders"><Button label="My Orders" /></RouterLink>
    </div>
  </Dialog>
</template>
<script>
import Success from "@/components/userAuth/Success.vue";
export default {
  components: { Success },
  props: ["isVisible"],
  data() {
    return {
      localVisible: true,
    };
  },

  methods: {},

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
