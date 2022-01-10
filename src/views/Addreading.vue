<template>
  <div class="add-reading">
    <h1>Add New Reading</h1>
    <div class="form-container">
      <p>Add a new reading to an existing farm</p>
      <h4>Reading value rules:</h4>
      <ul>
        <li>Temperature is a celsius value between -50 and 100</li>
        <li>pH is a decimal value between 0 - 14</li>
        <li>Rainfall is a positive number between 0 and 500</li>
      </ul>
      <div class="input-container">
        <label>Select Farm: </label> 
        <select v-model="selectedFarm">
          <option value="" disabled>Farm:</option>
          <option v-for="(farm, index) in farms" :key="index" :value="farm.id">{{farm.farm_name}}</option>
        </select>
      </div>    
      <div class="input-container">
        <label>Select Reading Type: </label> 
        <select v-model="selectedReadingType" @change="changeReadingType">
          <option value="" disabled>Reading Type:</option>
          <option v-for="(readingType, index) in readingTypes" :key="index" :value="readingType.id">{{readingType.reading_type}}</option>
        </select>
      </div>
      <div class="input-container">
          <label>Value:</label>
          <input type="number" placeholder="12.65" @input="ReadingValue = $event.target.value" v-model="readingValue"/>
      </div>
      <div class="input-container">
          <label>Time:</label>
          <input type="datetime-local" v-model="readingTime" @change="changeReadingTime" :max="todaysDate">
      </div>
      <div class="submit-container">
          <input ref="newReadingSubmit" type="button" value="Submit" @click="submitReading" :disabled="(!selectedFarm || !selectedReadingType || !readingValue || !readingTime)">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment';

export default {
  name: 'Add-reading',
  computed: {
    ...mapState({
      farms: (state) => state.app.farms,
      readingTypes: (state) => state.app.readingTypes
    }),
  },
  data() {
    return {
      selectedFarm: "",
      selectedReadingType: "",
      selectedReadingTypeName: "",
      readingValue: null,
      readingTime: null,
      readingTimeFormatted: "",
      todaysDate: ""

    };
  },
  async mounted() {
    const self = this;
    await self.$store.dispatch("app/getAllFarms");
    await self.$store.dispatch("app/getAllReadingTypes");
    self.todaysDate = moment().format("YYYY-MM-DDTHH:mm:ss");
  },
  methods: {
    async submitReading() {
      const self = this;
      self.$refs.newReadingSubmit.disabled = true;
      if (!self.selectedReadingType || !self.selectedFarm || (!self.readingValue && self.readingValue !== 0) || !self.readingTimeFormatted) {
        alert("Please fill all fields");
        self.$refs.newReadingSubmit.disabled = false;
        return false;
      }
      
      var valueValid = false;
      if (self.selectedReadingTypeName == "temperature") {
        if (self.readingValue >= -50 && self.readingValue <= 100) {
          valueValid = true;
        }
      }
      else if (self.selectedReadingTypeName == "pH") {
        if (self.readingValue >= 0 && self.readingValue <= 14) {
          valueValid = true;
        }
      }
      else if (self.selectedReadingTypeName == "rainFall") {
        if (self.readingValue >= 0 && self.readingValue <= 500) {
          valueValid = true;
        }
      }

      if (valueValid == false) {
        alert("Value is invalid for selected reading type, please enter a valid reading value");
        self.$refs.newReadingSubmit.disabled = false;
        return false;
      }

      var payLoad = {
        farmId: self.selectedFarm,
        readingTypeId: self.selectedReadingType,
        readingValue: self.readingValue,
        readingTime: self.readingTimeFormatted,
        readingType: self.selectedReadingTypeName
      }

      var returnData = await self.$store.dispatch("app/addNewReading", payLoad);
      if (returnData) {
        if (returnData.success) {
          alert("New reading was successfuly added to database")
          self.selectedFarm = "";
          self.selectedReadingType = "";
          self.readingValue = null;
          self.readingTime = null;
          self.readingTimeFormatted = "";
          self.selectedReadingTypeName = "";
          self.$refs.newReadingSubmit.disabled = false;
        }
        else {
          if (returnData.error_info == "missing_parameters") {
            alert("Form failed to send all fields, please try again");
          }
          else if (returnData.error_info == "database_update_failed") {
            alert("Database update failed, please try again");
          }
          else {
            alert("Something went wrong, please try again later");
          }
          self.$refs.newReadingSubmit.disabled = false;
        }
      }
      else {
        alert("Something went wrong, please try again");
        self.$refs.newReadingSubmit.disabled = false;
        return false;
      }
     
    },
    changeReadingType(e) {
      const self = this;
      self.selectedReadingTypeName = e.target.selectedOptions[0].innerText;
    },
    changeReadingTime() {
      const self = this;
      if (self.readingTime) {
        self.readingTimeFormatted = moment(self.readingTime).format("YYYY-MM-DD HH:mm:ss");
      }
      else {
        self.readingTimeFormatted = "";
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  text-align: left;
  width: 90%;
  margin: auto;
}

.input-container {
  margin-bottom: 5px;
}

.input-container label {
  width: 200px;
  display: inline-block;
}

.input-container select {
  width: 300px;
}

.input-container input[type="number"], .input-container input[type="datetime-local"] {
  width: 292px;
}

.submit-container {
  width: 500px;
  text-align: right;
}

.submit-container input {
  cursor: pointer;
}
</style>