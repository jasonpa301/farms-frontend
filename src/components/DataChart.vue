<template>
  <div>
    <h4>{{title}}</h4>
    <div class="data-chart" :style="cssVars">
      <canvas ref="chartCanvas">
      </canvas>
    </div>
  </div> 
</template>

<script>
import { Chart, registerables } from 'chart.js';


export default {
  name: 'DataChart',
  props: {
    data: Array,
    width: String,
    height: String,
    title: String
  },
  computed: {
    cssVars () {
      return{
        '--width': this.width,
        '--height': this.height
      }
    }
  },
  data() {
    return {
      lineColours: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)',
        'rgba(128,0,128)',
        'rgba(0,0,128)',
        'rgba(0,100,0)',
        'rgba(143,188,143)',

      ]
    }
  },
  created() {
    Chart.register(...registerables);
  },
  mounted () {
    const self = this;
    var ctx = self.$refs.chartCanvas;

    var datasets = [];
    var i = 0;
    console.log("within comp", self.data)
    self.data.forEach((element) => { 
      if (i >= self.lineColours.length) {
        i = 0;
      }
      datasets.push(
        {
          label: element.year,
          data: element.data,
          backgroundColor: [
              self.lineColours[i],
          ],
          borderColor: [
              self.lineColours[i],
          ],
          borderWidth: 1
        }
      );
      i++; 
    })
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
          datasets: datasets
      },
      options: {
          scales: {
              y: {
                  beginAtZero: false
              }
          },
          responsive: true
      }
    });

  }
}
</script>

<style scoped>
  .data-chart {
    position: relative;
    width: var(--width);
    height: var(--height);
  }
</style>