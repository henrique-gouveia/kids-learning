<template>
  <div class="quiz-wrapper">

    <NavBar />

    <section class="section-container container-fluid mt-2">
      <b-row>
        <b-col cols="12" class="accordion" role="tablist">
          <b-card class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button 
                block 
                v-b-toggle.ask-accordion 
                variant="purple"
                class="text-left"
              >
                {{ currentQuestao.titulo }}
              </b-button>
            </b-card-header>
            <b-collapse id="ask-accordion" visible accordion="ask-accordion" role="tabpanel">

              <img 
                class="img-fluid mt-2" 
                v-if="currentQuestao.imageUrl" 
                :src="currentQuestao.imageUrl" 
                alt="Imagem" 
                width="120"
              />

              <audio 
                class="mt-2" 
                controls 
                v-if="currentQuestao.audioUrl"
              >
                <source src="@/assets/audios/fruits.mp3" type="audio/mpeg">
                Seu browser não suporta o player de audio.
              </audio>

              <b-card-body>
                <b-card
                  no-body
                  v-for="resposta in currentQuestao.respostas"
                  :key="resposta.id"
                >
                  <b-row 
                    no-gutters
                    style="cursor: pointer"
                    @click="() => selectAnswer(resposta)"
                    :class="getAnswerBackgroundColor(resposta)"
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
                        <b-card-text>{{ resposta.texto }}</b-card-text>
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
    </section>
    <div class="footer-wrapper">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Footer from '@/views/template/Footer.vue';
import NavBar from '@/components/NavBar.vue';
import { questoes } from '@/data';

@Component({
  components: { 
    NavBar, 
    Footer 
  }
})
export default class Quiz extends Vue {
  questoes = questoes

  currentPage = 0;
  currentQuestao = this.questoes[this.currentPage];

  get isFirstPage(): boolean {
    return this.currentPage == 0;
  }

  get isLastPage(): boolean {
    return this.currentPage == this.questoes.length - 1;
  }

  getAnswerBackgroundColor(resposta): string {
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

  selectAnswer(resposta): void {
    if (!this.hasAnswerSelected())
      resposta.selecionada = true;
  }

  hasAnswerSelected(): boolean {
    const respostasSelected = this.currentQuestao.respostas.filter(a => a.selecionada == true) || [];
    return respostasSelected.length > 0;
  }

  @Watch('currentPage')
  onChangeCurrentPage(): void {
    this.currentQuestao = this.questoes[this.currentPage];
  }
}
</script>

<style lang="scss">
.quiz-wrapper {
  height: 100vh;
  overflow-x: hidden;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-areas: "header" "content" "footer";

  & .topnavbar-wrapper {
    grid-area: header;
  }

  & .section-container {
    grid-area: content;
  }

  & .footer-wrapper {
    grid-area: footer;
    margin: 10px;
  }
}
</style>
