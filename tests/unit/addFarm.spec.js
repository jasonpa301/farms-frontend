import { mount } from '@vue/test-utils'
import addFarm from '@/views/Addfarm.vue'


describe('Addfarm.vue', () => {
  it('renders correct title', () => {
    const title = "Add New Farm";
    const wrapper = mount(addFarm)
    expect(wrapper.find('h1').text()).toEqual(title)
  })

  it('form submit is disabled', () => {
    const wrapper = mount(addFarm)
    expect(wrapper.find('.submit-container input').isDisabled()).toBeTruthy()
  })

  it('form submit is enabled with values', async () => {
    const wrapper = mount(addFarm)
    await wrapper.setData({ farmName: 'Some farm name', farmAddress: 'Askonkatu 9, 15100 Lahti' })
    expect(wrapper.find('.submit-container input').isDisabled()).toBeFalsy()
  })

  it('has data', () => {
    expect(typeof addFarm.data).toBe('function')
  })
})