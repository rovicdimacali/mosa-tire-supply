<template>
  <div class="forgotpass">
    <div class="overlay row">
      <div class="forgotpass-hero col">
        <img
          src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
          alt=""
          class="logo"
        />
        <p>Tires That Define Your Drive</p>
      </div>
      <div class="forgotpass-form-container">
        <Card class="forgotpass-box col">
          <template #content>
            <img
              src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
              alt=""
              class="logo"
            />
            <form class="forgotpass-form col" @submit.prevent="forgotpass">
              <div class="forgotpass-header col">
                <h2>Forgot Password</h2>
                <small>Enter your email</small>
              </div>
              <small class="error">{{ isError }}</small>
              <div class="email-container col">
                <label for="email">Email</label>
                <InputText
                  v-model="forgotpassObj.email"
                  class="input"
                  required
                  :invalid="isError?.includes('exist') ? true : false"
                />
              </div>
              <Button
                :loading="isLoading"
                label="Submit"
                type="submit"
                class="forgotpass-btn"
              />
            </form>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import { forgotPasswordUser } from "@/services/UserAuth/ForgotPassword";
export default {
  data() {
    return {
      forgotpassObj: {
        email: null,
      },
      isLoading: false,
      isError: null,
    };
  },

  methods: {
    async forgotpass() {
      this.isLoading = true;
      try {
        const response = await forgotPasswordUser(this.forgotpassObj);
        if (response) {
          localStorage.setItem("userID", response.id);
          this.$router.push("/otp");
        }
      } catch (error) {
        console.error(error);
        this.isError = error.response.data.message;
      }
      this.isLoading = false;
    },
  },
};
</script>
