<template>
  <AdminLayout icon="icon-note" title="Questionário" subtitle="Relatório">
    <div class="content-heading">
      <div>
        Vue Chart JS
        <small>Vue.js wrapper for Chart.js</small>
      </div>
    </div>
    <b-container fluid class="container-md">
      <div class="row mb-3">
        <div class="col-xl-6">
          <h3 class="mb-3 py-2">Line Chart</h3>
          <div>
            <LineChart
              :height="250"
              :data="line.data"
              :options="line.options"
            />
          </div>
        </div>
        <div class="col-xl-6">
          <h3 class="mb-3 py-2">Bar Chart</h3>
          <div>
            <BarChart
              :height="250"
              :data="bar.data"
              :options="bar.options"
            />
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-lg-6">
          <h3 class="mb-3 py-2">Polar Area Chart</h3>
          <div>
            <PolarChart 
							:height="250"
							:data="polar.data"
              :options="polar.options"
						/>
          </div>
        </div>
        <div class="col-lg-6">
          <h3 class="mb-3 py-2">Radar Chart</h3>
          <div>
            <RadarChart 
							:height="250" 
							:data="radar.data"
              :options="radar.options"
						/>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-lg-6">
          <h3 class="mb-3 py-2">Pie Chart</h3>
          <div>
            <PieChart 							
							:height="250" 
							:data="pie.data"
              :options="pie.options" 
						/>
          </div>
        </div>
        <div class="col-lg-6">
          <h3 class="mb-3 py-2">Doughnut Chart</h3>
          <div>
            <DoughnutChart 
							:height="250"
							:data="doughnut.data"
              :options="doughnut.options"
						/>
          </div>
        </div>
      </div>
    </b-container>
  </AdminLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import LineChart from "@/components/charts/LineChart.vue";
import BarChart from "@/components/charts/BarChart.vue";
import DoughnutChart from "@/components/charts/DoughnutChart.vue";
import PieChart from "@/components/charts/PieChart.vue";
import PolarChart from "@/components/charts/PolarChart.vue";
import RadarChart from "@/components/charts/RadarChart.vue";

import AdminLayout from "./AdminLayout.vue";

import { Line, Bar, Doughnut, Pie, Polar, Radar } from "@/ChartJS.setup";

@Component({
  components: {
    AdminLayout,
    LineChart,
    BarChart,
    DoughnutChart,
    PieChart,
    PolarChart,
    RadarChart,
  },
})
export default class QuestionarioReport extends Vue {
  line = Line;
  bar = Bar;
  doughnut = Doughnut;
  pie = Pie;
  polar = Polar;
  radar = Radar;
}
</script>

<style lang="scss">
</style>
