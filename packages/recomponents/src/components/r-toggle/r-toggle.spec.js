import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RToggle from './r-toggle.vue';

describe('r-toggle.vue', () => {
    it('should render Wrapper and match snapshot', async () => {
        const wrapper = shallowMount(RToggle, {
            propsData: {
                name: 'snapshot',
                label: 'Custom label',
                id: 'id1234',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RToggle, {
            propsData: {
                name: 'snapshot',
                label: 'Custom label',
                id: 'id1234',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('renders label when passed', () => {
        const wrapper = shallowMount(RToggle, {
            propsData: {label: 'custom label'},
        });
        expect(wrapper.text()).toMatch('custom label');
    });

    it('should render non-toggled component', () => {
        const wrapper = mount(RToggle, {
            propsData: {
                checked: null,
            },
        });

        wrapper.find('.r-toggle-switch').trigger('change');
        expect(wrapper.attributes('aria-checked')).toBeFalsy();
    });

    it('should handle change event for array', () => {
        const wrapper = mount(RToggle, {
            propsData: {
                name: 'toggle',
                label: 'Label',
                checked: [false, true],
            },
        });

        wrapper.find('.r-toggle-switch').trigger('change');
        expect(wrapper.emitted('change')).toBeTruthy();
    });

    it('should handle change event for single', () => {
        const wrapper = mount(RToggle, {
            propsData: {
                name: 'toggle',
                label: 'Label',
                checked: true,
            },
        });

        wrapper.find('.r-toggle-switch').trigger('change');
        expect(wrapper.emitted('change')).toBeTruthy();
    });
});
