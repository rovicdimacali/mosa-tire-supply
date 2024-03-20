<template>
  <Toast />
  <Dialog
    v-model:visible="localVisible"
    header="Order Type"
    :style="{ width: '60vw' }"
    modal
    @hide="
      () => {
        this.$emit('close');
      }
    "
    class="order-type-dialog"
  >
    <div class="order-type-options row">
      <div class="radio-row row">
        <RadioButton
          v-model="orderType"
          inputId="online"
          name="Online"
          value="Online"
        />
        <label for="online" class="ml-2">Online</label>
      </div>
      <div class="radio-row row">
        <RadioButton
          v-model="orderType"
          inputId="kiosk"
          name="Kiosk"
          value="Kiosk"
        />
        <label for="kiosk" class="ml-2">Kiosk</label>
      </div>
    </div>
    <template #footer>
      <div class="actions row">
        <Button label="Cancel" @click="this.$emit('close')" />
        <Button
          label="Submit"
          severity="info"
          @click="handleSubmit"
          :disabled="orderType === null"
        />
      </div>
    </template>
  </Dialog>
</template>
<script>
import {
  addItemToCart,
  startKioskOrder,
  addKioskItemToCart,
} from "@/services/Products/Products";
export default {
  props: ["isVisible", "cartOrOrder", "item"],
  data() {
    return {
      localVisible: true,
      orderType: null,
      isLoading: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      switch (this.cartOrOrder) {
        case "cart":
          if (this.orderType === "Online") {
            if (localStorage.getItem("token") !== null) {
              try {
                await addItemToCart(this.item);
                this.$emit("success");
              } catch (error) {
                this.$toast.add({
                  severity: "error",
                  summary: "Error",
                  detail: "Error Occured",
                  life: 3000,
                });
              } finally {
                this.isLoading = false;
              }
            } else {
              localStorage.setItem("orderForm", this.item);
              setTimeout(() => {
                this.$toast.add({
                  severity: "info",
                  summary: "Info",
                  detail:
                    "You have to be logged in first before viewing a product.",
                  life: 3000,
                });
              }, 50);
              this.$router.push("/login");
            }
          } else if (this.orderType === "Kiosk") {
            try {
              if (localStorage.getItem("kioskToken") === null) {
                const response = await startKioskOrder();
                localStorage.setItem("kioskToken", response.kioskNumber);
              }
              await addKioskItemToCart(this.item);
              this.$emit("success");
            } catch (error) {
              console.error(error);
              this.$toast.add({
                severity: "error",
                summary: "Error",
                detail: "Error Occured",
                life: 3000,
              });
            } finally {
              this.isLoading = false;
            }
          }
          break;
        case "order":
          switch (orderType) {
            case "Online":
              break;
            case "Kiosk":
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.localVisible = this.isVisible;
    console.log(this.item);
    console.log(this.cartOrOrder);
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
