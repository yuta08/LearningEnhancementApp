<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  mounted() {
    this.renderChart({
      labels: ['データ1', 'データ2', 'データ3'],
      datasets: [
        {
          label: 'サンプルデータ',
          backgroundColor: '#f87979',
          data: [10, 20, 30]
        }
      ]
    },
    { responsive: true, maintainAspectRatio: false }
    );
  }
};
</script>

<style>
/* グラフのスタイルを指定する必要があれば追加します */
</style>
