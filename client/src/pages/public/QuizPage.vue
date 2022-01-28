<template>
  <b-container>
    <b-row class="quiz-wrapper">
      <b-col cols="12" class="accordion" role="tablist">
        <b-card class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button
              block
              v-b-toggle.ask-accordion
              variant="purple"
              class="text-left"
            >
              {{ questao.enunciado }}
            </b-button>
          </b-card-header>
          <b-collapse id="ask-accordion" visible accordion="ask-accordion" role="tabpanel">
            <div class="quiz-content">
              <img
                class="img-fluid mt-2"
                alt="Imagem"
                width="120"
                v-if="questao.tipo === 'Vocabulário' && questao.arquivo && questao.arquivo.url"
                :src="questao.arquivo.url"
              />

              <audio
                controls
                class="mt-2"
                v-if="questao.tipo === 'Audição' && questao.arquivo && questao.arquivo.url"
              >
                <source :src="questao.arquivo.url" :type="questao.arquivo.tipo">
                Seu browser não suporta o player de audio.
              </audio>

              <div
                class="quiz-text"
                v-if="questao.texto"
                v-html="questao.texto"
              ></div>
            </div>

            <b-card-body>
              <b-card
                no-body
                v-for="resposta in questao.respostas"
                :key="resposta.id"
              >
                <b-row
                  no-gutters
                  style="cursor: pointer"
                  @click="() => selectAnswer(resposta)"
                  :class="getAnswerCardColor(resposta)"
                >
                  <b-col
                    md="1"
                    class="d-flex justify-content-center align-items-center"
                    :class="!resposta.selecionada ? 'bg-gray' : ''"
                  >
                    <b-card-text>
                      <span v-if="!hasAnswerSelected()">{{ resposta.alternativa }}</span>
                      <em v-else-if="resposta.selecionada" :class="`fa-2x icon-${resposta.correta ? 'check' : 'close'}`"></em>
                      <span v-else>{{ resposta.alternativa }}</span>
                    </b-card-text>
                  </b-col>
                  <b-col md="11">
                    <b-card-body>
                      <b-card-text>{{ resposta.descricao }}</b-card-text>
                    </b-card-body>
                  </b-col>
                </b-row>
              </b-card>
            </b-card-body>
          </b-collapse>
          <div class="m-1">
            <b-button @click="previous" class="mr-1" v-if="!isFirstPage">Anterior</b-button>
            <b-button variant="purple" @click="next" v-if="!isLastPage">Próxima</b-button>
            <b-button variant="success" v-if="isLastPage">Confirmar</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import Footer from '@/pages/template/Footer.vue';
import NavBar from '@/pages/template/NavBar.vue';
import api from '@/services/api';
import VuePage from '@/models/vuePage';
import Questao from '@/models/questao';
import QuestaoResposta from '@/models/questaoReposta';

@Component({
  components: {
    NavBar,
    Footer
  }
})
export default class Quiz extends VuePage {

  currentPage = 0;
  questao = new Questao();
  questoes: Questao[] =  [];

  mounted(): void {
    const { id: questionarioId } = this.$route.params;
    this.loadQuestoes(questionarioId);
  }

  async loadQuestoes(questionarioId: string): Promise<void> {
    try {
      const res = await api.get(`/questionarios/${questionarioId}/questoes`);
      if (res && res.data) {
        this.questoes = res.data.map((a: unknown) => new Questao(a));
        this.questao = this.questoes[this.currentPage];
      }
    } catch (err) {
      this.showError(err);
      this.questoes = [];
    }
  }

  get isFirstPage(): boolean {
    return this.currentPage == 0;
  }

  get isLastPage(): boolean {
    return this.currentPage == this.questoes.length - 1;
  }

  getAnswerCardColor(resposta: QuestaoResposta): string {
    if (resposta.selecionada) {
      return resposta.correta ? 'bg-success' : 'bg-danger';
    }

    return '';
  }

  previous(): void {
    const previousPage = this.currentPage - 1;
    if (previousPage >= 0 && previousPage < this.questoes.length)
      this.currentPage = previousPage;
  }

  next(): void {
    const nextPage = this.currentPage + 1;
    if (nextPage < this.questoes.length)
      this.currentPage = nextPage;
  }

  selectAnswer(resposta: QuestaoResposta): void {
    if (!this.hasAnswerSelected())
      resposta.selecionada = true;
  }

  hasAnswerSelected(): boolean {
    const respostasSelected = this.questao.respostas.filter(a => a.selecionada == true) || [];
    return respostasSelected.length > 0;
  }

  @Watch('currentPage')
  onChangeCurrentPage(): void {
    this.questao = this.questoes[this.currentPage];
  }
}
</script>

<style lang="scss">
.quiz-wrapper {
  padding-top: 10px;

  .quiz-content {
    padding: 10px;
  }

  .quiz-text {
    background-color: #fff;
    border-radius: 8px;

    pre {
      padding: 30px;
      border-radius: 8px;
      font-size: 1.2rem;
      background-color: #1e1e1e;
      color: #fff;
    }

    img {
      max-width: 100%;
    }

    :last-child {
      margin-bottom: 0;
    }
  }
}
</style>
