import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RMonthPickerInput from './r-month-picker-input.vue';

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
                defaultValue: {month: 'December', year: 2021},
            },
        });

        expect(wrapper.find('.r-month-picker-input').exists()).toBeTruthy();
        expect(wrapper.find('.r-month-picker-input').text()).toEqual('December, 2021');
    });
    it('should show month picker on click', async () => {
        const wrapper = await mount(RMonthPickerInput, {
            propsData: {
                defaultValue: {month: 'December', year: 2021},
            },
        });

        await wrapper.find('.r-month-picker-input').trigger('click');
        expect(wrapper.find('.r-month-picker-month-selected').exists()).toBeTruthy();
        expect(wrapper.find('.r-month-picker-month-selected').text()).toEqual('December');
        await wrapper.findAll('.r-month-picker-month').at(0).trigger('click');
        expect(wrapper.find('.r-month-picker-input').text()).toEqual('January, 2021');
    });
    it('should show placeholder if no month is selected', async () => {
        const wrapper = await mount(RMonthPickerInput, {
            propsData: {
                defaultValue: {month: 'December', year: 2021},
                placeholder: 'No month selected',
                clearable: true,
            },
        });

        await wrapper.find('.r-month-picker-input').trigger('click');
        expect(wrapper.find('.r-month-picker-month-selected').exists()).toBeTruthy();
        expect(wrapper.find('.r-month-picker-month-selected').text()).toEqual('December');
        await wrapper.find('.r-month-picker-month-selected').trigger('click');
        expect(wrapper.find('.r-month-picker-input').text()).toEqual('No month selected');

    });
});
