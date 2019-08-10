import { shallowMount } from '@vue/test-utils';
import RTemplate from './r-template.vue';

describe('r-template.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(RTemplate, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
