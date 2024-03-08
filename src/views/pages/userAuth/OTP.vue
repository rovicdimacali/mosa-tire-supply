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
            <form
              v-if="!isSignUpSuccess"
              class="otp-form col"
              @submit.prevent="otp"
            >
              <div class="otp-header col">
                <h2>OTP</h2>
                <small>Enter the OTP sent to your email</small>
              </div>
              <small class="error">{{ isError }}</small>
              <div class="otp-container col">
                <InputOtp
                  v-model="otpObj.otp"
                  class="input"
                  required
                  :length="6"
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
            <Success
              v-if="isSignUpSuccess"
              :message="'Congratulations! You have successfully Signed Up!'"
              :login="true"
            />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import { forgotOTPUser } from "@/services/UserAuth/ForgotPassword";
import { signUpOTPUser } from "@/services/UserAuth/SignUp";
import Success from "@/components/userAuth/Success.vue";
export default {
  components: { Success },
  data() {
    return {
      otpObj: {
        userID: null,
        otp: null,
      },
      isLoading: false,
      isError: null,
      previousRoute: null,
      isSignUpSuccess: false,
    };
  },

  methods: {
    async otp() {
      this.isLoading = true;
      try {
        if (this.previousRoute === "/forgot-password") {
          const response = await forgotOTPUser(this.otpObj);
          if (response) this.$router.push("/reset-password");
        } else {
          await signUpOTPUser(this.otpObj);
          this.isSignUpSuccess = true;
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
    this.previousRoute = this.$router.options.history.state.back;
  },
};
</script>
