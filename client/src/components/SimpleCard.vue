<template>
  <div :class="`card bg-${variant}-dark border-0`">
    <div class="row align-items-center mx-0">
      <div class="col-4 text-center">
        <em :class="`${icon} fa-3x`"></em>
      </div>
      <div :class="`col-8 py-4 bg-${variant} rounded-right`">
        <div class="h1 m-0 text-bold">{{ value }}</div>
        <div class="text-uppercase">{{ description }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class SimpleCard extends Vue {
	@Prop({ default: "primary" }) variant!: string;
	@Prop({ default: "" }) icon!: string;
	@Prop({ default: "" }) description!: string;
	@Prop({ default: 0 }) value!: number;
}
</script>

<style lang="scss">
.card {
  min-width: 250px;
}
</style>
