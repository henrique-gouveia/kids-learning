<template>
	<b-card no-body :bg-variant="variant" class="border-0">
		<b-card-header>
			<b-row class="align-items-center">
				<b-col cols="3">
					<em :class="`fa ${icon} fa-5x`"></em>
				</b-col>
				<b-col cols="9" class="text-right">
					<div class="text-lg">{{ value }}</div>
					<p class="m-0">{{ description }}</p>
				</b-col>
			</b-row>
		</b-card-header>
		<router-link
			:to="link"
			class="card-footer bg-gray-dark bt0 clearfix btn-block d-flex"
			@click.stop
		>
			<span>Visualizar detalhes</span>
			<span class="ml-auto">
				<em class="fa fa-chevron-circle-right"></em>
			</span>
		</router-link>
	</b-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class InfoCard extends Vue {
	@Prop({ default: "primary" }) public variant!: string;
	@Prop({ default: "" }) public icon!: string;
	@Prop({ default: "" }) public description!: string;
	@Prop({ default: 0 }) public value!: number;
	@Prop({ default: "#" }) public link!: string;

}
</script>

<style lang="scss">
</style>