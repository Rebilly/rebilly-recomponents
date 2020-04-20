import {mount, shallowMount} from '@vue/test-utils';
import RCalendarManager from './r-calendar-manager.vue';
import RDateInput from './r-date-input.vue';

describe('r-date-input.vue', () => {
    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RDateInput, {
            propsData: {
                maxDate: '2020-01-01',
            },
            stubs: ['no-ssr'],
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('renders default type date correctly', () => {
        const wrapper = shallowMount(RDateInput, {
            propsData: {
                stubs: ['no-ssr'],
            },
        });
        // has calendar manager
        expect(wrapper.contains(RCalendarManager)).toBe(true);
        // no-label
        expect(wrapper.contains('label')).toBe(false);
        // no help text
        expect(wrapper.contains('.r-field-caption')).toBe(false);
        // no error
        expect(wrapper.contains('.r-is-error')).toBe(false);
        // empty value by default
        expect(wrapper.vm.selectedDate).toBe(undefined);
    });

    it('should renders label and helpText type date', () => {
        const label = `label-${new Date().getTime()}`;
        const helpText = `helpText-${new Date().getTime()}`;

        const wrapper = shallowMount(RDateInput, {
            propsData: {
                type: 'date',
                label,
                helpText,
            },
            stubs: ['no-ssr'],
        });
        expect(wrapper.find('label').text()).toEqual(label);
        expect(wrapper.find('.r-field-caption').text()).toEqual(helpText);
    });

    it('should renders label and helpText type datetime', () => {
        const label = `label-${new Date().getTime()}`;
        const helpText = `helpText-${new Date().getTime()}`;

        const wrapper = shallowMount(RDateInput, {
            propsData: {
                type: 'datetime',
                label,
                helpText,
            },
            stubs: ['no-ssr'],
        });
        expect(wrapper.find('p').text()).toEqual(label);
        expect(wrapper.find('.r-field-caption').text()).toEqual(helpText);
    });

    it('should renders label and helpText type time', () => {
        const label = `label-${new Date().getTime()}`;
        const helpText = `helpText-${new Date().getTime()}`;

        const wrapper = shallowMount(RDateInput, {
            propsData: {
                type: 'time',
                label,
                helpText,
            },
            stubs: ['no-ssr'],
        });
        expect(wrapper.find('p').text()).toEqual(label);
        expect(wrapper.find('.r-field-caption').text()).toEqual(helpText);
    });

    it('should renders date without hours/minutes by default', () => {
        const wrapper = shallowMount(RDateInput, {
            propsData: {
                type: 'date',
            },
            stubs: ['no-ssr'],
        });
        expect(wrapper.classes()).not.toContain('r-date-time-divider');
    });

    it('should renders hours/minutes picker type datetime', () => {
        const wrapper = shallowMount(RDateInput, {
            propsData: {
                type: 'datetime',
            },
            stubs: ['no-ssr'],
        });
        expect(wrapper.contains('.r-date-time-divider')).toEqual(true);
    });

    it('shouldn\'t renders datepicker type time', () => {
        const wrapper = shallowMount(RDateInput, {
            propsData: {
                type: 'time',
            },
            stubs: ['no-ssr'],
        });
        expect(wrapper.contains(RCalendarManager)).toBe(false);
    });

    it('shouldn emit event input on dateChange callback', () => {
        const wrapper = mount(RDateInput, {
            propsData: {
                type: 'datetime',
            },
            stubs: ['no-ssr'],
        });
        wrapper.vm.dateChange(null);
        expect(wrapper.emitted('input')).not.toBe(undefined);
    });

    it('shouldn emit event input on updateTime callback', () => {
        const wrapper = mount(RDateInput, {
            propsData: {
                type: 'time',
            },
            stubs: ['no-ssr'],
        });
        wrapper.vm.updateTime('hours', '01');
        expect(wrapper.emitted('input')).not.toBe(undefined);
    });
});
