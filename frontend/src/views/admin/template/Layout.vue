<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <section class="section-container">
        <!-- Page content -->
        <router-view />
    </section>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '../../template/Header.vue';
import Sidebar from './Sidebar.vue'
import Footer from '../../template/Footer.vue';

@Component({
  components: {
    Header,
    Sidebar,
    Footer
  }
})
export default class Layout extends Vue {}
</script>