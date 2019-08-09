import {
    mount,
    Wrapper,
    MountOptions,
  } from '@vue/test-utils'
import RTemplate from './RTemplate'

describe('VCard.vue', () => {
    let mountFunction: options => Wrapper
    beforeEach(() => {
      mountFunction = (options) => {
        return mount(RTemplate, options)
      }
    })

    it('should render component and match snapshot', () => {
      const wrapper = mountFunction()

      expect(wrapper.html()).toMatchSnapshot()
    })
})
