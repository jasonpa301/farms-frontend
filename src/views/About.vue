<template>
  <div class="about">
    <h1>About</h1>
    <p>This application displays data from various farms across Finland.</p>
    <p>Click on the map markers to see the name and address of the farms.</p>
    <div id="map-container">

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Mapbox from "mapbox-gl";

export default {
  name: 'About',
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
    await self.createMap();
  },
  methods: {
    createMap() {
      const self = this;

      var map = new Mapbox.Map({
        accessToken: self.accessToken,
        container: 'map-container',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 5,
        center: [self.farms[0].longitude, self.farms[0].latitude]
      }); 
      var marker;
      var markerDiv;
      for (var i = 0; i < self.farms.length; i++) {
        var marker = new Mapbox.Marker()
        .setLngLat([self.farms[i].longitude, self.farms[i].latitude])
        .setPopup(new Mapbox.Popup().setHTML('<p style="font-weight: bold">'+self.farms[i].farm_name+'</p><p>'+self.farms[i].address+'</p>'))
        .addTo(map); 

      }
      
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