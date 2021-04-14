import {mount, shallowMount} from '@vue/test-utils';
import RDateInput from './r-date-input.vue';

describe('r-date-input.vue', () => {
    const date = '2019-01-01';
    const rCalendarManager = `<r-calendar-manager-stub></r-calendar-manager-stub>`;

    it('should render Wrapper and match snapshot', () => {
        const wrapper = shallowMount(RDateInput, {
            propsData: {
                maxDate: '2020-01-01',
                value: date,
            },
            stubs: {'no-ssr': true, 'r-calendar-manager': rCalendarManager},
        });
        expect(wrapper).toMatchSnapshot();
    });

    it('renders default type date correctly', () => {
        const wrapper = shallowMount(RDateInput, {
            propsData: {
                value: date,
                stubs: ['no-ssr'],
            },
        });
        // no-label
        expect(wrapper.contains('label')).toBe(false);
        // no help text
        expect(wrapper.contains('.r-field-caption')).toBe(false);
        // no error
        expect(wrapper.contains('.r-is-error')).toBe(false);
        // propagated value as a selected
        expect(wrapper.vm.selectedDate).toBe(date);
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
