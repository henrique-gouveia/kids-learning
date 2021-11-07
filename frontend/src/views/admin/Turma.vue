<template>
	<AdminLayout
		icon="icon-layers"
		title="Administração"
		subtitle="Turmas"
	>
		<b-form>
			<input id="turma-id" type="hidden" v-model="turma.id" />
			<b-row>
				<b-col sm="12">
					<b-form-group label="Nome:" label-for="turma-nome">
						<b-form-input 
							id="turma-nome" 
							type="text" 
							placeholder="Informe o nome do Turma..." 
							required
							:readonly="mode == 'remove'"
							v-model="turma.nome" 
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col sm="12">
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
		<b-table hover striped :fields="fields" :items="turmas">
			<template #cell(actions)="data">
				<b-button variant="warning" @click="loadClass(data.item)" class="mr-2">
					<i class="fas fa-pencil-alt"></i>
				</b-button>
				<b-button variant="danger" @click="loadClass(data.item, 'remove')">
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
	</AdminLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AdminLayout from './AdminLayout.vue';

@Component({
  components: {
		AdminLayout
	}
})
export default class Class extends Vue { 
	mode = 'save';

	turma = {}
	turmas = [
		{
			id: 1,
			nome: 'Turma 1',
		},
		{
			id: 2,
			nome: 'Turma 2',
		},
		{
			id: 3,
			nome: 'Turma 3',
		}
	];
  
  public fields: unknown[] = [
    { key: 'id', label: 'Código', sortable: true },
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'actions', label: 'Ações' }
  ];

  public page = 1;
  public limit = 0;
  public count = 0;

  public mounted(): void {
    this.loadTurmas();
  }

  private async loadTurmas(): Promise<void> {}

  public loadClass(turma, mode = 'save'): void {
    this.mode = mode;
    this.turma = turma;
  }

  public reset(): void {
    this.mode = 'save';
    this.turma = {};
    this.loadTurmas();
  }

  public async save(): Promise<void> {}

  public async remove(): Promise<void> {}
}
</script>

<style lang="scss">

</style>
