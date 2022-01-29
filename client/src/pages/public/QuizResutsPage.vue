<template>
  <b-container>
    <div class="quiz-results-wrapper">
      <div class="quiz-results__title m-3">
        <h1>Resultado:</h1>
      </div>
      <SimpleCard
        variant="info"
        icon="icon-list"
        :value="total"
        description="Total de questões"
      />
      <SimpleCard
        variant="success"
        icon="icon-check"
        :value="acertos"
        description="Acertos"
      />
      <SimpleCard
        variant="danger"
        icon="icon-close"
        :value="erros"
        description="Erros"
      />
      <SimpleCard
        variant="warning"
        icon="icon-trophy"
        :value="`${percentual}%`"
        description="Aproveitamento"
      />
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SimpleCard from "@/components/SimpleCard.vue"

@Component({
  components: {
    SimpleCard
  }
})
export default class QuizResultPage extends Vue {

  total = 0;
  acertos = 0;
  erros = 0;
  percentual = 0;

  created(): void {
    const { total = 0, certas = 0 } = this.$route.query;

    this.total = +total;
    this.acertos = +certas;
    this.erros = this.total - this.acertos;

    this.percentual = this.total ? Math.round((this.acertos / this.total) * 100) : 0;
  }
}
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  background-color: #6c5fb4;
  color: #fff;

  .quiz-results-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
}
</style>
