<template>
	<ContentAdmin
		icon="icon-layers"
		title="Administração"
		subtitle="Alunos"
	>
		<b-form>
			<input id="aluno-id" type="hidden" v-model="aluno.id" />
			<b-row>
				<b-col sm="3" xs="12">
					<b-form-group label="Turma:" label-for="aluno-turma">
						<b-form-select 
							id="aluno-turma"
							v-model="aluno.turmaId"
							:options="turmas"
              :disabled="mode === 'remove'"
						>
              <template #first>
                <b-form-select-option :value="0" disabled>Selecione a turma...</b-form-select-option>
              </template>
            </b-form-select>
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
		<b-table responsive hover striped :fields="fields" :items="alunos">
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
	</ContentAdmin>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import ContentAdmin from './template/ContentAdmin.vue';
import api from '@/services/api';
import View from '@/models/view';
import Turma from '@/models/turma';
import Aluno from '@/models/aluno';

@Component({
  components: {
		ContentAdmin
	}
})
export default class AlunoView extends View { 
	mode = 'save';

	aluno: Aluno = new Aluno();
	alunos: Aluno[] = [];
	turmas: unknown[] = [];
  
  fields: unknown[] = [
    { key: 'id', label: 'Código', sortable: true },
    { key: 'turma', label: 'Turma', sortable: true },
    { key: 'matricula', label: 'Matrícula', sortable: true },
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'actions', label: 'Ações', class: 'd-flex' }
  ];

  page = 1;
  limit = 0;
  count = 0;

  mounted(): void {
    this.loadTurmas();
    this.loadAlunos();
  }

  async loadAlunos(): Promise<void> {
    try {
      const res = await api.get(`/alunos?page=${this.page}`);
      if (res && res.data) {
        const { data, count, limit } = res.data;

        this.alunos = data.map((a: unknown) => new Aluno(a));
        this.count = count;
        this.limit = limit;
      }
    } catch (err) {
      this.showError(err);
      this.alunos = [];
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

  async loadAluno(aluno: Aluno, mode = 'save'): Promise<void> {
    this.mode = mode;
    try {
      const res = await api.get(`/alunos/${aluno.id}`)
      this.aluno = new Aluno(res.data);
    } catch (err) {
      this.showError(err);
    }
  }

  reset(): void {
    this.mode = 'save';
    this.aluno = new Aluno();
    this.loadAlunos();
  }

  async save(): Promise<void> {
    const method = this.aluno.id ? 'put' : 'post';
    const id = this.aluno.id ? `/${this.aluno.id}` : '';

    try {
      const aluno = { 
        id: this.aluno.id,
        turmaId: this.aluno.turmaId,
        matricula: this.aluno.matricula,
        nome: this.aluno.nome
      };

      await api[method](`/alunos${id}`, { ...aluno });

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    }
  }

  async remove(): Promise<void> {
    const id = this.aluno.id;
    try {
      await api.delete(`/alunos/${id}`);

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError();
    }
  }
}
</script>

<style lang="scss">

</style>
