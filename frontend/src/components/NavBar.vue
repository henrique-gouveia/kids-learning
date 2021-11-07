<template>
  <header class="topnavbar-wrapper">
    <nav class="navbar topnavbar">
      <div class="navbar-header">
        <a class="navbar-brand" href="#/">
          <div class="brand-logo">
            <img class="img-fluid" src="@/assets/img/logo.png" alt="App Logo" width="36">
          </div>
          <div class="brand-logo-collapsed">
            <img class="img-fluid" src="@/assets/img/logo.png" alt="App Logo" width="36">
          </div>
        </a>
      </div>
      <slot></slot>
    </nav>
  </header>
</template>