<template>
  <div class="farms-view">
    <h1>Farm Info</h1>
    <div class="filter-input-container">
      <label>Select farm: </label> 
      <select @change="selectFarm" v-model="selectedFarmIndex">
        <option v-for="(farm, index) in farms" :key="index" :value="index">{{farm.farm_name}}</option>
      </select>
    </div>
    
    <div v-if="selectedFarm" class="single-farm-view">
      <h2>{{selectedFarm.farm_name}}</h2>
      <h4>{{selectedFarm.address}}</h4>
      <div id="map-container">

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Mapbox from "mapbox-gl";

export default {
  name: 'Farm',
  computed: {
    ...mapState({
      farms: (state) => state.app.farms,
    }),
  },
  data() {
    return {
      selectedFarmIndex: 0,
      selectedFarm: {},
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN
    };
  },
  async mounted() {
    const self = this;
    await self.$store.dispatch("app/getAllFarms");
    await self.selectFarm();
    
  },
  methods: {
    selectFarm() {
      const self = this;
      self.selectedFarm = self.farms[self.selectedFarmIndex];

      var map = new Mapbox.Map({
        accessToken: self.accessToken,
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 10,
        center: [self.selectedFarm.longitude, self.selectedFarm.latitude]
      }); 
      const marker = new Mapbox.Marker()
      .setLngLat([self.selectedFarm.longitude, self.selectedFarm.latitude])
      .addTo(map);
    }
  }
}
</script>

<style scoped>

#map-container {
  width: 90%;
  height: 400px;
  margin: auto;
}
</style>