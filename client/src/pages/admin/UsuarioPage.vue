<template>
	<ContentAdmin
		icon="icon-layers"
		title="Administração"
		subtitle="Usuário"
	>
    <b-form>
      <input id="usuario-id" type="hidden" v-model="usuario.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="usuario-nome">
            <b-form-input
              id="usuario-nome"
              type="text"
              placeholder="Informe o nome do Usuário..."
              required
              :readonly="mode == 'remove'"
              v-model="usuario.nome"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="usuario-email">
            <b-form-input
              id="usuario-email"
              type="text"
              placeholder="Informe o E-mail do Usuário..."
              required
              :readonly="mode == 'remove'"
              v-model="usuario.email"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-checkbox id="usuario-admin" v-model="usuario.admin" class="mt-3 mb-3" v-show="mode === 'save'">
        Administrador?
      </b-form-checkbox>
      <b-row v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="usuario-password">
            <b-form-input
              id="usuario-password"
              type="password"
              placeholder="Informe a Senha do Usuário..."
              required
              v-model="usuario.password"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Confirmação de Senha:" label-for="usuario-confirm-password">
            <b-form-input
              id="usuario-confirm-password"
              type="password"
              placeholder="Confirme a Senha do Usuário..."
              required
              v-model="usuario.confirmPassword"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">
            Salvar
          </b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
            Excluir
          </b-button>
          <b-button class="ml-2" @click="reset">
            Cancelar
          </b-button>
          <hr />
        </b-col>
      </b-row>
    </b-form>
    <b-table
      responsive
      hover
      striped
      show-empty
      :fields="fields"
      :items="usuarios"
      :busy="loading"
    >
      <template #table-busy>
        <div class="text-center my-1">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="align-middle ml-2">Carregando...</strong>
        </div>
      </template>
      <template #empty class="text-center">
        <p class="text-center">Nenhum usuário encontrado</p>
      </template>
      <template #cell(actions)="data">
				<b-button variant="warning" @click="loadUsuario(data.item)" class="mr-2">
					<i class="fas fa-pencil-alt"></i>
				</b-button>
				<b-button variant="danger" @click="loadUsuario(data.item, 'remove')">
					<i class="fas fa-trash-alt"></i>
				</b-button>
			</template>
    </b-table>
		<b-pagination
			size="md"
			class="mt-2"
			v-model="page"
			:total-rows="count"
			:per-page="limit"
		/>
	</ContentAdmin>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import ContentAdmin from './template/ContentAdmin.vue';
import api from '@/services/api';
import VuePage from '@/models/vuePage';
import Usuario from '@/models/usuario';

@Component({
  components: {
		ContentAdmin
	}
})
export default class UsuarioPage extends VuePage {
	mode = 'save';
  loading = false;

	usuario: Usuario = new Usuario();
	usuarios: Usuario[] = [];

  fields: unknown[] = [
    { key: 'id', label: 'Código', sortable: true },
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'email', label: 'E-mail', sortable: true },
    { key: 'admin', label: 'Administrador', sortable: true,
      formatter: (value: unknown) => value ? 'Sim' : 'Não' },
    { key: 'actions', label: 'Ações', class: 'd-flex' }
  ]

  page = 1;
  limit = 0;
  count = 0;

  mounted(): void {
    this.loadUsuarios();
  }

  async loadUsuarios(): Promise<void> {
    this.loading = true;
    try {
      const res = await api.get(`/usuarios?page=${this.page}`);
      if (res && res.data) {
        const { data, count, limit } = res.data;

        this.usuarios = data.map((u: unknown) => new Usuario(u));
        this.count = count;
        this.limit = limit;
      }
    } catch (err) {
      this.showError(err);
      this.usuarios = [];
    } finally {
      this.loading = false;
    }
  }

  async loadUsuario(usuario: Usuario, mode = 'save'): Promise<void> {
    this.mode = mode;
    try {
      const res = await api.get(`/usuarios/${usuario.id}`)
      this.usuario = new Usuario(res.data);
    } catch (err) {
      this.showError(err);
    }
  }

  async save(): Promise<void> {
    const method = this.usuario.id ? 'put' : 'post';
    const id = this.usuario.id ? `/${this.usuario.id}` : '';

    try {
      await api[method](`/usuarios${id}`, { ...this.usuario });

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    }
  }

  async remove(): Promise<void> {
    const id = this.usuario.id;
    try {
      await api.delete(`/usuarios/${id}`);

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError();
    }
  }

  reset(): void {
    this.mode = 'save';
    this.page = 1;
    this.usuario = new Usuario();
    this.loadUsuarios();
  }


  @Watch('page')
  onChangePage(): void {
    this.loadUsuarios();
  }
}
</script>

<style lang="scss">

</style>
