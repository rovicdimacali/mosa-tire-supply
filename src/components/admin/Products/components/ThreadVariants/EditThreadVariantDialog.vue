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
    <form class="add-variant-form col" @submit.prevent="submitAddBrand">
      <div class="basic-inputs row">
        <div class="type-container col">
          <label for="name">Thread Type</label>
          <Dropdown
            v-model="threadDetailsForm.threadType"
            :options="threadTypeArray"
            filter
            placeholder="Select a Thread Type"
            @change="fetchThreadTypes"
            class="dropdown"
          />
        </div>
        <div class="type-container col">
          <label for="width">Width</label>
          <InputText v-model="threadDetailsForm.width" />
        </div>
        <div class="type-container col">
          <label for="aspectRatio">Aspect Ratio</label>
          <InputText v-model="threadDetailsForm.aspectRatio" />
        </div>
        <div class="type-container col">
          <label for="diameter">Rim Diameter</label>
          <InputText v-model="threadDetailsForm.diameter" />
        </div>
      </div>
      <div class="basic-inputs row">
        <div class="type-container col">
          <label for="plyRating">Ply Rating</label>
          <InputText v-model="threadDetailsForm.plyRating" />
        </div>
        <div class="type-container col">
          <label for="sidewall">Sidewall</label>
          <InputText v-model="threadDetailsForm.sidewall" />
        </div>
        <div class="type-container col">
          <label for="price">Price</label>
          <InputNumber v-model="threadDetailsForm.price" />
        </div>
        <div class="type-container col">
          <label for="stocks">Stocks</label>
          <InputNumber v-model="threadDetailsForm.stocks" />
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
          @click="submitEditDetail"
        />
      </div>
    </template>
  </Dialog>
</template>
<script>
import { updateThreadTypeDetail } from "@/services/Admin/Products";

export default {
  props: ["isVisible", "threadTypes", "variant"],
  data() {
    return {
      localVisible: true,
      loading: false,
      threadTypeArray: null,
      threadDetailsForm: {
        threadType: this.variant.threadType,
        width: this.variant.width,
        aspectRatio: this.variant.aspectRatio,
        diameter: this.variant.diameter,
        plyRating: this.variant.plyRating,
        sidewall: this.variant.sidewall,
        price: this.variant.price,
        stocks: this.variant.stocks,
      },
      isError: null,
      showMessageSuccess: null,
      isLoading: false,
      isUploading: false,
    };
  },
  methods: {
    async submitEditDetail() {
      this.isLoading = true;
      try {
        await updateThreadTypeDetail(this.variant.id, this.threadDetailsForm);
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
    this.threadTypeArray = this.threadTypes.map((item) => item.type);
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
