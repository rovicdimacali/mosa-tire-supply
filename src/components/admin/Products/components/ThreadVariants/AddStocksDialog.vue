<template>
  <Dialog
    v-model:visible="localVisible"
    header="Add Thread Variant"
    :style="{ width: '60vw' }"
    modal
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="
      () => {
        this.$emit('close');
      }
    "
    class="add-variant-dialog"
  >
    <Message severity="error" v-if="isError">
      <ul v-if="isError && Array.isArray(isError)" class="error-list">
        <li v-for="(error, index) in isError" :key="index" class="error">
          {{ error }}
        </li>
      </ul>
      <small v-else-if="isError && !Array.isArray(isError)" class="error">{{
        isError
      }}</small>
    </Message>
    <Message severity="success" v-if="showMessageSuccess">
      <small>{{ showMessageSuccess }}</small>
    </Message>
    <form class="add-variant-form col" @submit.prevent="submitAddStocks">
      <div class="basic-inputs row">
        <div class="type-container col">
          <label for="stocks">Add Stocks</label>
          <InputNumber v-model="addStocksForm.stocks" />
        </div>
      </div>
    </form>
    <template #footer>
      <div class="actions row">
        <Button label="Cancel" @click="this.$emit('close')" />
        <Button
          type="submit"
          :loading="isLoading"
          label="Submit"
          severity="info"
          @click="submitAddStocks"
        />
      </div>
    </template>
  </Dialog>
</template>
<script>
import { addStocks } from "@/services/Admin/Products";

export default {
  props: ["isVisible", "variant"],
  data() {
    return {
      localVisible: true,
      loading: false,
      addStocksForm: {
        id: this.variant.id,
        stocks: null,
      },
      isError: null,
      showMessageSuccess: null,
      isLoading: false,
    };
  },
  methods: {
    async submitAddStocks() {
      this.isLoading = true;
      try {
        await addStocks(this.addStocksForm);
        this.$emit("success");
      } catch (error) {
        console.error(error);
        if (error.response.data.message.includes("Empty")) {
          this.isError = "Please complete the form before submitting.";
        } else {
          this.isError = error.response.data.message;
        }
      }
      this.isLoading = false;
    },
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
