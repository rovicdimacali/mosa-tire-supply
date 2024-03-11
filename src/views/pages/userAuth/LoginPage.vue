<template>
  <Toast />
  <div class="login">
    <div class="overlay row">
      <div class="login-hero col">
        <img
          src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
          alt=""
          class="logo"
        />
        <p>Tires That Define Your Drive</p>
      </div>
      <div class="login-form-container">
        <Card class="login-box col">
          <template #content>
            <img
              src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
              alt=""
              class="logo"
            />
            <form class="login-form col" @submit.prevent="login">
              <div class="login-header col">
                <h2>Login</h2>
                <small>Enter your account details</small>
              </div>
              <small class="error">{{ isError }}</small>
              <div class="username-container col">
                <label for="username">Email</label>
                <InputText
                  v-model="loginObj.email"
                  class="input"
                  required
                  :invalid="isError?.includes('exist') ? true : false"
                />
              </div>
              <div class="password-container col">
                <label for="password">Password</label>
                <Password
                  v-model="loginObj.password"
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
                label="Login"
                type="submit"
                class="login-btn"
              />
            </form>
            <div class="forgot-password-container col">
              <RouterLink to="/forgot-password"
                ><small>Forgot Password?</small></RouterLink
              >
              <RouterLink to="/sign-up"
                ><small
                  >No Account Yet? Click here to create one.</small
                ></RouterLink
              >
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import { loginUser } from "@/services/UserAuth/Login";

export default {
  data() {
    return {
      loginObj: {
        email: null,
        password: null,
      },
      isLoading: false,
      isError: null,
    };
  },

  methods: {
    async login() {
      this.isLoading = true;
      try {
        const response = await loginUser(this.loginObj);
        if (response) {
          localStorage.setItem("token", response.accessToken);
          localStorage.setItem("userID", response.accountDto.id);
          localStorage.setItem("name", response.accountDto.fullname);
          localStorage.setItem("email", response.accountDto.email);
          localStorage.setItem("is_staff", response.accountDto.userRole);

          this.$router.push("/home");
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
