<template>
  <ContentWrapper>
    <b-container fluid>
      <ContentHeader
        :icon="icon"
        :main="title"
        :sub="subtitle"
      />
      <div>
        <b-card no-body>
          <b-card-body>
            <slot></slot>
          </b-card-body>
        </b-card>
      </div>
    </b-container>
  </ContentWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ContentWrapper from '@/pages/template/ContentWrapper.vue'
import ContentHeader from './ContentHeader.vue'

@Component({
  components: {
		ContentHeader,
    ContentWrapper
	}
})
export default class ContentAdmin extends Vue {
	@Prop({ default: "" }) public icon!: string;
  @Prop({ default: "" }) public title!: string;
  @Prop({ default: "" }) public subtitle!: string;
}
</script>

<style lang="scss">

</style>
