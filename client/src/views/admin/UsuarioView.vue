<template>
	<ContentAdmin
		icon="icon-note"
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
          <b-form-group label="Senha:" label-for="usuario-senha">
            <b-form-input
              id="usuario-senha"
              type="password"
              placeholder="Informe a Senha do Usuário..."
              required
              v-model="usuario.senha"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Confirmação de Senha:" label-for="usuario-confirm-senha">
            <b-form-input
              id="usuario-confirm-senha"
              type="password"
              placeholder="Confirme a Senha do Usuário..."
              required
              v-model="usuario.confirmSenha"
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
    <b-table responsive hover striped :fields="fields" :items="usuarios">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadusuario(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadusuario(data.item, 'remove')">
          <i class="fa fa-trash"></i>
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
import { Component, Vue } from 'vue-property-decorator';
import ContentAdmin from './template/ContentAdmin.vue';

@Component({
  components: {
		ContentAdmin
	}
})
export default class UsuarioView extends Vue {
	mode = 'save';

	usuario = {};
	usuarios = [];

  public fields: unknown[] = [
    { key: 'id', label: 'Código', sortable: true },
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'email', label: 'E-mail', sortable: true },
    { key: 'admin', label: 'Administrador', sortable: true,
      formatter: (value: unknown) => value ? 'Sim' : 'Não' },
    { key: 'actions', label: 'Ações', class: 'd-flex' }
  ]

  public page = 1;
  public limit = 0;
  public count = 0;

  public mounted(): void {
    this.loadUsuarios();
  }

  private async loadUsuarios(): Promise<void> {}

  public loadUsuario(usuario, mode = 'save'): void {
    this.mode = mode;
    this.usuario = usuario;
  }

  public reset(): void {
    this.mode = 'save';
    this.page = 1;
    this.usuario = {};
    this.loadUsuarios();
  }

  public async save(): Promise<void> {}

  public async remove(): Promise<void> {}
}
</script>

<style lang="scss">

</style>
