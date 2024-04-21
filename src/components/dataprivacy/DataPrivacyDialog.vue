<template>
  <Dialog
    v-model:visible="localVisible"
    header="Data Privacy"
    :style="{ width: '60vw' }"
    modal
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :closable="false"
    @hide="
      () => {
        this.$emit('close');
      }
    "
    class="data-privacy-dialog"
  >
    <p>
      At Mosa Tire Supply, we are committed to protecting your privacy and
      ensuring the security of your personal information. This Privacy Policy
      outlines how we collect, use, disclose, and protect the information
      gathered through our web application.
    </p>

    <h2>1. Information We Collect</h2>
    <p>
      When you use our web application, we may collect the following types of
      personal information:
    </p>
    <ul>
      <li>
        <strong>Name</strong>: To personalize your experience and communicate
        with you effectively.
      </li>
      <li>
        <strong>Contact Information</strong>: Such as phone number or address,
        to provide relevant services and support.
      </li>
      <li>
        <strong>Email Address</strong>: For communication purposes, including
        order confirmations, updates, and marketing materials if you opt-in.
      </li>
    </ul>

    <h2>2. How We Use Your Information</h2>
    <p>We use the information collected for the following purposes:</p>
    <ul>
      <li>
        <strong>Providing Services</strong>: To fulfill your requests for
        products, services, and information.
      </li>
      <li>
        <strong>Communication</strong>: To respond to inquiries, provide
        customer support, and send important updates regarding your
        transactions.
      </li>
      <li>
        <strong>Improvement</strong>: To enhance and personalize your
        experience, as well as to improve our products and services.
      </li>
      <li>
        <strong>Marketing</strong>: With your consent, we may send promotional
        emails about new products, special offers, or other information we think
        you may find interesting.
      </li>
    </ul>

    <h2>3. Protection of Your Information</h2>
    <p>
      We take appropriate measures to safeguard your personal information
      against unauthorized access, alteration, disclosure, or destruction.
    </p>
    <ul>
      <li>
        <strong>Data Security</strong>: We prioritize the security of your login
        credentials and utilize measures like password hashing.
      </li>
      <li>
        <strong>SSL Encryption</strong>: Our web application uses Secure Socket
        Layer (SSL) encryption to ensure the secure transmission of data between
        your browser and our servers.
      </li>
    </ul>

    <h2>4. Disclosure of Information</h2>
    <p>
      We do not sell, trade, or otherwise transfer your personal information to
      third parties without your consent, except as required by law or as
      necessary to provide our services to you.
    </p>

    <h2>5. Your Choices</h2>
    <p>
      <strong>Opt-Out</strong>: You have the option to opt-out of receiving
      marketing communications from us at any time by following the unsubscribe
      instructions provided in our emails or by contacting us directly.<br />
      <strong>Access and Update</strong>: You can access and update your
      personal information by logging into your account on our web application.
    </p>

    <h2>6. Third-Party Links</h2>
    <p>
      Our web application may contain links to third-party websites or services.
      Please note that we are not responsible for the privacy practices or
      content of such third-party sites. We encourage you to review the privacy
      policies of these websites before providing any personal information.
    </p>

    <h2>7. Children's Privacy</h2>
    <p>
      Our services are not intended for individuals under the age of 18. We do
      not knowingly collect personal information from children without parental
      consent. If you believe that we may have collected information from a
      child, please contact us immediately.
    </p>

    <h2>8. Changes to this Privacy Policy</h2>
    <p>
      We reserve the right to update or modify this Privacy Policy at any time.
      Any changes will be reflected on this page with a revised effective date.
      We encourage you to review this Privacy Policy periodically for any
      updates.
    </p>

    <h2>9. Contact Us</h2>
    <p>
      If you have any questions or concerns about this Privacy Policy or our
      data practices, please contact us at our
      <a href="https://www.facebook.com/MosaTires">Facebook Page</a>.
    </p>

    <p>
      By using our web application, you agree to the terms of this Privacy
      Policy. Thank you for trusting Mosa Tire Supply with your personal
      information.
    </p>
    <template #footer>
      <Button label="I have read and understood" @click="acceptPrivacyPolicy" />
    </template>
  </Dialog>
</template>
<script>
export default {
  props: ["isVisible"],
  data() {
    return {
      localVisible: true,
    };
  },
  methods: {
    async acceptPrivacyPolicy() {
      localStorage.setItem("acceptedPrivacyPolicy", true);
      this.$emit("close");
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
