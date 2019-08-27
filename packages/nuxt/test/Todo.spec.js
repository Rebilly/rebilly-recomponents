import { mount } from '@vue/test-utils'
import Todo from '@/components/Todo.vue'

describe('Todo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Todo)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
