import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RCheckbox from './r-checkbox.vue';

const $t = () => 'custom label';

describe('r-checkbox.vue', () => {
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
        expect(wrapper.find('input').attributes().disabled).not.toBe(undefined);
    });
});
