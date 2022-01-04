<template>
  <div class="home">
    <h1>Farms</h1>
    <div class="reading-filters">
      <h2>Filters</h2>
      <label>Select farm: </label> 
      <select v-model="selectedFarm" @change="filterByFarm">
        <option :value="0" selected>All</option>
        <option v-for="(farm, index) in farms" :key="index" :value="farm.id">{{farm.farm_name}}</option>
      </select>
    </div>
    <div class="table-container">
      <table id="readings-table">
        <thead>
          <tr>
            <th>Farm name</th>
            <th>Time</th>
            <th>Reading Type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in readings" :key="index">
            <td>{{row.farm_name}}</td>
            <td>{{row.date_time}}</td>
            <td>{{row.reading_type}}</td>
            <td>{{row.reading_value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Home',
  computed: {
    ...mapState({
      readings: (state) => state.app.filteredReadings,
      farms: (state) => state.app.farms,
    }),
  },
  data() {
    return {
      selectedFarm: 0,
    };
  },
  async mounted() {
    const self = this;
    await self.$store.dispatch("app/getAllReadings");
    await self.$store.dispatch("app/getAllFarms");
  },
  methods: {
    filterByFarm() {
      const self = this;
      console.log(self.$store);
      self.$store.commit("app/filterReadingsByFarm",self.selectedFarm);
    }
  }
}
</script>
