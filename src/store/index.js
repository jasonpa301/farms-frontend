import { createStore } from 'vuex'
import axios from 'axios';

const backendURL = process.env.VUE_APP_BACKEND_URL;
const app = {
  namespaced: true,
  state: {
    readings: null,
    filteredReadings: null,
    farms: null
  },
  mutations: {
    updateReadings(state, readings) {
      state.readings = readings;
      state.filteredReadings = readings;
    },
    updateFarms(state, readings) {
      state.farms = readings;
    },
    filterReadingsByFarm(state, farmId) {
      if (farmId == 0) {
        state.filteredReadings = state.readings;
      }
      else {
        var readings = [];
        state.readings.forEach((element) => { 
          if (element.farm_id == farmId) {
            readings.push(element);
          }
        })
        state.filteredReadings = readings;
      }
    }
  },
  actions: {
    async getAllReadings(context) {
      try {
        const url = backendURL + "api/readings/all";
        var {data} = await axios.get(url);
        console.log(data);
        if (data) {
          context.commit("updateReadings", data);
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    async getAllFarms(context) {
      try {
        const url = backendURL + "api/farms/all";
        var {data} = await axios.get(url);
        console.log(data);
        if (data) {
          context.commit("updateFarms", data);
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  },
  getters: {
  }
};


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app
  }
})
