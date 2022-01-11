import { mount, createLocalVue } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { createStore } from 'vuex'

const app = {
  namespaced: true,
  state: {
    readings: [
        
    ],
    filteredReadings: [
      {
        date_time: "2022-01-10 12:32:00",
        farm_id: 1,
        farm_name: "test 1",
        id: 34,
        reading_type: "temperature",
        reading_type_id: 1,
        reading_value: "32.00",
      },
      {
        date_time: "2021-11-29 21:48:01",
        farm_id: 2,
        farm_name: "test 2",
        id: 35,
        reading_type: "rainFall",
        reading_type_id: 1,
        reading_value: "32.55",
      }  
    ],
    farms: [
      { 
        id: 1,
        farm_name: "test 1"
      },
      {
        id: 2,
        farm_name: "test 2"
      }
    ],
    readingTypes: [
      {
        id: 1,
        reading_type: "temperature"
      },
      {
        id: 2,
        reading_type: "pH"
      },
      {
        id: 3,
        reading_type: "rainFall"
      }

    ]
  },
  mutations: {
    
  },
  actions: {
    async getAllReadings(context) {

    },
    async getAllFarms(context) {
      
    },
    async getAllReadingTypes(context) {
      
    },
  },
  getters: {
  }
}

const store = createStore({
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



describe('Home.vue', () => {
  it('renders correct title', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [store]
      }
    })
    const title = "Farms Data Table";
    expect(wrapper.find('h1').text()).toEqual(title)
  })

  it('farms in select', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [store]
      }
    })
    const farmId = "1";
    const options = wrapper.find('.reading-filters .filter-input-container select').findAll('option')
    await options.at(1).setSelected();
    
    expect(wrapper.find('.reading-filters .filter-input-container select option:checked').element.value).toEqual(farmId)
  })

  it('reading types in select', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [store]
      }
    })
    const readingTypeId = "2";
    const options = wrapper.find('.reading-filters .filter-input-container:nth-of-type(2) select').findAll('option')
    await options.at(2).setSelected();
    
    expect(wrapper.find('.reading-filters .filter-input-container:nth-of-type(2) select option:checked').element.value).toEqual(readingTypeId)
  })

  it('reading 1 in table', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [store]
      }
    })
    const farm = "test 1";
    expect(wrapper.find('#readings-table tr:nth-of-type(1) td:nth-of-type(1)').text()).toEqual(farm)
  
  })

  it('reading 1 in table', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [store]
      }
    })
    const type = "rainFall";
    expect(wrapper.find('#readings-table tr:nth-of-type(2) td:nth-of-type(3)').text()).toEqual(type)
  
  })

})