<template>
  <div class="home">
    <h1>Farms Data Table</h1>
    <div class="reading-filters">
      <h2>Filters</h2>
      <div class="filter-input-container">
        <label>Select Farm: </label> 
        <select v-model="selectedFarm" @change="filterReadings">
          <option :value="0" selected>All</option>
          <option v-for="(farm, index) in farms" :key="index" :value="farm.id">{{farm.farm_name}}</option>
        </select>
      </div>
      
      <div class="filter-input-container">
        <label>Select Reading Type: </label> 
        <select v-model="selectedReadingType" @change="filterReadings">
          <option :value="0" selected>All</option>
          <option v-for="(readingType, index) in readingTypes" :key="index" :value="readingType.id">{{readingType.reading_type}}</option>
        </select>
      </div>

      <div class="filter-input-container">
        <label>Select start date: </label>
        <input type="date" v-model="startDate" @input="filterReadings"/>
      </div>

      <div class="filter-input-container">
        <label>Select end date: </label>
        <input type="date" v-model="endDate" @input="filterReadings"/>
      </div>

    
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
import moment from 'moment';

export default {
  name: 'Home',
  computed: {
    ...mapState({
      readings: (state) => state.app.filteredReadings,
      farms: (state) => state.app.farms,
      readingTypes: (state) => state.app.readingTypes
    }),
  },
  data() {
    return {
      selectedFarm: 0,
      selectedReadingType: 0,
      startDate: "",
      endDate: ""
    };
  },
  async mounted() {
    const self = this;
    await self.$store.dispatch("app/getAllReadings");
    await self.$store.dispatch("app/getAllFarms");
    await self.$store.dispatch("app/getAllReadingTypes");
  },
  methods: {
    filterReadings() {
      const self = this;
      var startDate = "";
      if (self.startDate) {
        startDate = moment(self.startDate).format('Y-MM-DD HH:mm:ss')
      }
      var endDate = "";
      if (self.endDate) {
        var formatEndDate = moment(self.endDate, 'Y-MM-DD').add(1,'days');
        endDate = moment(formatEndDate).format('Y-MM-DD HH:mm:ss');
      }
      self.$store.commit("app/filterReadings", {farmId: self.selectedFarm, readingTypeId: self.selectedReadingType, startDate: startDate, endDate: endDate });
    }
  }
}
</script>

<style scoped>

.table-container {
  margin-top: 15px;
  margin-bottom: 15px;
}

#readings-table {
  border-collapse: collapse;
  width: 95%;
  margin: auto;
}

#readings-table td, #readings-table th {
  border: 1px solid #cccccc;
  padding: 8px;
}

#readings-table tr:nth-child(even){
  background-color: #f2f2f2;
}

#readings-table th {
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: left;
  background-color: #000000;
  color: white;
}

.reading-filters {
  width: 95%;
  margin: auto;
  text-align: left;
}

.filter-input-container {
  margin-bottom: 5px;
}
.filter-input-container label {
  width: 200px;
  display: inline-block;
}

.filter-input-container select {
  width: 300px;
}

.filter-input-container input[type="date"] {
  width: 292px;
}

</style>