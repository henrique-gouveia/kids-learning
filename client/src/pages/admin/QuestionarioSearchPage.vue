<template>
	<ContentAdmin
		icon="icon-note"
		title="Relatório"
		subtitle="Questionário"
	>
		<b-form>
			<b-row>
				<b-col md="4" sm="12">
          <b-form-group label="Turma:" label-for="questionario-turma">
						<b-form-select
							id="questionario-turma"
							v-model="questionario.turmaId"
							:options="turmas"
						>
              <template #first>
                <b-form-select-option :value="0" disabled>Selecione a turma...</b-form-select-option>
              </template>
            </b-form-select>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="12">
					<b-form-group label="Data Início:" label-for="questionario-inicio">
						<b-form-datepicker
							id="questionario-inicio"
							required
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              lang="pt-BR"
              :hide-header="true"
							v-model="questionario.dataInicio"
						/>
					</b-form-group>
				</b-col>
				<b-col md="4" sm="12">
					<b-form-group label="Data Fim:" label-for="questionario-fim">
						<b-form-datepicker
							id="questionario-fim"
							required
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              lang="pt-BR"
              :hide-header="true"
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
		<b-table
      responsive
      hover
      striped
      show-empty
      :fields="fields"
      :items="questionarios"
      :busy="loading"
    >
      <template #table-busy>
        <div class="text-center my-1">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="align-middle ml-2">Carregando...</strong>
        </div>
      </template>
      <template #empty class="text-center">
        <p class="text-center">Nenhum questionário encontrado</p>
      </template>
      <template #cell(dataInicio)="row">
        {{ row.value | date }}
      </template>
      <template #cell(dataFim)="row">
        {{ row.value | date }}
      </template>
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
	</ContentAdmin>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import ContentAdmin from './template/ContentAdmin.vue';
import api from '@/services/api';
import VuePage from '@/models/vuePage'
import Turma from '@/models/turma';
import Questionario from '@/models/questionario';

@Component({
  components: {
		ContentAdmin
	}
})
export default class QuestionarioSearchPage extends VuePage {
  loading = false;

	questionario: Questionario = new Questionario();
	questionarios: Questionario[] = [];
  turmas: unknown[] = [];

  public fields: unknown[] = [
    { key: 'turma', label: 'Turma', sortable: true },
    { key: 'dataInicio', label: 'Início', sortable: true },
    { key: 'dataFim', label: 'Fim', sortable: true },
    { key: 'actions', label: 'Ações' }
	];

  page = 1;
  limit = 0;
  count = 0;

  mounted(): void {
    this.loadTurmas();
    this.loadQuestionarios();
  }

  async loadQuestionarios(): Promise<void> {
    this.loading = true;
    try {
      const res = await api.get(`/questionarios?page=${this.page}`);
      if (res && res.data) {
        const { data, count, limit } = res.data;

        this.questionarios = data.map((a: unknown) => new Questionario(a));
        this.count = count;
        this.limit = limit;
      }
    } catch (err) {
      this.showError(err);
      this.questionarios = [];
    } finally {
      this.loading = false;
    }
  }

  async loadTurmas(): Promise<void> {
    try {
      const res = await api.get(`/turmas`);
      if (res && res.data) {
        this.turmas = res.data.map((t: Turma) => ({ value: t.id, text: t.nome }));
      }
    } catch (err) {
      this.showError(err);
      this.turmas = [];
    }
  }

	public reset(): void {
    this.page = 1;
    this.questionario = new Questionario();
    this.loadQuestionarios();
  }
}
</script>

<style lang="scss">

</style>
