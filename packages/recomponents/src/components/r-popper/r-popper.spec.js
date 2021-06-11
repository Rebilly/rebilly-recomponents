import Vue from 'vue';
import { mount, shallowMount } from '@vue/test-utils';
import { renderToString } from '@vue/server-test-utils';
import RPopper from './r-popper.vue';

describe('r-popper.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(RPopper);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render via SSR and match snapshot', async () => {
    const wrapper = await renderToString(RPopper, {
      propsData: {
        escToHide: true,
        autoHide: true,
        globalAutoHide: false,
        closeFunction: () => {
        },
        openOnMount: true,
        disabled: true,
        fluid: false,
        offset: 4,
        direction: 'horizontal',
        position: 'bottomStart',
        slideFrom: 'fade',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should listen for ESC keydown event when escToHide is true', () => {
    const wrapper = shallowMount(RPopper, {
      propsData: {
        openOnMount: true,
        escToHide: true,
      },
    });

    expect(wrapper.vm.$data.isPopperVisible).toBe(true);

    wrapper.trigger('keydown.esc');
    expect(wrapper.vm.$data.isPopperVisible).toBe(false);
  });

  it('should render component with disabled prop', () => {
    const wrapper = mount(RPopper, {
      propsData: {
        disabled: true,
      },
    });

    expect(wrapper.vm.$data.isPopperVisible).toBe(false);
    wrapper.vm.setPopperVisible(true);
    expect(wrapper.vm.$data.isPopperVisible).toBe(false);
  });

  it('should render slot trigger', () => {
    const slot = `<span>trigger-${new Date().getTime()}</span>`;

    const wrapper = mount(RPopper, {
      propsData: {},
      slots: {
        trigger: slot,
      },
    });

    expect(wrapper.html()).toMatch(slot);
  });

  it('should render slot content', async () => {
    const content = `<span>content-${new Date().getTime()}</span>`;
    const trigger = `<span>trigger-${new Date().getTime()}</span>`;
    const slot = `<div>${content}</div>`;

    const wrapper = await mount(RPopper, {
      propsData: {},
      slots: {
        trigger,
        content: slot,
      },
    });

    expect(wrapper.html()).not.toMatch(content);

    wrapper.vm.setPopperVisible(true);

    await Vue.nextTick();

    expect(wrapper.html()).toMatch(content);
  });
});
