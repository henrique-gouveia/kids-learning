<template>
  <b-container fluid>
    <PageHeader icon="icon-home" main="Início" sub="Estastísticas" />
		<b-row>
			<b-col xl="3" lg="6">
				<InfoCard 
					icon="fas fa-boxes"
					variant="primary"
					description="Turmas"
					value="3"
					link="/turmas"
				/>
			</b-col>
			<b-col xl="3" lg="6">
				<InfoCard 
					icon="fas fa-users"
					variant="green"
					description="Alunos"
					value="3"
					link="/alunos"
				/>
			</b-col>
			<b-col xl="3" lg="6">
				<InfoCard 
					icon="fas fa-book"
					variant="danger"
					description="Questões"
					value="5"
					link="/questoes"
				/>
			</b-col>
			<b-col xl="3" lg="6">
				<InfoCard 
					icon="fas fa-clipboard-list"
					variant="warning"
					description="Questionários"
					value="0"
					link="/questionarios"
				/>
			</b-col>
		</b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageHeader from "@/components/PageHeader.vue";
import InfoCard from '@/components/InfoCard.vue';

@Component({
  components: {
    PageHeader,
		InfoCard
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
</style>
