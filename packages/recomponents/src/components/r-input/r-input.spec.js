import {mount, shallowMount} from '@vue/test-utils';
import RInput from './r-input.vue';

describe('r-input.vue', () => {
    it('renders label if not null', () => {
        const wrapper = shallowMount(RInput, {
            propsData: {label: 'custom label'},
        });

        expect(wrapper.text()).toMatch('custom label');
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
