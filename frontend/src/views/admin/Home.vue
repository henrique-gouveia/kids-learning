<template>
	<ContentWrapper>
		<b-container fluid>
			<ContentHeader icon="icon-home" main="Início" sub="Estastísticas" />
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
						value="3"
						link="/questionarios"
					/>
				</b-col>
			</b-row>
		</b-container>
	</ContentWrapper>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoCard from '@/components/InfoCard.vue';
import ContentWrapper from '@/views/template/ContentWrapper.vue'
import ContentHeader from "./template/ContentHeader.vue";

@Component({
  components: {
    ContentHeader,
		ContentWrapper,
		InfoCard
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
</style>
