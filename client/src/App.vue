<template>
  <!-- Page content -->
  <router-view />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter, Mutation } from 'vuex-class';
import api from '@/services/api';

@Component
export default class App extends Vue {
  @Getter('getAuth') auth: any;
  @Mutation setAuthData: any;
  @Mutation setValidatingToken : any;

  created(): void {
    this.validateToken();
  }

  async validateToken(): Promise<void> {
    this.setValidatingToken(true);
    try {
      const currentAuth = { ...this.auth };
      const { token } = currentAuth;

      this.setAuthData(null);

      if (!token) {
        this.setValidatingToken(false);
        this.$router.push({ path: 'auth' });
        return;
      }

      const res = await api.post('validateToken', { token: token });
      const tokenValid = res && res.data;

      if (tokenValid) {
        this.setAuthData(currentAuth);
      } else {
        this.$router.push({ path: 'auth' });
      }
    } finally {
      this.setValidatingToken(false);
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/styles/bootstrap.scss";
  @import "@/assets/styles/app.scss";
  @import "@/assets/styles/themes/theme-c.scss";
</style>
