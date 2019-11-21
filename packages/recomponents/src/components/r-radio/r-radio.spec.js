import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RRadio from './r-radio.vue';

describe('r-radio.vue', () => {
    it('renders default radio correctly', () => {
        const label = `label-${new Date().getTime()}`;

        const wrapper = shallowMount(RRadio, {
            propsData: {
                label,
                checked: '',
                value: '1',
            },
        });

        expect(wrapper.find('label').text()).toEqual(label);
        expect(wrapper.contains('.r-field-caption')).toBe(false);
    });

    it('should render caption props if passed', () => {
        const caption = `caption-${new Date().getTime()}`;

        const wrapper = shallowMount(RRadio, {
            propsData: {
                caption,
                checked: '',
                value: '1',
            },
        });

        expect(wrapper.find('.r-field-caption').text()).toEqual(caption);
    });


    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RRadio, {
            propsData: {
                checked: 'value',
                value: 'value',
                label: 'Checkbox',
                name: 'radio-group',
                id: 'id1234',
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', () => {
        const wrapper = renderToString(RRadio, {
            propsData: {
                checked: 'value',
                value: 'value',
                label: 'Checkbox',
                name: 'radio-group',
                id: 'id1234',
            },
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
                name: 'radio-group',
                id: 'id1234',
            },
        });

        expect(wrapper.isInvalid).toBeFalsy();
    });
});
