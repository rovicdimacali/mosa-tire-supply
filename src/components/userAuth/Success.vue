<template>
  <div class="success-container col">
    <lord-icon
      src="https://cdn.lordicon.com/guqkthkk.json"
      trigger="in"
      delay="500"
      state="in-reveal"
      style="width: 50px; height: 50px"
    >
    </lord-icon>
    <p>{{ message ? message : "Enter Message Here" }}</p>
    <RouterLink to="/login" v-if="login"
      ><Button label="Back to Login"
    /></RouterLink>
  </div>
</template>

<script>
export default {
  props: ["message", "login"],
};
</script>

<style></style>
