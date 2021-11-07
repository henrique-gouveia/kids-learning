<template>
	<AdminLayout
		icon="icon-layers"
		title="Administração"
		subtitle="Alunos"
	>
		<b-form>
			<input id="aluno-id" type="hidden" v-model="aluno.id" />
			<b-row>
				<b-col sm="3" xs="12" v-if="mode === 'save'">
					<b-form-group label="Turma:" label-for="aluno-turma">
						<b-form-select 
							id="aluno-turma"
							v-model="aluno.turmaId"
							:options="turmas"
						/>
					</b-form-group>
				</b-col>
				<b-col sm="3" xs="12">
					<b-form-group label="Matrícula:" label-for="aluno-matricula">
						<b-form-input
							id="aluno-matricula"
							type="text"
							placeholder="Informe a matrícula do Aluno..."
							required
							v-model="aluno.matricula"
							:readonly="mode == 'remove'"
						/>
					</b-form-group>
				</b-col>
				<b-col sm="6" xs="12">
					<b-form-group label="Nome:" label-for="aluno-nome">
						<b-form-input
							id="aluno-nome"
							type="text"
							placeholder="Informe o nome do Aluno..."
							required
							:readonly="mode == 'remove'"
							v-model="aluno.nome"
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
		<b-table hover striped :fields="fields" :items="alunos">
			<template #cell(actions)="data">
				<b-button variant="warning" @click="loadAluno(data.item)" class="mr-2">
					<i class="fas fa-pencil-alt"></i>
				</b-button>
				<b-button variant="danger" @click="loadAluno(data.item, 'remove')">
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
import { alunos } from '@/data';

@Component({
  components: {
		AdminLayout
	}
})
export default class Student extends Vue { 
	mode = 'save';

	aluno = {}
	alunos = alunos;
	turmas = [ 'Turma 1', 'Turma 2', 'Turma 3' ];
  
  public fields: unknown[] = [
    { key: 'id', label: 'Código', sortable: true },
    { key: 'turma', label: 'Turma', sortable: true },
    { key: 'matricula', label: 'Matrícula', sortable: true },
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'actions', label: 'Ações' }
  ];

  public page = 1;
  public limit = 0;
  public count = 0;

  public mounted(): void {
    this.loadAlunos();
  }

  private async loadAlunos(): Promise<void> {}

  public loadAluno(aluno, mode = 'save'): void {
    this.mode = mode;
    this.aluno = aluno;
  }

  public reset(): void {
    this.mode = 'save';
    this.aluno = {};
    this.loadAlunos();
  }

  public async save(): Promise<void> {}

  public async remove(): Promise<void> {}
}
</script>

<style lang="scss">

</style>
