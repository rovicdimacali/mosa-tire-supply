<template>
  <Dialog
    v-model:visible="localVisible"
    header="Add Brand"
    :style="{ width: '60vw' }"
    modal
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @hide="
      () => {
        this.$emit('close');
      }
    "
    class="add-threadtype-dialog"
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
    <form class="add-threadtype-form col" @submit.prevent="submitAddBrand">
      <div class="basic-inputs row">
        <div class="brand-container col">
          <label for="name">Brand</label>
          <Dropdown
            v-model="threadTypeForm.brand"
            :options="brands"
            optionLabel="name"
            optionValue="name"
            filter
            placeholder="Select a Brand"
            @change="fetchThreadTypes"
            class="dropdown"
          />
        </div>
        <div class="type-container col">
          <label for="name">Thread Type</label>
          <InputText v-model="threadTypeForm.type" class="input" required />
        </div>
        <div class="spinner-container">
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
          chooseLabel="Upload"
        />
      </div>
      <div class="basic-inputs row">
        <div class="description-container col">
          <label for="name">Description</label>
          <Editor
            v-model="threadTypeForm.description"
            editorStyle="height: 220px; width: 100%"
          />
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
          @click="submitAddBrand"
        />
      </div>
    </template>
  </Dialog>
</template>
<script>
import { uploadImageCloudinary } from "@/services/Cloudinary/CloudinaryUpload";
import { addThreadTypes } from "@/services/Admin/Products";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["isVisible", "brands"],
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      localVisible: true,
      loading: false,
      threadTypeForm: {
        brand: null,
        type: null,
        imageUrl: null,
        description: null,
      },
      isError: null,
      showMessageSuccess: null,
      isLoading: false,
      isUploading: false,
    };
  },
  validations() {
    return {
      threadTypeForm: {
        brand: {
          required: helpers.withMessage("Brand is required.", required),
        },
        type: {
          required: helpers.withMessage("Type is required.", required),
        },
        imageUrl: {
          required: helpers.withMessage("Image is required.", required),
        },
        description: {
          required: helpers.withMessage("Description is required.", required),
        },
      },
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
        this.threadTypeForm.imageUrl = response.url;
        this.showMessageSuccess = "Image uploaded successfully.";
      } catch (error) {
        console.error("Failed to upload image: ", error);
        this.isError = "Failed to upload image.";
      }
      this.isUploading = false;
    },

    async submitAddBrand() {
      this.isLoading = true;
      let threadTypeArray = [];
      threadTypeArray.push(this.threadTypeForm);
      const result = await this.v$.$validate();
      if (!result) {
        // Log specific validation errors
        this.isError = this.v$.$errors.map((error) => error.$message);
      } else {
        try {
          await addThreadTypes(threadTypeArray);
          this.$emit("success");
        } catch (error) {
          console.error(error);
          if (error.response.data.message.includes("Empty")) {
            this.isError = "Please complete the form before submitting.";
          } else {
            this.isError = error.response.data.message;
          }
        } finally {
          this.isLoading = false;
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
