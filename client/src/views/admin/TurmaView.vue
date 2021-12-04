<template>
	<ContentAdmin
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
		<b-table responsive hover striped :fields="fields" :items="turmas">
			<template #cell(actions)="data">
				<b-button variant="warning" @click="loadTurma(data.item)" class="mr-2">
					<i class="fas fa-pencil-alt"></i>
				</b-button>
				<b-button variant="danger" @click="loadTurma(data.item, 'remove')">
					<i class="fas fa-trash-alt"></i>
				</b-button>
			</template>
		</b-table>
	</ContentAdmin>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import ContentAdmin from './template/ContentAdmin.vue';
import api from '@/services/api';
import View from '@/models/view';
import Turma from '@/models/turma';

@Component({
  components: {
		ContentAdmin
	}
})
export default class TurmaView extends View { 
	mode = 'save';

	turma: Turma = new Turma();
	turmas: Turma[] = [];
  
  fields: unknown[] = [
    { key: 'id', label: 'Código', sortable: true },
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'actions', label: 'Ações', class: 'd-flex' }
  ];

  mounted(): void {
    this.loadTurmas();
  }

  async loadTurmas(): Promise<void> {
    try {
      const res = await api.get(`/turmas`);
      if (res && res.data) {
        this.turmas = res.data.map((t: unknown) => new Turma(t));
      }
    } catch (err) {
      this.showError(err);
      this.turmas = [];
    }
  }

  async loadTurma(turma: Turma, mode = 'save'): Promise<void> {
    this.mode = mode;
    try {
      const res = await api.get(`/turmas/${turma.id}`)
      this.turma = new Turma(res.data);
    } catch (err) {
      this.showError(err);
    }
  }

  reset(): void {
    this.mode = 'save';
    this.turma = new Turma();
    this.loadTurmas();
  }

  async save(): Promise<void> {
    const method = this.turma.id ? 'put' : 'post';
    const id = this.turma.id ? `/${this.turma.id}` : '';

    let res = {};
    try {
      res = await api[method](`/turmas${id}`, { ...this.turma });
      
      this.showSuccess();
      this.reset();
    } catch (err: any) {
      this.showError(err);
    }
  }

  async remove(): Promise<void> {
    try {
      await api.delete(`/turmas/${this.turma.id}`);

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    }
  }

  @Watch('page')
  onChangePage(): void {
    this.loadTurmas();
  }
  
}
</script>

<style lang="scss">

</style>
