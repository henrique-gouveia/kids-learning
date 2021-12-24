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
            v-else
            :label="`${questao.tipo === 'Vocabulário' ? 'Imagem' : 'Audio'}`"
          >
            <VueFileAgent
              ref="fileAgent"
              :theme="'list'"
              :multiple="false"
              :deletable="mode === 'save'"
              :accept="'image/*,audio/*'"
              :maxSize="'10MB'"
              :helpText="`Selecionar ${questao.tipo === 'Vocabulário' ? 'Imagem' : 'Audio'}`"
              :errorText="{
                type: `Tipo de arquivo inválido, apenas arquivos de ${questao.tipo === 'Vocabulário' ? 'Imagem' : 'Audio'} são permitidos.`,
                size: 'Arquivo não pode exceder 10MB',
              }"
              v-model="arquivos"
              @select="filesSelected($event)"
              @beforedelete="beforeFileDelete($event)"
              @delete="fileDeleted($event)"
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
					<b-button variant="primary" v-if="mode === 'save'" @click="save" :disabled="loading">
						Salvar
            <template v-if="loading">
              <b-spinner small type="grow" class="ml-1"></b-spinner>
              <span class="sr-only ml-1">Salvando...</span>
            </template>
					</b-button>
					<b-button variant="danger" v-if="mode === 'remove'" @click="remove" :disabled="loading">
						Excluir
            <template v-if="loading">
              <b-spinner small type="grow" class="ml-1"></b-spinner>
              <span class="sr-only ml-1">Excluindo...</span>
            </template>
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
      :items="questoes"
      :busy="loading"
    >
      <template #table-busy>
        <div class="text-center my-1">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="align-middle ml-2">Carregando...</strong>
        </div>
      </template>
      <template #empty class="text-center">
        <p class="text-center">Nenhuma questão encontrada</p>
      </template>
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
import { Component, Watch } from 'vue-property-decorator';
import ContentAdmin from './template/ContentAdmin.vue';
import api from '@/services/api';
import View from '@/models/view';
import Arquivo from '@/models/Arquivo';
import Questao from '@/models/questao';

@Component({
  components: {
    ContentAdmin
	}
})
export default class QuestaoView extends View {
	mode = 'save';
  loading = false;

	questao = new Questao();
	questoes: Questao[] = [];

  arquivos: any[] = [];
  arquivoToSave: any = null;
  arquivoToRemove: any = null;

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
    this.loading = true;
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
    } finally {
      this.loading = false;
    }
  }

  async loadQuestao(questao: Questao, mode = 'save'): Promise<void> {
    this.mode = mode;
    try {
      this.resetArquivo();

      const res = await api.get(`/questoes/${questao.id}`)
      this.questao = new Questao(res.data);

      if (this.questao.arquivo)
      {
        const {
          nomeOriginal: name,
          tipo: type,
          tamanho: size,
          url
        } = this.questao.arquivo;

        this.arquivos = [{ name, size, type, url}];
      }
    } catch (err) {
      this.showError(err);
    }
  }

  async save(): Promise<void> {
    this.loading = true;

    const method = this.questao.id ? 'put' : 'post';
    const id = this.questao.id ? `/${this.questao.id}` : '';

    try {
      let arquivo;

      await this.removeArquivo();
      const res = await this.saveArquivo();
      if (res && res.data)
        arquivo = new Arquivo(res.data);

      const questao = {
        id: this.questao.id,
        arquivoId: this.arquivoToSave && arquivo && arquivo.id || !this.arquivoToRemove && this.questao.arquivoId,
        tipo: this.questao.tipo,
        enunciado: this.questao.enunciado,
        texto: this.questao.tipo === 'Leitura' ? this.questao.texto : null,
        respostas: this.questao.respostas,
      };

      await api[method](`/questoes${id}`, { ...questao });

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    } finally {
      this.loading = false;
    }
  }

  saveArquivo(): Promise<any> {
    if (this.arquivoToSave) {
      const formData = new FormData();
      formData.append('file', this.arquivoToSave);

      return api.post(`/arquivos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    }

    return Promise.resolve();
  }

  async remove(): Promise<void> {
    this.loading = true;

    const id = this.questao.id;
    try {
      await api.delete(`/questoes/${id}`);

      this.showSuccess();
      this.reset();
    } catch (err) {
      this.showError(err);
    } finally {
      this.loading = false;
    }
  }

  removeArquivo(): Promise<any> {
    if (this.arquivoToRemove) {
      const arquivoId = this.questao.arquivoId;
      return api.delete(`/arquivos/${arquivoId}`);
    }

    return Promise.resolve();
  }

  reset(): void {
    this.mode = 'save';
    this.page = 1;
    this.questao = new Questao();
    this.resetArquivo();
    this.loadQuestoes();
  }

  resetArquivo(): void {
    this.arquivos = [];
    this.arquivoToSave = null;
    this.arquivoToRemove = null;
  }

  filesSelected(filesSelected: any): void {
    const files = filesSelected.filter(f => !f.error);
    this.arquivoToSave = files[0].file;
  }

  beforeFileDelete(file: any): void {
    (this.$refs.fileAgent as any).deleteFileRecord(file);
  }

  fileDeleted(fileDeleted: any): void {
    this.arquivoToSave = null;
    this.arquivoToRemove = fileDeleted.file || fileDeleted;
  }

  @Watch('page')
  onChangePage(): void {
    this.loadQuestoes();
  }
}
</script>

<style lang="scss">

</style>
