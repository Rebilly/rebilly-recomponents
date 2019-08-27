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
});
