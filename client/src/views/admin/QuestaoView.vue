<template>
	<ContentAdmin
		icon="icon-layers"
		title="Administração"
		subtitle="Questões"
	>
		<b-form>
			<input id="questao-id" type="hidden" v-model="questao.id" />
			<b-row>
				<b-col sm="4" xs="12">
					<b-form-group label="Tipo:" label-for="questao-tipo">
            <b-form-radio-group 
							id="questao-tipo"
							v-model="questao.tipo"              
							:options="tipos"
              :disabled="mode === 'remove'"
            />
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col xs="12">
					<b-form-group label="Enunciado:" label-for="questao-enunciado">
						<b-form-input
							id="questao-enunciado"
							type="text"
							placeholder="Informe o enunciado da Questão..."
							required
							:readonly="mode === 'remove'"
							v-model="questao.enunciado"
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
				<b-col xs="12">
					<b-form-group 
            v-if="questao.tipo === 'Leitura' && mode === 'save'"
            label="Texto:" 
            label-for="questao-texto"
          >
            <VueEditor
              v-model="questao.texto"
              placeholder="Informe o texto da Questão (Opcional)..."
            />
          </b-form-group>
					<b-form-group 
            v-else-if="questao.tipo === 'Vocabulário'"
            label="Imagem:" 
            label-for="questao-imagem-url"
          >
						<b-form-input
							id="questao-imagem-url"
							type="text"
							placeholder="Informe o endereço da imagem da Questão (Opcional)..."
							required
							:readonly="mode == 'remove'"
							v-model="questao.imagemUrl"
						/>
					</b-form-group>
					<b-form-group 
            v-else-if="questao.tipo === 'Audição'"
            label="Audio:" 
            label-for="questao-audio-url"
          >
						<b-form-input
							id="questao-audio-url"
							type="text"
							placeholder="Informe o endereço para o audio da Questão..."
							required
							:readonly="mode === 'remove'"
							v-model="questao.audioUrl"
						/>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row v-if="mode === 'save'">
				<b-col cols="12">
					<b-form-group label="Respostas:">
						<b-row>
							<b-col 
                sm="12" 
                class="mb-2"                 
                v-for="(resposta, idx) in questao.respostas"
                :key="idx"
              >
								<b-input-group>
                  <b-input-group-prepend 
                    is-text 
                    class="input-group-prepend-md"
                    v-b-tooltip.hover 
                    title="Selecionar como a resposta correta"
                  >
                    <b-form-radio 
                      class="mr-n2"
                      name="questao-resposta-correta"
                      v-model="questao.alternativaCorreta"
                      :value="questao.respostas[idx].alternativa"
                    >
                      <span class="sr-only">Selecionar como a resposta correta</span>
                    </b-form-radio>
                  </b-input-group-prepend>

									<b-form-input 
										placeholder="Informe a resposta..."
                    v-model="questao.respostas[idx].descricao"
                    :readonly="mode == 'remove'"
                    class="form-control"
                    :class="{ 'is-valid': questao.respostas[idx].correta }"
									/>

									<b-input-group-append class="input-group-append-md">
										<b-button variant="success" class=" ml-1 mr-1" @click="() => questao.AddResposta()">
											<em class="fa fa-plus"></em>
										</b-button>
										<b-button variant="danger" @click="() => questao.removeReposta(resposta.alternativa)">
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
		<b-table responsive hover striped :fields="fields" :items="questoes">
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
	</ContentAdmin>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import ContentAdmin from './template/ContentAdmin.vue';
import api from '@/services/api';
import View from '@/models/view';
import Questao from '@/models/questao';

@Component({
  components: {
    ContentAdmin
	}
})
export default class QuestaoView extends View { 
	mode = 'save';

	questao = new Questao();
	questoes: Questao[] = [];

	tipos = [ 'Vocabulário', 'Leitura', 'Audição' ];
  
  fields: unknown[] = [
		{ key: 'id', label: 'Código', sortable: true },
    { key: 'tipo', label: 'Tipo', sortable: true },
    { key: 'enunciado', label: 'Enunciado', sortable: true },
    { key: 'actions', label: 'Ações', class: 'd-flex' }
	];

  page = 1;
  limit = 0;
  count = 0;

  mounted(): void {
    this.loadQuestoes();
  }

  async loadQuestoes(): Promise<void> {
    try {
      const res = await api.get(`/questoes?page=${this.page}`);
      if (res && res.data) {
        const { data, count, limit } = res.data;

        this.questoes = data.map((a: unknown) => new Questao(a));
        this.count = count;
        this.limit = limit;
      }
    } catch (err) {
      this.showError(err);
      this.questoes = [];
    }
  }

  async loadQuestao(questao, mode = 'save'): Promise<void> {
    this.mode = mode;
    try {
      const res = await api.get(`/questoes/${questao.id}`)
      this.questao = new Questao(res.data);
    } catch (err) {
      this.showError(err);
    }
  }

  reset(): void {
    this.mode = 'save';
    this.questao = new Questao();
    this.loadQuestoes();
  }

  async save(): Promise<void> {
    const method = this.questao.id ? 'put' : 'post';
    const id = this.questao.id ? `/${this.questao.id}` : '';

    try {
      const questao = { 
        id: this.questao.id,
        tipo: this.questao.tipo,
        enunciado: this.questao.enunciado,
        texto: this.questao.tipo === 'Leitura' ? this.questao.texto : null,
        imagemUrl: this.questao.tipo === 'Vocabulário' ? this.questao.imagemUrl : null,
        audioUrl: this.questao.tipo === 'Audição' ? this.questao.audioUrl : null,
        respostas: this.questao.respostas
      };

      await api[method](`/questoes${id}`, { ...questao });

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    }
  }

  async remove(): Promise<void> {
    const id = this.questao.id;
    try {
      await api.delete(`/questoes/${id}`);

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    }
  }
}
</script>

<style lang="scss">

</style>
