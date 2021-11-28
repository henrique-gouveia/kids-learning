<template>
  <NavBar>
    <ul class="navbar-nav mr-auto flex-row">
      <li class="nav-item">
        <a href="" class="nav-link d-none d-md-block d-lg-block d-xl-block" @click.prevent="toggleAsideCollapsed">
          <em :class="`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`"></em>
        </a>
        <a href="" class="nav-link sidebar-toggle d-md-none" @click.prevent="toggleOffcanvas">
          <em :class="`fas fa-chevron-${isCollapsed ? 'right' : 'left'}`"></em>
        </a>
      </li>
    </ul>
    <ul class="navbar-nav flex-row">
      <li class="nav-item">
        <a href="" class="nav-link" @click.prevent="signout">
          <em class="fa fa-sign-out-alt"></em>
        </a>
      </li>
    </ul>
  </NavBar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Mutation, State } from 'vuex-class';
import { ApplicationState } from '@/store/index';
import NavBar from '@/views/template/NavBar.vue';

@Component({
  components: {
    NavBar
  }
})
export default class Header extends Vue {
  @State((state: ApplicationState) => state.setting.isCollapsed) isCollapsed!: boolean;
  @Mutation toggleSetting : any;

  /**
   * Triggers a window resize event when clicked
   * for plugins that needs to be redrawed
   */
  resize(): void {
    // all IE friendly dispatchEvent
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('resize', true, false, {});
    window.dispatchEvent(evt);
    // modern dispatchEvent way
    // window.dispatchEvent(new Event('resize'));
  }

  toggleOffcanvas(): void {
    this.toggleSetting('asideToggled')
  }

  toggleAsideCollapsed(): void {
    this.toggleSetting('isCollapsed')
    this.resize();
  }
  
  signout(): void {
    // Do something...
  }
}
</script>