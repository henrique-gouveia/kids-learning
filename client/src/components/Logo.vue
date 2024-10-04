<template>
  <img src="@/assets/img/logo.png" alt="logo" :width="width"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Logo extends Vue {
  @Prop({ default: 250 }) width!: number;
}
</script>

<style>

</style>
