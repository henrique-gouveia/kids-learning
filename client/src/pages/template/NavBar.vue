<template>
  <header class="topnavbar-wrapper">
    <nav class="navbar topnavbar">
      <div class="navbar-header">
        <a class="navbar-brand" href="#/">
          <div class="brand-logo">
            <img class="img-fluid" src="@/assets/img/logo-name-ex.png" alt="App Logo" width="160">
          </div>
          <div class="brand-logo-collapsed">
            <img class="img-fluid" src="@/assets/img/logo-abbr.png" alt="App Logo" width="42">
          </div>
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
