import { mount } from '@vue/test-utils'
import Payment from '@/components/Payment.vue'

describe('Payment', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Payment)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
