<template>
  <div class="applayout col">
    <Navbar />
    <div class="routerview-container">
      <RouterView />
    </div>
  </div>
</template>
<script>
import Navbar from "@/layouts/Navbar.vue";

export default {
  components: { Navbar },
};
</script>
