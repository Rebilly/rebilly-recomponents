import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RMonthPickerInput from './r-month-picker-input.vue';
import RMonthPicker from './r-month-picker.vue';
import Vue from 'vue';

describe('r-month-picker-input.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RMonthPickerInput, {});
        expect(wrapper).toMatchSnapshot();
    });
    it('should render via SSR and match snapshot', async () => {
        const wrapper = await renderToString(RMonthPickerInput, {});
        expect(wrapper).toMatchSnapshot();
    });
    it('should select month and year if default values are set', async () => {
        const wrapper = await shallowMount(RMonthPickerInput, {
            propsData: {
                value: {monthIndex: 11, year: 2021},
            },
        });

        expect(wrapper.find('.r-month-picker-input').exists()).toBeTruthy();
        expect(wrapper.find('.r-month-picker-input').text()).toEqual('December, 2021');
    });
    it('should show month picker on click', async () => {
        const wrapper = await mount(RMonthPickerInput, {
            components: {RMonthPicker},
            propsData: {
                value: {monthIndex: 11, year: 2021},
            },
        });


        wrapper.find('.r-month-picker-input').trigger('click');

        await Vue.nextTick();

        expect(wrapper.find('.r-month-picker-month-selected').exists()).toBeTruthy();
        expect(wrapper.find('.r-month-picker-month-selected').text()).toEqual('December');

        const months = await wrapper.findAll('.r-month-picker-month');
        expect(months.at(0).text()).toEqual('January');
        months.at(0).trigger('click');

        await Vue.nextTick();

        expect(wrapper.emitted().input).toBeTruthy();
        expect(wrapper.emitted().input).toEqual([[{monthIndex: 0, year: 2021}]]);
        expect(wrapper.find('.r-month-picker-input').text()).toEqual('January, 2021');
    });
    it('should show placeholder if no month is selected', async () => {
        const placeholder = 'No month selected';
        const wrapper = await mount(RMonthPickerInput, {
            components: {RMonthPicker},
            propsData: {
                value: {monthIndex: 11, year: 2021},
                placeholder,
                clearable: true,
            },
        });

        wrapper.find('.r-month-picker-input').trigger('click');

        await Vue.nextTick();

        expect(wrapper.find('.r-month-picker-month-selected').exists()).toBeTruthy();
        expect(wrapper.find('.r-month-picker-month-selected').text()).toEqual('December');

        wrapper.find('.r-month-picker-month-selected').trigger('click');
        expect(wrapper.emitted().clear).toBeTruthy();

        await Vue.nextTick();

        expect(wrapper.find('.r-month-picker-input').text()).toEqual(placeholder);
    });
});
