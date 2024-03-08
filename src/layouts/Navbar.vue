<template>
  <ConfirmDialog />
  <div class="navbar row">
    <Button
      icon="pi pi-bars"
      rounded
      outlined
      class="burger-btn"
      @click="sidebarVisible = true"
    />
    <div class="logo">
      <img
        src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
        alt=""
      />
    </div>
    <div class="nav-links row">
      <RouterLink
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        active-class="active-link"
        >{{ link.name }}</RouterLink
      >
    </div>
    <div class="actions row">
      <RouterLink v-if="!accessToken" to="/login"
        ><Button label="Login" class="login-btn"
      /></RouterLink>
      <Button
        v-tooltip.bottom="'Cart'"
        icon="pi pi-shopping-cart"
        rounded
        outlined
        class="cart-btn"
      />
      <Button
        v-if="accessToken"
        v-tooltip.bottom="'Logout'"
        @click="logout()"
        icon="pi pi-sign-out"
        rounded
        outlined
        class="logout-btn"
      />
    </div>
  </div>
  <Sidebar v-model:visible="sidebarVisible" header="Sidebar" class="sidebar">
    <template #header>
      <div class="logo">
        <img
          src="https://res.cloudinary.com/dpm5vdakr/image/upload/v1709128297/mosawebapp/assets/Untitled_design_1_k6o8rv.png"
          alt=""
        />
      </div>
    </template>
    <div class="sidebar-links col">
      <RouterLink
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        active-class="active-link"
        >{{ link.name }}</RouterLink
      >
      <RouterLink to="/login"
        ><Button icon="pi pi-sign-in" label="Login" class="login-btn"
      /></RouterLink>
    </div>
  </Sidebar>
</template>
<script>
export default {
  data() {
    return {
      sidebarVisible: false,
      links: [
        { name: "Home", path: "/home" },
        { name: "Our Products", path: "/our-products" },
        { name: "Contact Us", path: "/contact-us" },
      ],
      accessToken: null,
    };
  },
  methods: {
    logout() {
      this.$confirm.require({
        message: "Are you sure you want to logout?",
        header: "Logout",
        icon: "pi pi-exclamation-triangle",
        rejectLabel: "No",
        acceptLabel: "Yes",
        accept: () => {
          localStorage.clear();
          this.accessToken = localStorage.getItem("token");
        },
        reject: () => {},
      });
    },
  },
  mounted() {
    this.accessToken = localStorage.getItem("token");
  },
};
</script>
