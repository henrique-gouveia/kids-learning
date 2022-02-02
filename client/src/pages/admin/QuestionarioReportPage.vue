<template>
  <ContentAdmin
    icon="icon-note"
		title="Relatório"
		subtitle="Questionário"
  >
    <b-row class="mb-3">
      <b-col lg="6">
        <h3 class="mb-3 text-center">Aproveitamento Geral</h3>
        <div>
          <PieChart
            :height="100"
            :data="acompanhamentoGeralPie.data"
            :options="acompanhamentoGeralPie.options"
            :hidden="false"
          />
        </div>
      </b-col>
      <b-col lg="6">
        <h3 class="mb-3 text-center">Aproveitamento por Habilidade</h3>
        <div>
          <RadarChart
            :height="100"
            :data="acompanhamentoPorHabilidadeRadar.data"
            :options="acompanhamentoPorHabilidadeRadar.options"
          />
        </div>
      </b-col>
    </b-row>
    <b-table
      responsive
      hover
      striped
      show-empty
      :fields="fields"
      :items="questionarioResultado.items"
      :busy="loading"
    >
      <template #table-busy>
        <div class="text-center my-1">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="align-middle ml-2">Carregando...</strong>
        </div>
      </template>
      <template #empty class="text-center">
        <p class="text-center">Nenhum aluno encontrado</p>
      </template>
      <template #cell(respondeu)="row">
				<em v-if="row.value" class="fas fa-check"></em>
			</template>
      <template #cell(vocabulario)="data">
				<b-badge class="mr-1" variant="green">Acertos: {{ data.item.acertosVocabulario }}</b-badge>
				<b-badge variant="danger">Erros: {{ data.item.errosVocabulario }}</b-badge>
			</template>
      <template #cell(leitura)="data">
				<b-badge class="mr-1" variant="green">Acertos: {{ data.item.acertosLeitura }}</b-badge>
				<b-badge variant="danger">Erros: {{ data.item.errosLeitura }}</b-badge>
			</template>
      <template #cell(audicao)="data">
				<b-badge class="mr-1" variant="green"> Acertos: {{ data.item.acertosAudicao }}</b-badge>
				<b-badge variant="danger">Erros: {{ data.item.errosAudicao }}</b-badge>
			</template>
    </b-table>
  </ContentAdmin>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import api from '@/services/api';
import VuePage from '@/models/vuePage';
import QuestionarioRealizadoTurmaResultado from '@/models/questionarioRealizadoTurmaResultado';
import PieChart from "@/components/charts/PieChart.vue";
import RadarChart from "@/components/charts/RadarChart.vue";
import ContentAdmin from './template/ContentAdmin.vue';
import { Pie, Radar } from './QuestionarioChartJS.setup';

@Component({
  components: {
    ContentAdmin,
    PieChart,
    RadarChart,
  },
})
export default class QuestionarioReportPage extends VuePage {

  loading = false;
  questionarioResultado = new QuestionarioRealizadoTurmaResultado();

  acompanhamentoGeralPie = Pie;
  acompanhamentoPorHabilidadeRadar = Radar;

  fields: unknown[] = [
    { key: 'respondeu', label: '#' },
    { key: 'matricula', label: 'Matrícula', sortable: true },
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'vocabulario', label: 'Vocabulário' },
    { key: 'leitura', label: 'Leitura' },
    { key: 'audicao', label: 'Audição' }
	];

  mounted(): void {
    const { id: questionarioId } = this.$route.params;
    this.QloaduestionarioRealizadoTurmaResultado(questionarioId);
  }

  async QloaduestionarioRealizadoTurmaResultado(questionarioId: string): Promise<void> {
    try {
      const res = await api.get(`/questionarios/${questionarioId}/resultados`);
      if (res && res.data) {
        this.questionarioResultado = new QuestionarioRealizadoTurmaResultado(res.data);
        this.loadAproveitamentoGeral();
        this.loadAproveitamentoPorHabilidade();
      }
    } catch (err) {
      this.showError(err);
      this.questionarioResultado = new QuestionarioRealizadoTurmaResultado();
    }
  }

  loadAproveitamentoGeral(): void {
    const { percentualAcertos, percentualErros } = this.questionarioResultado;
    this.acompanhamentoGeralPie.data.datasets[0].data = [percentualAcertos, percentualErros];
  }

  loadAproveitamentoPorHabilidade(): void {
    const {
      percentualAcertosAudicao,
      percentualAcertosLeitura,
      percentualAcertosVocabulario,
      percentualErrosAudicao,
      percentualErrosLeitura,
      percentualErrosVocabulario
    } = this.questionarioResultado;

    this.acompanhamentoPorHabilidadeRadar.data.datasets[0].data = [percentualAcertosAudicao, percentualAcertosLeitura, percentualAcertosVocabulario ];
    this.acompanhamentoPorHabilidadeRadar.data.datasets[1].data = [percentualErrosAudicao, percentualErrosLeitura, percentualErrosVocabulario ];
  }
}
</script>

<style lang="scss">
</style>
