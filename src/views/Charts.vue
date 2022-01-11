<template>
  <div class="charts">
    <h1>Data Charts</h1>
    <div class="filters-container">
      <p>These charts displays monthly averages by year and type</p>
      <p>Select the farm, that you would like to see data from</p>
    
      <div class="farm-selection">
        <h4>Choose farm</h4>
        <div class="input-container">
          <label>Select farm: </label> 
          <select @change="selectFarm" v-model="selectedFarmIndex">
            <option v-for="(farm, index) in farms" :key="index" :value="index">{{farm.farm_name}}</option>
          </select>
        </div>
      </div>
    </div>
    <h1>{{selectedFarm.farm_name}}</h1>
    <div class="chart-container" v-for="(row, index) in dataArray" :key="index">
      <dataChart width="100%" :data="row.data" :title="row.readingType"/>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DataChart from '@/components/DataChart.vue';

export default {
  components: { DataChart },
  name: 'Data-charts',
  computed: {
    ...mapState({
      farms: (state) => state.app.farms,
      readingTypes: (state) => state.app.readingTypes
    }),
  },
  data() {
    return {
      selectedFarmIndex: 0,
      selectedFarm: {},
      dataArray: []
    };
  },
  async mounted() {
    const self = this;
    await self.$store.dispatch("app/getAllFarms");
    await self.$store.dispatch("app/getAllReadingTypes");
    await self.selectFarm();
  },
  methods: {
    selectFarm() {
      const self = this;
      self.selectedFarm = self.farms[self.selectedFarmIndex];
      var data;
      self.dataArray = [];
      self.readingTypes.forEach(async (element) => { 
        data = await self.$store.dispatch("app/getAverageReadings", {farmId: self.selectedFarm.id, readingTypeId: element.id});
        self.dataArray.push({
          data: data,
          readingType: element.reading_type
        })
      });
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}

.filters-container {
  text-align: left;
  margin-left: 20px;
}

.input-container label {
  width: 150px;
  display: inline-block;
}

.input-container select {
  width: 300px;
}

@media screen and (max-width: 500px) {
  .chart-container, .input-container select {
    width: 100%;
  }

  .filters-container {
    margin-left: 5px;
    margin-right: 5px;
  }

  .input-container label {
    margin-bottom: 4px;
  }
}
</style>