<template>
	<AdminLayout
		icon="icon-note"
		title="Questionário"
		subtitle="Gerenciar"
	>
		<b-form>
			<input id="questionario-id" type="hidden" v-model="questionario.id" />
			<b-row>
				<b-col md="4" sm="12" v-if="mode === 'save'">
					<b-form-group label="Turma:" label-for="questionario-turma">
						<b-form-select 
							id="questionario-turma"
							v-model="questionario.turmaId"
							:options="turmas"
						/>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="12">
					<b-form-group label="Data Início:" label-for="questionario-inicio">
						<b-form-datepicker
							id="questionario-inicio"
							required
							v-model="questionario.dataInicio"
							:readonly="mode === 'remove'"
						/>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="12">
					<b-form-group label="Data Fim:" label-for="questionario-fim">
						<b-form-datepicker
							id="questionario-fim"
							required
							v-model="questionario.dataFim"
							:readonly="mode === 'remove'"
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
		<b-table hover striped :fields="fields" :items="questionarios">
			<template #cell(actions)="data">
				<router-link 
					class="btn btn-info mr-2"
					:to="`questionario/${data.item.id}/quiz`"
					target="_blank"
				>
					<i class="fas fa-tasks"></i>
				</router-link>
				<b-button variant="warning" @click="loadQuestionario(data.item)" class="mr-2">
					<i class="fas fa-pencil-alt"></i>
				</b-button>
				<b-button variant="danger" @click="loadQuestionario(data.item, 'remove')">
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
import { questionarios } from '@/data';

@Component({
  components: {
		AdminLayout
	}
})
export default class Questionario extends Vue { 
	mode = 'save';

	questionario = {};
	questionarios = questionarios;

	turmas = [ 'Turma 1', 'Turma 2', 'Turma 3' ];
  
  public fields: unknown[] = [
    { key: 'turma', label: 'Turma', sortable: true },
    { key: 'inicio', label: 'Início', sortable: true },
    { key: 'fim', label: 'Fim', sortable: true },
    { key: 'actions', label: 'Ações' }
	];

  public page = 1;
  public limit = 0;
  public count = 0;

  public mounted(): void {
    this.loadQuestionarios();
  }

  private async loadQuestionarios(): Promise<void> {}

  public loadQuestionario(questionario, mode = 'save'): void {
    this.mode = mode;
    this.questionario = questionario;
  }

  public reset(): void {
    this.mode = 'save';
    this.questionario = {};
    this.loadQuestionarios();
  }

  public async save(): Promise<void> {}

  public async remove(): Promise<void> {}
}
</script>

<style lang="scss">

</style>
