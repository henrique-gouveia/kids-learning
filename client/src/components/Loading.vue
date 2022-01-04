<template>
  <div class="loading">
    <b-spinner label="Loading..."></b-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Loading extends Vue {}
</script>

<style lang="scss">
.loading {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
