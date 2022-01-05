import { createStore } from 'vuex'
import axios from 'axios';

const backendURL = process.env.VUE_APP_BACKEND_URL;
const app = {
  namespaced: true,
  state: {
    readings: null,
    filteredReadings: null,
    farms: null,
    readingTypes: null
  },
  mutations: {
    updateReadings(state, readings) {
      state.readings = readings;
      state.filteredReadings = readings;
    },
    updateFarms(state, readings) {
      state.farms = readings;
    },
    filterReadings(state, filterObject) {
      var farmId = filterObject.farmId;
      var readingTypeId = filterObject.readingTypeId;
      var startDate = filterObject.startDate;
      var endDate = filterObject.endDate;

      if (farmId == 0 && readingTypeId == 0 && !startDate && !endDate) {
        state.filteredReadings = state.readings;
      }
      else {
        var readings = [];
        var add;
        state.readings.forEach((element) => { 
          add = true;
          if (farmId != 0 && element.farm_id != farmId) {
            add = false;
          }
          if (readingTypeId != 0 && element.reading_type_id != readingTypeId) {
            add = false;
          }

          if (startDate && element.date_time < startDate) {
            add = false;
          }

          if (endDate && element.date_time >= endDate) {
            add = false;
          }

          if (add == true) {
            readings.push(element);
          }
        })
        state.filteredReadings = readings;
      }
    },
    updateReadingTypes(state, readingTypes) {
      state.readingTypes = readingTypes;
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
    },
    async getAllReadingTypes(context) {
      try {
        const url = backendURL + "api/readingtypes/all";
        var {data} = await axios.get(url);
        console.log(data);
        if (data) {
          context.commit("updateReadingTypes", data);
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
