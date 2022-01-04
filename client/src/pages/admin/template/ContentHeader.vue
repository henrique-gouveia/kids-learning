<template>
  <div class="page-title">
    <h1><i v-if="icon" :class="icon"></i> {{ main }}</h1>
    <h2>{{ sub }}</h2>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class ContentHeader extends Vue {
  @Prop({ default: "" }) public icon!: string;
  @Prop({ default: "" }) public main!: string;
  @Prop({ default: "" }) public sub!: string;
}
</script>

<style lang="scss">
.page-title {
  padding-top: 15px;

  h1 {
    margin: 0px;
  }

  h2 {
    color: #777;
    margin-top: 5px;
    font-size: 1.3rem;
  }
}
</style>