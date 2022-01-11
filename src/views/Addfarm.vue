<template>
  <div class="add-farm">
    <h1>Add New Farm</h1>
    <div class="form-container">
      <p>Add a new farm to the app. Please add a valid address, as the location will be pinpointed on the map.</p>
      <div class="input-container">
          <label>Farm name:</label>
          <input type="text" placeholder="farm name" @input="farmName = $event.target.value" v-model="farmName"/>
      </div>
      <div class="input-container">
          <label>Address:</label>
          <input type="text" placeholder="Askonkatu 9, 15100 Lahti" @input="farmAddress = $event.target.value" v-model="farmAddress"/>
      </div>
      <div class="submit-container">
          <input ref="newFarmSubmit" type="button" value="Submit" @click="submitFarm" :disabled="(!farmName || !farmAddress)">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Add-farm',
  computed: {
    
  },
  data() {
    return {
      farmName: "",
      farmAddress: "",
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN
    };
  },
  async mounted() {
    const self = this;
  },
  methods: {
    async submitFarm() {
      const self = this;
      self.$refs.newFarmSubmit.disabled = true;
      if (!self.farmName || !self.farmAddress) {
        alert("Please fill all fields");
        self.$refs.newFarmSubmit.disabled = false;
        return false;
      }
      var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+self.farmAddress+".json?access_token="+self.accessToken;
      var encodedUrl = encodeURI(url);
      try {
        var {data} = await axios.get(encodedUrl);
      } catch (e) {
        throw new Error(e);
      }

      if (data && data.features && data.features.length > 0) {
        var longitude = data.features[0].center[0];
        var latitude = data.features[0].center[1];

        var payLoad = {
          name: self.farmName,
          address: self.farmAddress,
          lat: latitude,
          long: longitude
        }
        var returnData = await self.$store.dispatch("app/addNewFarm", payLoad);
        if (returnData) {
          if (returnData.success) {
            alert("Farm: "+self.farmName+", successfuly added to database")
            self.farmName = "";
            self.farmAddress = "";
            self.$refs.newFarmSubmit.disabled = false;
          }
          else {
            if (returnData.error_info == "farm_name_exists") {
              alert("Farm name: '"+self.farmName+"' already exists, please try another");
            }
            else if (returnData.error_info == "missing_parameters") {
              alert("Form failed to send all fields, please try again");
            }
            else if (returnData.error_info == "database_update_failed") {
              alert("Database update failed, please try again");
            }
            else {
              alert("Something went wrong, please try again later");
            }
            self.$refs.newFarmSubmit.disabled = false;
          }
        }
        else {
          alert("Something went wrong, please try again");
          self.$refs.newFarmSubmit.disabled = false;
          return false;
        }
      }
      else {
        alert("Failed to find address coordinates, please try a different address");
        self.$refs.newFarmSubmit.disabled = false;
        return false;
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
  width: 150px;
  display: inline-block;
}

.input-container input[type="text"] {
  width: 200px;
  display: inline-block;
}

.submit-container {
  width: 358px;
  text-align: right;
}

.submit-container input {
  cursor: pointer;
}

@media screen and (max-width: 500px) {
  .submit-container, .input-container, .input-container input[type="text"] {
    width: 100%;
  }

  .input-container label {
    margin-bottom: 4px;
  }
}

</style>