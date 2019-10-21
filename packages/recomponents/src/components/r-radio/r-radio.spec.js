import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RRadio from './r-radio.vue';

const $t = () => 'custom label';

describe('r-radio.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RRadio, {
            propsData: {
                checked: 'value',
                value: 'value',
                label: 'Checkbox',
                id: 'id1234',
            },
            mocks: {$t},
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', () => {
        const wrapper = renderToString(RRadio, {
            propsData: {
                checked: 'value',
                value: 'value',
                label: 'Checkbox',
                id: 'id1234',
            },
            mocks: {$t},
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should be invalid if validation is dirty', () => {
        const wrapper = mount(RRadio, {
            propsData: {
                checked: 'value',
                value: 'value',
                label: 'Checkbox',
                validate: {
                    $invalid: true,
                    $dirty: false,
                },
                id: 'id1234',
            },
            mocks: {$t},
        });

        expect(wrapper.isInvalid).toBeFalsy();
    });
});
