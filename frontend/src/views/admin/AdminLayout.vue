<template>
  <b-container fluid>
    <PageHeader 
      :icon="icon"
      :main="title"
      :sub="subtitle"
    />
		<div class="admin-page container-fluid">
			<b-card no-body>
				<b-card-body>
					<slot></slot>
				</b-card-body>
			</b-card>
		</div>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PageHeader from '@/components/PageHeader.vue'

@Component({
  components: { 
		PageHeader
	}
})
export default class AdminLayout extends Vue { 
	@Prop({ default: "" }) public icon!: string;
  @Prop({ default: "" }) public title!: string;
  @Prop({ default: "" }) public subtitle!: string;
}
</script>

<style lang="scss">

</style>
