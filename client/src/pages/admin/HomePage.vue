<template>
	<ContentWrapper>
		<b-container fluid>
			<ContentHeader icon="icon-home" main="Início" sub="Estastísticas" />
			<b-row>
				<b-col xl="3" lg="6">
					<LinkableCard
						icon="fas fa-boxes"
						variant="primary"
						description="Turmas"
            :loading="loading"
						:value="estatistica.turmas"
						link="/turmas"
					/>
				</b-col>
				<b-col xl="3" lg="6">
					<LinkableCard
						icon="fas fa-users"
						variant="green"
						description="Alunos"
            :loading="loading"
						:value="estatistica.alunos"
						link="/alunos"
					/>
				</b-col>
				<b-col xl="3" lg="6">
					<LinkableCard
						icon="fas fa-book"
						variant="danger"
						description="Questões"
            :loading="loading"
						:value="estatistica.questoes"
						link="/questoes"
					/>
				</b-col>
				<b-col xl="3" lg="6">
					<LinkableCard
						icon="fas fa-clipboard-list"
						variant="warning"
						description="Questionários"
            :loading="loading"
						:value="estatistica.questionarios"
						link="/questionarios"
					/>
				</b-col>
			</b-row>
		</b-container>
	</ContentWrapper>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import LinkableCard from '@/components/LinkableCard.vue';
import ContentWrapper from '@/pages/template/ContentWrapper.vue'
import ContentHeader from "./template/ContentHeader.vue";
import api from '@/services/api';
import VuePage from '@/models/vuePage';
import Estatistica from '@/models/estatistica';

@Component({
  components: {
    ContentHeader,
		ContentWrapper,
		LinkableCard
  },
})
export default class HomeView extends VuePage {
  loading = false;
  estatistica = new Estatistica();

  mounted(): void {
    this.loadEstatisticas();
  }

  async loadEstatisticas(): Promise<void> {
    this.loading = true;
    try {
      const res = await api.get(`/estatisticas`);
      if (res && res.data) {
        this.estatistica = new Estatistica(res.data);
      }
    } catch (err) {
      this.showError(err);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
</style>
