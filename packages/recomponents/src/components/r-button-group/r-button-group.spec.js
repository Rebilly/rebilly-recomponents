import { mount } from '@vue/test-utils';
import RButtonGrup from './r-button-group.vue';

describe('r-button-group.vue', () => {
  it('should render component with fluid prop', () => {
    const wrapper = mount(RButtonGrup, {
      propsData: {
        fluid: true,
      },
    });

    expect(wrapper.classes())
      .toContain('r-button-group-fluid');
  });
});
