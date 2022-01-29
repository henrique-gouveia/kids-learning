<template>
  <div class="quiz-wrapper">
    <!-- Page content -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class QuizLayout extends Vue {}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  background-color: #43397f;
  color: #fff;

  .quiz-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // height: 100vh;
  }
}
</style>
