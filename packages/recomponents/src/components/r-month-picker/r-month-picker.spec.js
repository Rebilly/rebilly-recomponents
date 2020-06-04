import {shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RMonthPicker from './r-month-picker.vue';

describe('r-month-picker.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RMonthPicker, {});
        expect(wrapper).toMatchSnapshot();
    });
    it('should render via SSR and match snapshot', async () => {
        const wrapper = await renderToString(RMonthPicker, {});
        expect(wrapper).toMatchSnapshot();
    });
    it('should select month and year if default values are set', async () => {
        const wrapper = await shallowMount(RMonthPicker, {
            propsData: {
                defaultValue: {month: 'December', year: 2021},
            },
        });
        expect(wrapper.find('.r-month-picker-month-selected').exists()).toBeTruthy();
        expect(wrapper.find('.r-month-picker-month-selected').text()).toEqual('December');
        expect(wrapper.find('.r-month-picker-year').text()).toContain('2021');
    });
    it('should clear if clicked selected value and month picker is clearable', async () => {
        const wrapper = await shallowMount(RMonthPicker, {
            propsData: {
                defaultValue: {month: 'December', year: 2021},
                clearable: true,
            },
        });

        expect(wrapper.find('.r-month-picker-month-selected').exists()).toBeTruthy();
        expect(wrapper.find('.r-month-picker-month-selected').text()).toEqual('December');
        try {
            await wrapper.find('.r-month-picker-month-selected').trigger('click');
        } finally {
            expect(wrapper.find('.r-month-picker-month-selected').exists()).toBeFalsy();
        }
    });
});
