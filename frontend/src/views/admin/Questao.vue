<template>
	<AdminLayout
		icon="icon-layers"
		title="Administração"
		subtitle="Questões"
	>
		<b-form>
			<input id="questao-id" type="hidden" v-model="questao.id" />
			<b-row>
				<b-col sm="4" xs="12">
					<b-form-group label="Tipo:" label-for="questao-tipo" v-if="mode === 'save'">
						<b-form-select 
							id="questao-tipo"
							v-model="questao.tipoId"
							:options="tipos"
						/>
					</b-form-group>
				</b-col>
				<b-col sm="8" xs="12">
					<b-form-group label="Titulo:" label-for="questao-titulo">
						<b-form-input
							id="questao-titulo"
							type="text"
							placeholder="Informe a título da Questão..."
							required
							:readonly="mode == 'remove'"
							v-model="questao.titulo"
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col xs="12">
					<b-form-group label="Url:" label-for="questao-url">
						<b-form-input
							id="questao-url"
							type="text"
							placeholder="Informe a url do recurso da Questão..."
							required
							:readonly="mode == 'remove'"
							v-model="questao.url"
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col cols="12">
					<b-form-group label="Respostas:">
						<b-row>
							<b-col sm="12" class="mb-2">
								<b-input-group>
									<b-form-input 
										placeholder="Informe a resposta..."
									/>
									<b-input-group-append>
										<b-button variant="success" class=" ml-1 mr-1">
											<em class="fa fa-plus"></em>
										</b-button>
										<b-button variant="danger">
											<em class="fa fa-trash"></em>
										</b-button>
									</b-input-group-append>
								</b-input-group>
							</b-col>
						</b-row>
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
		<b-table hover striped :fields="fields" :items="questoes">
			<template #cell(actions)="data">
				<b-button variant="warning" @click="loadQuestao(data.item)" class="mr-2">
					<i class="fas fa-pencil-alt"></i>
				</b-button>
				<b-button variant="danger" @click="loadQuestao(data.item, 'remove')">
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
import { questoes } from '@/data';

@Component({
  components: {
		AdminLayout
	}
})
export default class Questao extends Vue { 
	mode = 'save';

	questao = {};
	questoes = questoes;
	tipos = ['Textual', 'Visual', 'Auditiva']
  
  public fields: unknown[] = [
		{ key: 'id', label: 'Código', sortable: true },
    { key: 'tipo', label: 'Tipo', sortable: true },
    { key: 'titulo', label: 'Título', sortable: true },
    { key: 'actions', label: 'Ações' }
	];

  public page = 1;
  public limit = 0;
  public count = 0;

  public mounted(): void {
    this.loadQuestoes();
  }

  private async loadQuestoes(): Promise<void> {}

  public loadQuestao(questao, mode = 'save'): void {
    this.mode = mode;
    this.questao = questao;
  }

  public reset(): void {
    this.mode = 'save';
    this.questao = {};
    this.loadQuestoes();
  }

  public async save(): Promise<void> {}

  public async remove(): Promise<void> {}
}
</script>

<style lang="scss">

</style>
