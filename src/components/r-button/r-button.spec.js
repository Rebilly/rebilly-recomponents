import { shallowMount } from '@vue/test-utils';
import RTemplate from './r-button.vue';

describe('r-button.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(RTemplate, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
