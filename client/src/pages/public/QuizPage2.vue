<template>
  <div class="quiz-wrapper">
    <div class="questao">
      <div class="enunciado">
        <div class="texto">
          {{ currentQuestao.enunciado }}
          <div
            class="resposta"
            v-for="(resposta, i) in currentQuestao.respostas"
            :key="`${currentQuestao}-${resposta.id}`"
          >
            <div class="conteudoReposta">
              <div class="frente" v-if="!resposta.revelada">
                <div class="alternativa" :style="`background-color: ${alternativas[i].cor}`">
                  {{ alternativas[i].alternativa }}
                </div>
                <div class="descricao">
                  {{ resposta.descricao }}
                </div>
              </div>
              <div class="verso" v-else>
                <div class="certa" v-if="resposta.correta">
                  <div>A resposta certa é...</div>
                  <div class="descricao">{{ resposta.descricao }}</div>
                </div>
                <div class="errada" v-else>
                  <div>A resposta informada está errada...</div>
                  <div class="descricao">{{ resposta.descricao }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { questoes } from '@/data';

@Component
export default class QuizPage2 extends Vue {
  questoes = questoes

  currentPage = 0;
  currentQuestao = this.questoes[this.currentPage];

  alternativas = [
    { alternativa: 'A', cor: '#F2C866' },
    { alternativa: 'B', cor: '#F266BA' },
    { alternativa: 'C', cor: '#85D4F2' },
    { alternativa: 'D', cor: '#BCE596' },
  ]

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

<style>
html,
body {
  padding: 0;
  margin: 0;
  background-color: #43397f;
  color: #fff;
}

.quiz-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.questao {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.enunciado {
  display: flex;
}

.texto {
  font-size: 2rem;
  font-weight: 600;
}

.resposta {
  display: flex;
  width: 80%;
  min-width: 500px;
  height: 100px;
  margin: 10px;
}

.conteudoReposta {
  position: relative;
  display: flex;
  flex: 1;
}

.frente, .verso {
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
}

.frente {
  align-items: center;
  border-radius: 12px;
  padding: 15px;
  color: #000;
  background-color: #fff;
}

.verso > div {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
}

.certa {
  background-color: #2BAA6D;
}

.errada {
  background-color: #E44A4C;
}

.certa .descricao, .errada .descricao {
  font-size: 1.5rem;
}

.alternativa {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  background-color: #F2C866;
  margin-right: 20px;
}

.descricao {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
