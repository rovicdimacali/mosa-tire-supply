<template>
  <div class="sign-up">
    <div class="overlay row">
      <div class="sign-up-hero col">
        <img
          src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
          alt=""
          class="logo"
        />
        <p>Tires That Define Your Drive</p>
      </div>
      <div class="sign-up-form-container">
        <Card class="sign-up-box col">
          <template #content>
            <img
              src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
              alt=""
              class="logo"
            />
            <form class="sign-up-form col" @submit.prevent="signUp">
              <div class="sign-up-header col">
                <h2>sign-up</h2>
                <small>Enter your account details</small>
              </div>
              <small class="error">{{ isError }}</small>
              <div class="email-container col">
                <label for="email">Email</label>
                <InputText
                  v-model="signUpObj.email"
                  class="input"
                  required
                  :invalid="isError?.includes('exist') ? true : false"
                />
              </div>
              <div class="name-container col">
                <label for="name">Full Name</label>
                <InputText
                  v-model="signUpObj.name"
                  class="input"
                  required
                  :invalid="isError?.includes('exist') ? true : false"
                />
              </div>
              <div class="password-container col">
                <label for="password">Password</label>
                <Password
                  v-model="signUpObj.password"
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
                  v-model="signUpObj.confirm_password"
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
                label="sign-up"
                type="submit"
                class="sign-up-btn"
              />
            </form>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      signUpObj: {
        email: null,
        name: null,
        password: null,
        confirm_password: null,
        contact_number: null,
      },
      isLoading: false,
      isError: null,
    };
  },

  methods: {
    // async signUp() {
    //   this.isLoading = true;
    //   try {
    //     const response = await sign-upUser(this.sign-upObj);
    //     if (response) {
    //       localStorage.setItem("token", response.accessToken);
    //       this.$router.push("/home");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     this.isError = error.response.data.message;
    //   }
    //   this.isLoading = false;
    // },
  },
};
</script>
