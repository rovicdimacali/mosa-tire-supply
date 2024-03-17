<template>
  <Dialog
    v-model:visible="localVisible"
    header="Edit Brand"
    :style="{ width: '60vw' }"
    modal
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="
      () => {
        this.$emit('close');
      }
    "
    class="add-brand-dialog"
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
    <form class="add-brand-form row" @submit.prevent="submitUpdateBrand">
      <div class="name-container row">
        <label for="name">Name</label>
        <InputText v-model="brandForm.brandName" class="input" required />
      </div>
      <div class="spinner-conat">
        <ProgressSpinner
          v-if="isUploading"
          style="width: 20px; height: 20px"
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
          aria-label="Custom ProgressSpinner"
        />
      </div>
      <FileUpload
        id="image-upload"
        mode="basic"
        :auto="true"
        :customUpload="true"
        @uploader="uploadToCloudinary"
        :multiple="false"
        accept="image/*"
        :maxFileSize="5000000"
      />
    </form>
    <template #footer>
      <div class="actions row">
        <Button label="Cancel" @click="this.$emit('close')" />
        <Button
          type="submit"
          :loading="isLoading"
          label="Submit"
          severity="info"
          @click="submitUpdateBrand"
        />
      </div>
    </template>
  </Dialog>
</template>
<script>
import { uploadImageCloudinary } from "@/services/Cloudinary/CloudinaryUpload";
import { updateBrand } from "@/services/Admin/Products";

export default {
  props: ["isVisible", "brand"],
  data() {
    return {
      localVisible: true,
      loading: false,
      brandForm: {
        brandName: this.brand.name,
        imageUrl: this.brand.imageUrl,
      },
      isError: null,
      showMessageSuccess: null,
      isLoading: false,
      isUploading: false,
    };
  },
  methods: {
    async uploadToCloudinary(event) {
      this.isUploading = true;
      const file = event.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UNSIGNED_PRESET
      );
      formData.append("folder", import.meta.env.VITE_CLOUDINARY_BRANDS_FOLDER);
      try {
        const response = await uploadImageCloudinary(formData);
        this.brandForm.imageUrl = response.url;
        this.showMessageSuccess = "Image uploaded successfully.";
      } catch (error) {
        console.error("Failed to upload image: ", error);
        this.isError = "Failed to upload image.";
      }
      this.isUploading = false;
    },

    async submitUpdateBrand() {
      this.isLoading = true;
      try {
        await updateBrand(this.brand.id, this.brandForm);
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
    console.log(this.brand);
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
