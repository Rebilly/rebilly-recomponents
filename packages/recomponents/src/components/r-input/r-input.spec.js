import { mount, shallowMount } from '@vue/test-utils';
import RInput from './r-input.vue';

describe('r-input.vue', () => {
  it('renders default correctly', () => {
    const wrapper = shallowMount(RInput);

    expect(wrapper.contains('input.r-field-input')).toBe(true);
    expect(wrapper.contains('.r-field-label')).toBe(false);
    expect(wrapper.contains('.r-field-caption')).toBe(false);
    expect(wrapper.find('input.r-field-input').attributes('disabled')).toBe(undefined);
  });

  it('renders multiline correctly', () => {
    const placeholder = `placeholder-${new Date().getTime()}`;
    const wrapper = shallowMount(RInput, {
      propsData: {
        multiline: true,
        placeholder,
      },
    });

    expect(wrapper.contains('input.r-field-input')).toBe(false);
    expect(wrapper.contains('textarea.r-field-input')).toBe(true);
    expect(wrapper.find('textarea.r-field-input').attributes('placeholder')).toEqual(placeholder);
  });

  it('renders multiline-enter correctly', () => {
    const placeholder = `placeholder-${new Date().getTime()}`;
    const wrapper = shallowMount(RInput, {
      propsData: {
        multiline: true,
        submitOnEnter: true,
        placeholder,
      },
    });

    expect(wrapper.contains('input.r-field-input')).toBe(false);
    expect(wrapper.contains('textarea.r-field-input')).toBe(true);
    expect(wrapper.find('textarea.r-field-input').attributes('placeholder')).toEqual(placeholder);
  });

  it('renders disabled correctly', () => {
    const wrapper = shallowMount(RInput, {
      propsData: { disabled: true },
    });

    expect(wrapper.find('input.r-field-input').attributes('disabled')).toBe('disabled');
  });

  it('renders multiline disabled correctly', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        multiline: true,
        disabled: true,
      },
    });

    expect(wrapper.find('textarea.r-field-input').attributes('disabled')).toBe('disabled');
  });

  it('renders multiline-submit  disabled correctly', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        multiline: true,
        submitOnEnter: true,
        disabled: true,
      },
    });

    expect(wrapper.find('textarea.r-field-input').attributes('disabled')).toBe('disabled');
  });

  it('renders grouped correctly', () => {
    const leftLabel = `leftLabel-${new Date().getTime()}`;
    const rightLabel = `leftLabel-${new Date().getTime()}`;

    const wrapper = shallowMount(RInput, {
      propsData: {
        leftLabel,
        rightLabel,
      },
    });

    expect(wrapper.text()).toMatch(leftLabel);
    expect(wrapper.text()).toMatch(rightLabel);
  });

  it('renders grouped disabled correctly', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        disabled: true,
        leftLabel: 'leftLabel',
      },
    });

    expect(wrapper.find('input.r-field-input').attributes('disabled')).toBe('disabled');
  });

  it('renders label if not null', () => {
    const label = `label-${new Date().getTime()}`;
    const wrapper = shallowMount(RInput, {
      propsData: { label },
    });

    expect(wrapper.text()).toMatch(label);
  });

  it('renders helpText if not null', () => {
    const helpText = `helpText-${new Date().getTime()}`;
    const wrapper = shallowMount(RInput, {
      propsData: { helpText },
    });

    expect(wrapper.find('.r-field-caption').text()).toEqual(helpText);
  });

  it('renders maxLength if not null', () => {
    const helpText = `helpText-${new Date().getTime()}`;
    const wrapper = shallowMount(RInput, {
      propsData: { helpText, maxLength: 10 },
    });

    expect(wrapper.find('.r-field-caption').text()).toEqual(`${helpText} (10 characters left.)`);
  });

  it('renders textarea if not null', () => {
    const wrapper = shallowMount(RInput, {
      propsData: { multiline: true },
    });

    expect(wrapper.find('textarea')).not.toBe(undefined);
  });

  it('renders svg if there is icon', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        leftIcon: 'search',
      },
    });

    expect(wrapper.find('svg')).not.toBe(undefined);
  });

  it('renders password if password is true', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        password: true,
      },
    });

    expect(wrapper.find('input').attributes().type).toBe('password');
  });

  it('renders numeric if numeric is true', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        numeric: true,
      },
    });

    expect(wrapper.find('input').attributes().type).toBe('number');
  });

  it('renders how many characters left if maxLength is not null', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        maxLength: 10,
      },
    });

    expect(wrapper.text()).toContain('10 characters left');
  });

  it('renders how many characters left if maxLength is not null', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        value: 'hi',
        maxLength: 10,
      },
    });

    expect(wrapper.text()).toContain('8 characters left');
  });

  it('renders autoResize style if autoResize is not null', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        multiline: true,
        autoResize: true,
      },
    });

    expect(wrapper.find('textarea').attributes().style).not.toBe(undefined);
  });

  it('renders autoResize style if autoResize is not null', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        autoHighlight: true,
      },
    });

    expect(wrapper.find('input')).not.toBe(undefined);
  });

  it('should render component with disabled prop', () => {
    const wrapper = mount(RInput, {
      propsData: {
        disabled: true,
      },
    });
    expect(wrapper.find('input').attributes().disabled).not.toBe(undefined);
  });

  it('should handle autofocus', () => {
    const wrapper = mount(RInput, {
      propsData: {
        autoFocus: true,
      },
    });

    expect(wrapper.find('input').element).toBe(document.activeElement);
  });

  it('renders data attributes if one is provided', () => {
    const wrapper = shallowMount(RInput, {
      propsData: {
        'data-test': 'testValue',
      },
    });

    expect(wrapper.find('input').attributes()).toHaveProperty('data-test');
    expect(wrapper.find('input').attributes('data-test')).toBe('testValue');
  });

  it('should trigger all events', () => {
    const wrapper = mount(RInput, {
      propsData: {},
    });

    wrapper.vm.update({ target: {} });
    wrapper.vm.keySubmit();
    wrapper.vm.keyPress();
    wrapper.vm.keyDown();
    wrapper.vm.focus();
    wrapper.vm.click();

    expect(wrapper.emitted()['key-submit']).toBeTruthy();
    expect(wrapper.emitted()['key-press']).toBeTruthy();
    expect(wrapper.emitted()['key-down']).toBeTruthy();
    expect(wrapper.emitted().input).toBeTruthy();
  });
});
