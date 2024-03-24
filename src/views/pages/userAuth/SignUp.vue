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
              <ul v-if="isError && Array.isArray(isError)" class="error-list">
                <li
                  v-for="(error, index) in isError"
                  :key="index"
                  class="error"
                >
                  {{ error }}
                </li>
              </ul>
              <small
                v-else-if="isError && !Array.isArray(isError)"
                class="error"
                >{{ isError }}</small
              >

              <div class="sign-up-form-inputs col">
                <div class="email-container col">
                  <label for="email">Email</label>
                  <InputText v-model="signUpObj.email" class="input" required />
                </div>
                <div class="name-container col">
                  <label for="name">Full Name</label>
                  <InputText
                    v-model="signUpObj.fullName"
                    class="input"
                    required
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
                  />
                </div>
                <div class="password-container col">
                  <label for="password">Confirm Password</label>
                  <Password
                    v-model="signUpObj.confirmPassword"
                    :feedback="false"
                    toggleMask
                    class="input"
                    required
                  />
                </div>
                <div class="contact-container col">
                  <label for="contact">Contact Number</label>
                  <InputGroup>
                    <InputGroupAddon>+63</InputGroupAddon>
                    <InputNumber
                      v-model="initial_contact_number"
                      placeholder="9123456789"
                      :useGrouping="false"
                      class="input"
                    />
                  </InputGroup>
                </div>
              </div>
              <Button
                :loading="isLoading"
                label="Sign Up"
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
import { signUpUser } from "@/services/UserAuth/SignUp";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  data() {
    return {
      signUpObj: {
        email: null,
        fullName: null,
        password: null,
        confirmPassword: null,
        contactNumber: null,
      },
      initial_contact_number: null,
      isLoading: false,
      isError: null,
    };
  },
  validations() {
    const contactNumberValidator = helpers.regex(/^9\d{9}$/);
    const contactNumberWithMessage = helpers.withMessage(
      "Incorrect Contact Number.",
      contactNumberValidator,
    );
    return {
      signUpObj: {
        email: {
          required,
          email: helpers.withMessage("Invalid Email entered.", email),
        },
        fullName: {
          required: helpers.withMessage("Name is required.", required),
        },
        password: {
          required,
          minLength: helpers.withMessage(
            "Password must be 8 characters long.",
            minLength(8),
          ),
        },
        confirmPassword: {
          required,
          sameAsPassword: helpers.withMessage(
            "Confirm Password must be the same with Password.",
            sameAs(this.signUpObj.password),
          ),
        },
        contactNumber: {
          required: helpers.withMessage(
            "Contact Number is required.",
            required,
          ),
        },
      },
      initial_contact_number: {
        required: helpers.withMessage("Contact Number is required.", required),
        contactNumberWithMessage,
      },
    };
  },
  methods: {
    async signUp() {
      this.signUpObj.contactNumber = `+63${this.initial_contact_number}`;
      const result = await this.v$.$validate();
      this.isLoading = true;
      if (!result) {
        // Log specific validation errors
        this.isError = this.v$.$errors.map((error) => error.$message);
      } else {
        this.isError = "";
        try {
          const response = await signUpUser(this.signUpObj);
          if (response) {
            localStorage.setItem("userID", response.data.id);
            this.$router.push("/otp");
          }
        } catch (error) {
          console.error(error);
          this.isError = error.response.data.message;
        }
      }
      this.isLoading = false;
    },
  },
};
</script>
