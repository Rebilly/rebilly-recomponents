import { shallowMount } from '@vue/test-utils';
import RButton from './r-button.vue';

describe('r-button.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Apply';
    const wrapper = shallowMount(RButton, {
      propsData: { msg },
      mocks: {
        $t: () => msg,
      },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
