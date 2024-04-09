<template>
  <Toast />
  <div class="admin-accounts-page">
    <div class="admin-accounts col">
      <h1>Accounts</h1>
      <div class="accounts wrap">
        <DataTable
          :value="staffAccounts"
          scrollable
          scrollHeight="400px"
          class="staff-table"
        >
          <template #header>
            <h3>Staff Accounts</h3>
          </template>

          <Column
            field="email"
            header="Email"
            style="min-width: 100px"
          ></Column>
          <Column
            field="userRole"
            header="Role"
            style="min-width: 100px"
          ></Column>
        </DataTable>
        <DataTable
          :value="customerAccounts"
          scrollable
          scrollHeight="400px"
          class="customer-table"
        >
          <template #header>
            <h3>Customer Accounts</h3>
          </template>
          <Column
            field="fullName"
            header="Full Name"
            style="min-width: 100px"
          ></Column>
          <Column
            field="email"
            header="Email"
            style="min-width: 100px"
          ></Column>
          <Column
            field="contactNumber"
            header="Contact No."
            style="min-width: 100px"
          ></Column>
        </DataTable>
      </div>
      <div class="create-account col">
        <h2>Create Admin Account</h2>
        <form class="create-account-form col" @submit.prevent="createAccount">
          <Message severity="error" v-if="isError">
            <ul v-if="isError && Array.isArray(isError)" class="error-list">
              <li v-for="(error, index) in isError" :key="index" class="error">
                {{ error }}
              </li>
            </ul>
            <small
              v-else-if="isError && !Array.isArray(isError)"
              class="error"
              >{{ isError }}</small
            >
          </Message>

          <div class="create-account-wrap wrap">
            <div class="email-container col">
              <label for="email">Email</label>
              <InputText
                v-model="createAccountObj.email"
                class="input"
                required
              />
            </div>
            <div class="name-container col">
              <label for="name">Full Name</label>
              <InputText
                v-model="createAccountObj.fullName"
                class="input"
                required
              />
            </div>
          </div>
          <div class="create-account-wrap wrap">
            <div class="password-container col">
              <label for="password">Password</label>
              <Password
                v-model="createAccountObj.password"
                :feedback="false"
                toggleMask
                class="input"
                required
              />
            </div>
            <div class="password-container col">
              <label for="password">Confirm Password</label>
              <Password
                v-model="createAccountObj.confirmPassword"
                :feedback="false"
                toggleMask
                class="input"
                required
              />
            </div>
          </div>
          <div class="create-account-wrap wrap">
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
            <div class="user-role-container col">
              <label for="contact">User Role</label>
              <Dropdown
                v-model="createAccountObj.userRole"
                :options="roles"
                optionLabel="name"
                optionValue="value"
                placeholder="Select a Role"
                class="input"
              />
            </div>
          </div>
          <Button
            :loading="isLoading"
            label="Create Account"
            type="submit"
            class="create-account-btn"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getStaffAccounts,
  getCustomerAccounts,
  createStaffAccount,
} from "@/services/Admin/Accounts";
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
      staffAccounts: null,
      customerAccounts: null,
      createAccountObj: {
        fullName: null,
        email: null,
        contactNumber: null,
        password: null,
        confirmPassword: null,
        userRole: null,
      },
      roles: [
        { name: "Administrator", value: "ADMINISTRATOR" },
        { name: "Product Manager", value: "PRODUCT_MANAGER" },
        { name: "Content Manager", value: "CONTENT_MANAGER" },
        { name: "Order Manager", value: "ORDER_MANAGER" },
      ],
      initial_contact_number: null,
      isError: null,
      isLoading: false,
    };
  },
  validations() {
    const contactNumberValidator = helpers.regex(/^9\d{9}$/);
    const contactNumberWithMessage = helpers.withMessage(
      "Incorrect Contact Number.",
      contactNumberValidator
    );
    return {
      createAccountObj: {
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
            minLength(8)
          ),
        },
        confirmPassword: {
          required,
          sameAsPassword: helpers.withMessage(
            "Confirm Password must be the same with Password.",
            sameAs(this.createAccountObj.password)
          ),
        },
        contactNumber: {
          required: helpers.withMessage(
            "Contact Number is required.",
            required
          ),
        },
        userRole: {
          required: helpers.withMessage("Role is required.", required),
        },
      },
      initial_contact_number: {
        required: helpers.withMessage("Contact Number is required.", required),
        contactNumberWithMessage,
      },
    };
  },

  methods: {
    async fetchStaffAccounts() {
      try {
        const response = await getStaffAccounts();
        this.staffAccounts = response || [];
      } catch (error) {
        console.error(error);
      }
    },

    async fetchCustomerAccounts() {
      try {
        const response = await getCustomerAccounts();
        this.customerAccounts = response || [];
      } catch (error) {
        console.error(error);
      }
    },

    async createAccount() {
      this.createAccountObj.contactNumber = `+63${this.initial_contact_number}`;
      const result = await this.v$.$validate();
      this.isLoading = true;
      if (!result) {
        // Log specific validation errors
        this.isError = this.v$.$errors.map((error) => error.$message);
      } else {
        this.isError = "";
        try {
          const response = await createStaffAccount(this.createAccountObj);
          if (response) {
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Account Created Successfully",
              life: 3000,
            });
            this.fetchStaffAccounts();
          }
          this.clearForm();
        } catch (error) {
          console.error(error);
          this.isError = error.response.data.message;
        }
      }
      this.isLoading = false;
    },

    clearForm() {
      // Reset all form fields to empty strings
      for (let key in this.createAccountObj) {
        this.createAccountObj[key] = "";
      }
    },
  },

  mounted() {
    this.fetchStaffAccounts();
    this.fetchCustomerAccounts();
  },
};
</script>
