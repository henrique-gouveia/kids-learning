<template>
  <div class="page-wrapper">
    <NavBar />
    <section class="section-container">
        <!-- Page content -->
        <router-view />
    </section>
    <section class="section-footer">
      <Footer />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/pages/template/NavBar.vue';
import Footer from '../../template/Footer.vue';

@Component({
  components: {
    NavBar,
    Footer
  }
})
export default class Layout extends Vue {}
</script>

<style lang="scss">
.page-wrapper {
  height: 100vh;
  overflow-x: hidden;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas: "header" "content" "footer";

  & .topnavbar-wrapper {
    grid-area: header;
  }

  & .section-container {
    grid-area: content;
  }

  & .section-footer {
    grid-area: footer;
    margin: 10px;
  }
}
</style>
