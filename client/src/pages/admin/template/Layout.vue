<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <section class="section-container">
        <!-- Page content -->
        <Loading v-if="validatingToken"/>
        <router-view v-else />
    </section>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { ApplicationState } from '@/store/index';
import Loading from '@/components/Loading.vue';
import Sidebar from './Sidebar.vue'
import Header from '../../template/Header.vue';
import Footer from '../../template/Footer.vue';

@Component({
  components: {
    Header,
    Sidebar,
    Footer,
    Loading
  }
})
export default class Layout extends Vue {
  @State((state: ApplicationState) => state.auth.validatingToken) validatingToken!: boolean;
}
</script>
