<template>
  <div class="auth-content">
    <div class="auth-modal">
      <Logo />
      <hr />
      <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

      <b-form-input
        type="text"
        placeholder="Nome"
        v-if="showSignup"
        v-model="usuario.name"
      />
      <b-form-input
        type="text"
        placeholder="E-mail"
        name="email"
        v-model="usuario.email"
      />
      <b-form-input
        type="password"
        placeholder="Senha"
        name="password"
        v-model="usuario.password"
      />
      <b-form-input
        type="password"
        placeholder="Confirme a Senha"
        v-if="showSignup"
        v-model="usuario.confirmPassword"
      />

      <b-button variant="primary" v-if="showSignup" @click="signup">Registrar</b-button>
      <b-button variant="primary"  v-else @click="signin" active>Entrar</b-button>

      <!-- <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import api from '@/services/api';
import VuePage from '@/models/vuePage';
import Usuario from '@/models/usuario';

@Component
export default class AuthPage extends VuePage {
  showSignup = false
  usuario: Usuario = new Usuario();

  async signin(): Promise<void> {
    try {
      const res = await api.post(`/signin`, { ...this.usuario });
      if (res && res.data) {
        this.$store.commit('setAuthData', res.data)
        this.$router.push({ path: '/' })
      }
    } catch (err) {
      this.showError(err);
    }
  }

  async signup(): Promise<void> {
    try {
      await api.post(`/signup`, { ...this.usuario });
      this.showSuccess();
      this.usuario = new Usuario();
      this.showSignup = false;
    } catch (err) {
      this.showError(err);
    }
  }
}
</script>

<style lang="scss">
.auth-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .auth-modal {
    background-color: #fff;
    width: 330px;
    padding: 35px;
    box-shadow: 0 1px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      width: 100%;
      margin-bottom: 15px;
      padding: 3px 8px;
      outline: none;
    }

    button {
      align-self: flex-end;
      color: #fff;
    }

    a {
      margin-top: 35px;
    }

    hr {
      border: 0;
      width: 100%;
      height: 1px;
      background-image: linear-gradient(to right,
        rgba(120, 120, 120, 0),
        rgba(120, 120, 120, 0.75),
        rgba(120, 120, 120, 0),);
    }
  }

  .auth-title {
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px;
  }
}
</style>
