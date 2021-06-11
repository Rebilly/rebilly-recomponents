import { mount } from '@vue/test-utils';
import { renderToString } from '@vue/server-test-utils';
import RWebcomponent from './r-webcomponent.vue';
import { RButton } from '../../index';

describe('r-webcomponent.vue', () => {
  it('should render Wrapper and match snapshot', async () => {
    const wrapper = mount(RWebcomponent, {
      slots: {
        default: '<strong>default button</strong>',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render via SSR and match snapshot', async () => {
    const wrapper = await renderToString(RWebcomponent, {
      slots: {
        default: '<strong>default button</strong>',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should render all specified components', async () => {
    const wrapper = await renderToString(RWebcomponent, {
      slots: {
        default: [RButton],
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should not contain any props', () => {
    const { props } = RWebcomponent;

    expect(props).toBeUndefined();
  });
});
