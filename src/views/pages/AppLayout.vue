<template>
  <DataPrivacyDialog
    v-if="isPrivacyPolicyDialog"
    :isVisible="isPrivacyPolicyDialog"
    @close="
      () => {
        isPrivacyPolicyDialog = false;
      }
    "
  />
  <div class="applayout col">
    <Navbar />
    <div class="routerview-container">
      <RouterView />
    </div>
  </div>
</template>
<script>
import Navbar from "@/layouts/Navbar.vue";
import DataPrivacyDialog from "@/components/dataprivacy/DataPrivacyDialog.vue";
export default {
  components: { Navbar, DataPrivacyDialog },
  data() {
    return {
      isPrivacyPolicyDialog: false,
      isStaff: null,
      token: null,
      isAccepted: null,
    };
  },

  mounted() {
    this.token = localStorage.getItem("token");
    this.isStaff = localStorage.getItem("is_staff") === "true";
    this.isAccepted = localStorage.getItem("acceptedPrivacyPolicy") === "true";
    if (this.token && !this.isStaff && !this.isAccepted) {
      this.isPrivacyPolicyDialog = true;
    }
  },
};
</script>
