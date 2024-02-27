<template>
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
        src="https://res.cloudinary.com/dyvcdyqes/image/upload/v1709042333/assets/Untitled_design_1_oimzu8.png"
        alt=""
      />
    </div>
    <div class="nav-links row">
      <RouterLink to="/home" active-class="active-link"> Home </RouterLink>
      <RouterLink to=""> Our Products </RouterLink>
      <RouterLink to=""> Contact Us </RouterLink>
    </div>
    <div class="actions row">
      <Button label="Login" class="login-btn" />
      <Button icon="pi pi-shopping-cart" rounded outlined class="cart-btn" />
    </div>
  </div>
  <Sidebar v-model:visible="sidebarVisible" header="Sidebar" class="sidebar">
    <template #header>
      <div class="logo">
        <img
          src="https://res.cloudinary.com/dyvcdyqes/image/upload/v1709042333/assets/Untitled_design_1_oimzu8.png"
          alt=""
        />
      </div>
    </template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </Sidebar>
</template>
<script>
export default {
  data() {
    return {
      sidebarVisible: false,
    };
  },
};
</script>
