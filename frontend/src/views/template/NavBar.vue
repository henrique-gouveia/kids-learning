<template>
  <header class="topnavbar-wrapper">
    <nav class="navbar topnavbar">
      <div class="navbar-header">
        <a class="navbar-brand" href="#/">
          <!-- <div class="brand-logo">
            <img class="img-fluid" src="@/assets/img/logo.png" alt="App Logo" width="36">
          </div>
          <div class="brand-logo-collapsed">
            <img class="img-fluid" src="@/assets/img/logo.png" alt="App Logo" width="36">
          </div> -->
          <div class="brand-logo"><h3>KL</h3></div>
          <div class="brand-logo-collapsed"><h3>KL</h3></div>
        </a>
      </div>
      <slot></slot>
    </nav>
  </header>
</template>

<style lang="scss">
.navbar-header {
  & .navbar-brand  {
    & h3 {
      color: #fff;
    }
  }
}
</style>