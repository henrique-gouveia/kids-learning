<template>
	<AdminLayout
		icon="icon-note"
		title="Questionário"
		subtitle="Relatório"
	>
		
	</AdminLayout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AdminLayout from './AdminLayout.vue';

@Component({
  components: {
		AdminLayout
	}
})
export default class QuestionarioReport extends Vue {}
</script>

<style lang="scss">

</style>
