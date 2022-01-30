<template>
  <div class="quiz-content">
    <div class="quiz-authorization" v-if="!autorizado">
      <div class="quiz-authorization__title">Mátrícula</div>
      <div>
        <b-form-input
          type="text"
          placeholder="Informe a matrícula..."
          class="quiz-authorization__indentity text-center"
          autocomplete="off"
          v-model="aluno.matricula"
        />
      </div>
      <div>
        <b-button
          pill
          size="lg"
          variant="purple"
          class="btn-quiz mt-3"
          @click="loadAluno"
          :disabled="!aluno.matricula"
        >
          Confirmar
        </b-button>
      </div>
    </div>
    <div class="quiz-question m-3" v-else>
      <div class="quiz-question__title text-center">
        {{ questao.enunciado }}
      </div>
      <div class="quiz-question__complement">
        <img
          class="img-fluid mt-2"
          alt="Imagem"
          width="120"
          v-if="questao.haImagem()"
          :src="questao.arquivo.url"
        />
        <audio
          controls
          class="mt-2"
          v-if="questao.haVideo()"
        >
          <source :src="questao.arquivo.url" :type="questao.arquivo.tipo">
          Seu browser não suporta o player de audio.
        </audio>
        <div
          class="ql-editor"
          v-if="questao.texto"
          v-html="questao.texto"
        />
      </div>
      <div
        class="quiz-question__answers"
        v-for="resposta in questao.respostas"
        :key="`${questao.id}-${resposta.alternativa}`"
      >
        <div
          class="quiz-question__answers-container"
          :class="{ 'quiz-question__answers-container--revealed': resposta.revelada }">
          <div
            class="quiz-question__answer-front"
            v-if="!resposta.revelada"
            @click="() => questao.selecionarResposta(resposta.alternativa)"
          >
            <div class="quiz-question__answer-option" :style="`background-color: ${resposta.alternativaCor}`">
              {{ resposta.alternativa }}
            </div>
            <div class="quiz-question__answer-title">
              {{ resposta.descricao }}
            </div>
          </div>
          <div
            class="quiz-question__answer-back"
            v-else
          >
            <div class="quiz-question__answer--right" v-if="resposta.correta">
              <div>A resposta certa é...</div>
              <div class="quiz-question__answer-title">{{ resposta.descricao }}</div>
            </div>
            <div class="quiz-question__answer--wrong" v-else>
              <div>A resposta informada está errada...</div>
              <div class="quiz-question__answer-title">{{ resposta.descricao }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-3">
        <b-button
          pill
          size="lg"
          variant="green"
          class="btn-quiz"
          v-if="isLastPage"
          :disabled="!questao.haRespostaSelecionada()"
          @click="finalize"
        >
          Finalizar {{ pagelabel }}
        </b-button>
        <b-button
          pill
          size="lg"
          variant="purple"
          class="btn-quiz"
          @click="next"
          v-else
          :disabled="!questao.haRespostaSelecionada()"
        >
          Próxima {{ pagelabel }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import api from '@/services/api';
import VuePage from '@/models/vuePage';
import Aluno from '@/models/aluno';
import Questao from '@/models/questao';

@Component
export default class QuizPage extends VuePage {

  autorizado = false;

  questionarioId = '';
  currentPage = 0;

  aluno = new Aluno();
  questao = new Questao();
  questoes: Questao[] =  [];

  mounted(): void {
    const { id: questionarioId } = this.$route.params;
    this.loadQuestoes(questionarioId);
  }

  async loadQuestoes(questionarioId: string): Promise<void> {
    this.questionarioId = questionarioId;
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

  async loadAluno(): Promise<void> {
    if (this.questionarioId && this.aluno?.matricula)
    try {
      const res = await api.get(`/questionarios/${this.questionarioId}/alunos/${this.aluno.matricula}`);
      if (res && res.data) {
        this.aluno = new Aluno(res.data);
        this.autorizado = true;
      }
    } catch (err) {
      this.autorizado = false;
      this.showError(err);
    }
  }

  get isFirstPage(): boolean {
    return this.currentPage == 0;
  }

  get isLastPage(): boolean {
    return this.currentPage == this.questoes.length - 1;
  }

  get pagelabel(): string {
    return `${this.currentPage + 1} / ${this.questoes.length}`
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

  finalize(): void {
    const total = this.questoes.length;
    const certas = this.questoes.filter(q => q.acertou).length;

    this.$router.replace(`${this.questionarioId}/resultado?total=${total}&certas=${certas}`);
  }

  @Watch('currentPage')
  onChangeCurrentPage(): void {
    this.questao = this.questoes[this.currentPage];
  }
}
</script>

<style lang="scss">
@import '~quill/dist/quill.core.css';

.quiz-content {
  .quiz-authorization {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .quiz-authorization__title {
      font-size: 2.5rem;
      font-weight: 700;
    }

    .quiz-authorization__indentity {
      font-size: 1.5rem;
      font-weight: 700;
      padding: 10px;
      height: 60px;
      max-width: 280px;
    }
  }

  .quiz-question {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;

    .quiz-question__title {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .quiz-question__complement {
      background-color: #6c5fb4;
      padding: 15px;
      border-radius: 12px;
      margin: 15px;

      & p {
        font-size: 1.0rem;
      }

      & pre {
        padding: 30px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #fff;
      }

      & img {
        max-width: 100%;
      }

      & :last-child {
        margin-bottom: 0;
      }
    }

    .quiz-question__answers {
      display: flex;
      width: 80%;
      min-width: 300px;
      height: 80px;
      margin: 15px;
      cursor: pointer;

      .quiz-question__answers-container {
        position: relative;
        display: flex;
        flex: 1;
        transition: transform 0.8s;
        transform-style: preserve-3d;

        .quiz-question__answer-front, .quiz-question__answer-back {
          position: absolute;
          display: flex;
          height: 100%;
          width: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .quiz-question__answer-front {
          align-items: center;
          border-radius: 12px;
          padding: 15px;
          color: #000;
          background-color: #fff;
        }

        .quiz-question__answer-back  {
          transform: rotateY(180deg);
        }

        .quiz-question__answer-back > div {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
        }

        .quiz-question__answer-option {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 20px;
          height: 40px;
          width: 40px;
          border-radius: 20px;
          font-size: 1.5rem;
          font-weight: 500;
          color: #fff;
          background-color: #F2C866;
        }

        .quiz-question__answer-title {
          font-size: 1.2rem;
          font-weight: 400;
        }

        .quiz-question__answer--right {
          background-color: #37bc9b;
        }

        .quiz-question__answer--wrong {
          background-color: #f05050;
        }
      }

      .quiz-question__answers-container--revealed {
        transform: rotateY(180deg);
      }
    }
  }
}

.btn-quiz {
  font-size: 1.0rem;
  font-weight: 400;
  transition: all .2s ease-in-out;

  &:hover {
      transform: scale(1.1);
  }
}
</style>
