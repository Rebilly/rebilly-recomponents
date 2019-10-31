import {mount, shallowMount} from '@vue/test-utils';
import RInput from './r-input.vue';

describe('r-input.vue', () => {
    it('renders label if not null', () => {
        const wrapper = shallowMount(RInput, {
            propsData: {label: 'custom label'},
        });

        expect(wrapper.text()).toMatch('custom label');
    });

    it('renders textarea if not null', () => {
        const wrapper = shallowMount(RInput, {
            propsData: {multiline: true},
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
                attachToDocument: true,
            },
        });

        expect(wrapper.find('input').element).toBe(document.activeElement);
    });

    it('should trigger all events', () => {
        const wrapper = mount(RInput, {
            propsData: {},
        });

        wrapper.vm.update({target: {}});
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
