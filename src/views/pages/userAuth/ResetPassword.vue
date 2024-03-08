<template>
  <div class="resetpass">
    <div class="overlay row">
      <div class="resetpass-hero col">
        <img
          src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
          alt=""
          class="logo"
        />
        <p>Tires That Define Your Drive</p>
      </div>
      <div class="resetpass-form-container">
        <Card class="resetpass-box col">
          <template #content>
            <img
              src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
              alt=""
              class="logo"
            />
            <form
              v-if="!isResetSuccess"
              class="resetpass-form col"
              @submit.prevent="resetPass"
            >
              <div class="resetpass-header col">
                <h2>Reset Password</h2>
                <small>Enter your new Password</small>
              </div>
              <small class="error">{{ isError }}</small>
              <div class="password-container col">
                <label for="password">New Password</label>
                <Password
                  v-model="resetpassObj.newPassword"
                  :feedback="false"
                  toggleMask
                  class="input"
                  required
                  :invalid="
                    isError?.includes('incorrect')
                      ? true
                      : isError
                      ? true
                      : false
                  "
                />
              </div>
              <div class="password-container col">
                <label for="password">Confirm Password</label>
                <Password
                  v-model="resetpassObj.confirmPassword"
                  :feedback="false"
                  toggleMask
                  class="input"
                  required
                  :invalid="
                    isError?.includes('incorrect')
                      ? true
                      : isError
                      ? true
                      : false
                  "
                />
              </div>
              <Button
                :loading="isLoading"
                label="Submit"
                type="submit"
                class="resetpass-btn"
              />
            </form>
            <Success
              v-else-if="isResetSuccess"
              :message="'Congratulations! Your Password have been reset.'"
              :login="true"
            />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import Success from "@/components/userAuth/Success.vue";
import { resetPasswordUser } from "@/services/UserAuth/ResetPassword";
export default {
  components: { Success },
  data() {
    return {
      resetpassObj: {
        newPassword: null,
        confirmPassword: null,
      },
      isResetSuccess: false,
      isLoading: false,
      isError: null,
    };
  },

  methods: {
    async resetPass() {
      this.isLoading = true;
      this.resetpassObj.id = localStorage.getItem("userID");
      try {
        const response = await resetPasswordUser(this.resetpassObj);
        if (response) {
          localStorage.removeItem("userID");
          this.isResetSuccess = true;
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
