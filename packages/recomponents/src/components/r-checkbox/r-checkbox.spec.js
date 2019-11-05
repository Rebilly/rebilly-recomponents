import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RCheckbox from './r-checkbox.vue';
import RIcon from '../r-icon/r-icon.vue';

const $t = () => 'custom label';

describe('r-checkbox.vue', () => {
    it('renders default checkbox correctly', async () => {
        const label = `label-${new Date().getTime()}`;
        const wrapper = shallowMount(RCheckbox, {
            propsData: {},
            mocks: {$t: () => label},
        });
        // should render label with default text
        expect(wrapper.find('label').text()).toBe(label);
        // only basic class name
        expect(wrapper.attributes('class')).toBe('r-checkbox');
        // input shouldn't be disabled
        expect(wrapper.find('input').attributes('disabled')).toBe(undefined);
        // input shouldn't be checked
        expect(wrapper.find('input').attributes('checked')).toBe(undefined);
        // no caption
        expect(wrapper.contains('.r-field-caption')).toBe(false);
        // contain icon
        expect(wrapper.contains(RIcon)).toBe(true);
    });

    it('renders props.label when passed', () => {
        const wrapper = shallowMount(RCheckbox, {
            propsData: {label: 'custom label'},
            mocks: {$t},
        });
        expect(wrapper.text()).toMatch('custom label');
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RCheckbox, {
            propsData: {
                name: 'snapshot',
                label: 'Custom label',
                id: 'id1234',
            },
            mocks: {$t},
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render component with fuzzy prop', () => {
        const wrapper = mount(RCheckbox, {
            propsData: {
                fuzzy: true,
            },
            mocks: {$t},
        });

        expect(wrapper.find('use').attributes().href).toBe('#icon-dash-l');
    });

    it('should render component with disabled prop', () => {
        const wrapper = mount(RCheckbox, {
            propsData: {
                disabled: true,
            },
            mocks: {$t},
        });
        expect(wrapper.find('label').classes('is-disabled')).toBe(true);
        expect(wrapper.find('input').attributes('disabled')).not.toBe(undefined);
    });

    it('should handle change event', () => {
        const wrapper = mount(RCheckbox, {
            propsData: {
                name: 'checkbox',
                label: 'Label',
                selected: [false, true],
            },
            mocks: {$t},
        });

        wrapper.find('.r-field-checkbox').trigger('change');
        expect(wrapper.emitted('input')).toBeTruthy();
    });
});
