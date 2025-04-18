<template>
	<ContentAdmin
		icon="icon-layers"
		title="Administração"
		subtitle="Questionário"
	>
		<b-form>
			<input id="questionario-id" type="hidden" v-model="questionario.id" />
			<b-row>
				<b-col md="3" sm="12">
					<b-form-group label="Turma:" label-for="questionario-turma">
						<b-form-select
							id="questionario-turma"
							v-model="questionario.turmaId"
							:options="turmas"
              :disabled="mode === 'remove'"
						>
              <template #first>
                <b-form-select-option :value="0" disabled>Selecione a turma...</b-form-select-option>
              </template>
            </b-form-select>
					</b-form-group>
				</b-col>
				<b-col md="3" sm="12">
					<b-form-group label="Data Início:" label-for="questionario-inicio">
						<b-form-datepicker
							id="questionario-inicio"
							required
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              lang="pt-BR"
              :hide-header="true"
							v-model="questionario.dataInicio"
							:readonly="mode === 'remove'"
						/>
					</b-form-group>
				</b-col>
				<b-col md="3" sm="12">
					<b-form-group label="Data Fim:" label-for="questionario-fim">
						<b-form-datepicker
							id="questionario-fim"
							required
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              lang="pt-BR"
              :hide-header="true"
							v-model="questionario.dataFim"
							:readonly="mode === 'remove'"
						/>
					</b-form-group>
				</b-col>
				<b-col md="3" sm="12">
					<b-form-group label="Qtde Questões:" label-for="questionario-quantidade-questoes">
						<b-form-spinbutton
							id="questionario-quantidade-questoes"
							min="1"
              max="100"
							v-model="questionario.quantidadeQuestoes"
              :disabled="mode === 'remove'"
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
				<b-button
          variant="info"
          class="mr-2"
          v-b-tooltip.hover
          title="Copiar link"
          @click="() => copyLink(`quiz/${data.item.id}`)"
        >
					<i class="far fa-copy"></i>
				</b-button>
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
	</ContentAdmin>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
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
export default class QuestionarioPage extends VuePage {
	mode = 'save';
  loading = false;

	questionario: Questionario = new Questionario();
	questionarios: Questionario[] = [];
  turmas: unknown[] = [];

  fields: unknown[] = [
    { key: 'turma', label: 'Turma', sortable: true },
    { key: 'dataInicio', label: 'Início', sortable: true },
    { key: 'dataFim', label: 'Fim', sortable: true },
    { key: 'quantidadeQuestoes', label: 'Qtde Questões', sortable: true },
    { key: 'actions', label: 'Ações', class: 'd-flex' }
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

  loadQuestionario(questionario: Questionario, mode = 'save'): void {
    this.mode = mode;
    this.questionario = questionario;
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

  reset(): void {
    this.mode = 'save';
    this.page = 1;
    this.questionario = new Questionario();
    this.loadQuestionarios();
  }

  async save(): Promise<void> {
    const method = this.questionario.id ? 'put' : 'post';
    const id = this.questionario.id ? `/${this.questionario.id}` : '';

    try {
      const questionario = {
        id: this.questionario.id,
        turmaId: this.questionario.turmaId,
        dataInicio: this.questionario.dataInicio,
        dataFim: this.questionario.dataFim,
        quantidadeQuestoes: this.questionario.quantidadeQuestoes
      };

      await api[method](`/questionarios${id}`, { ...questionario });

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    }
  }

  async remove(): Promise<void> {
    const id = this.questionario.id;
    try {
      await api.delete(`/questionarios/${id}`);

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    }
  }

  copyLink(path: string): void {
    navigator.clipboard.writeText(`${window.location.origin}/${path}`);
    this.showSuccess('Copiado!');
  }

  @Watch('page')
  onChangePage(): void {
    this.loadQuestionarios();
  }
}
</script>

<style lang="scss">

</style>
