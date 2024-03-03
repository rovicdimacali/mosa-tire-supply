<template>
  <div class="otp">
    <div class="overlay row">
      <div class="otp-hero col">
        <img
          src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
          alt=""
          class="logo"
        />
        <p>Tires That Define Your Drive</p>
      </div>
      <div class="otp-form-container">
        <Card class="otp-box col">
          <template #content>
            <img
              src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
              alt=""
              class="logo"
            />
            <form class="otp-form col" @submit.prevent="otp">
              <div class="otp-header col">
                <h2>OTP</h2>
                <small>Enter the OTP sent to your email</small>
              </div>
              <small class="error">{{ isError }}</small>
              <div class="otp-container col">
                <label for="otp">OTP</label>
                <InputText
                  v-model="otpObj.otp"
                  class="input"
                  required
                  :invalid="isError?.includes('exist') ? true : false"
                />
              </div>
              <Button
                :loading="isLoading"
                label="Submit"
                type="submit"
                class="otp-btn"
              />
            </form>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import { OTPUser } from "@/services/UserAuth/ForgotPassword";
export default {
  data() {
    return {
      otpObj: {
        userID: null,
        otp: null,
      },
      isLoading: false,
      isError: null,
    };
  },

  methods: {
    async otp() {
      this.isLoading = true;
      try {
        const response = await OTPUser(this.otpObj);
        if (response) {
          console.log(response);
        }
      } catch (error) {
        console.error(error);
        this.isError = error.response.data.message;
      }
      this.isLoading = false;
    },
  },

  mounted() {
    this.otpObj.userID = localStorage.getItem("userID");
  },
};
</script>
