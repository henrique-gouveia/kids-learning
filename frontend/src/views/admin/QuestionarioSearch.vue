<template>
	<AdminLayout
		icon="icon-note"
		title="Questionário"
		subtitle="Localizar"
	>
		<b-form>
			<b-row>
				<b-col md="4" sm="12">
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
						/>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="12">
					<b-form-group label="Data Fim:" label-for="questionario-fim">
						<b-form-datepicker
							id="questionario-fim"
							required
							v-model="questionario.dataFim"
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
			</b-row>
			<b-row>
				<b-col xs="12">
					<b-button variant="primary" @click="find">
						Buscar
					</b-button>
					<b-button class="ml-2" @click="reset">
						Limpar
					</b-button>
					<hr />
				</b-col>
			</b-row>
		</b-form>
		<b-table hover striped :fields="fields" :items="questionarios">
			<template #cell(actions)="data">
				<router-link 
					class="btn btn-green"
					:to="`${data.item.id}/relatorio`"
				>
					<i class="fas fa-chart-pie"></i>
				</router-link>
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
export default class QuestionarioSearch extends Vue { 

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

	public reset(): void {
    this.questionario = {};
  }

  public async find(): Promise<void> {}

  public async remove(): Promise<void> {}
}
</script>

<style lang="scss">

</style>
