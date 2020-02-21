import moment from 'moment';
import {mount, shallowMount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RDateRange from './r-date-range.vue';
import RPopper from '../r-popper/r-popper.vue';
import DateTimeFormats from '../../common/datetime-formats';

const start = '2020-01-01T00:00:00.000Z';
const end = '2020-01-01T23:59:59.999Z';
const period = `${start}..${end}`;

class TimezoneMock {
    // eslint-disable-next-line class-methods-use-this
    tz() {
        return `America/Montreal`;
    }

    // eslint-disable-next-line class-methods-use-this
    now() {
        return moment().utc();
    }

    // eslint-disable-next-line class-methods-use-this
    fromDate(date) {
        return moment(date);
    }

    // eslint-disable-next-line class-methods-use-this
    readLocalDate(date) {
        return moment(date).utc(true);
    }
}

describe('r-date-range.vue', () => {
    it('renders props when passed', () => {
        const wrapper = shallowMount(RDateRange, {
            components: {RPopper},
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RDateRange, {
            components: {RPopper},
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should emit on selecting range in the calendar', async () => {
        const wrapper = mount(RDateRange, {
            components: {RPopper},
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
        });

        expect(wrapper.find('.r-date-range').exists()).toBeTruthy();

        const selected = {
            start: moment(start).utc(),
            end: moment(end).utc(),
        };


        wrapper.vm.dateChange(selected);
        expect(wrapper.emitted().input[0][0].start.format(DateTimeFormats.datetime))
            .toEqual(selected.start.format(DateTimeFormats.datetime));
        expect(wrapper.emitted().input[0][0].end.format(DateTimeFormats.datetime))
            .toEqual(selected.end.format(DateTimeFormats.datetime));
    });

    it('should toggle the poppers', async () => {
        const wrapper = mount(RDateRange, {
            components: {RPopper},
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
        });

        wrapper.vm.$refs.presets.popper.toggle = jest.fn();
        wrapper.vm.$refs.presets.popper.close = jest.fn();
        wrapper.vm.toggle('presets');
        expect(wrapper.vm.$refs.presets.popper.toggle).toBeCalled();
        wrapper.vm.toggle('calendar');
        expect(wrapper.vm.$refs.presets.popper.close).toBeCalled();
    });

    it('should have presets available', async () => {
        const wrapper = mount(RDateRange, {
            components: {RPopper},
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
        });

        const preset = 'today';
        expect(wrapper.vm.getPresetLabel(preset))
            .toEqual('Today');
        expect(wrapper.vm.getFormattedPresetPeriod(preset))
            .toEqual(moment().format(DateTimeFormats.orderDate));
        wrapper.vm.relativeFilterChange(preset);
        expect(wrapper.emitted().input[0][0].start.format(DateTimeFormats.datetime))
            .toEqual(moment().startOf('day').format(DateTimeFormats.datetime));
        expect(wrapper.emitted().input[0][0].end.format(DateTimeFormats.datetime))
            .toEqual(moment().endOf('day').format(DateTimeFormats.datetime));
    });

    it('should show selected date range properly', async () => {
        const wrapper = mount(RDateRange, {
            components: {RPopper},
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
        });

        const selected = {
            start: moment(start).utc().format(DateTimeFormats.datetime),
            end: moment(end).utc().format(DateTimeFormats.datetime),
        };

        expect(wrapper.vm.selectedPeriod.start.utc().format(DateTimeFormats.datetime))
            .toEqual(selected.start);
        expect(wrapper.vm.selectedPeriod.end.utc().format(DateTimeFormats.datetime))
            .toEqual(selected.end);
        expect(wrapper.vm.selectedDateLabel).toEqual('Jan 1, 2020 - Jan 2, 2020');
    });

    it('should check is the period valid', async () => {
        const wrapper = mount(RDateRange, {
            components: {RPopper},
            propsData: {
                period: `01-01..01-10`,
                timezoneHandler: () => new TimezoneMock(),
            },
        });

        expect(wrapper.vm.isValidDatesPeriod).toBeFalsy();
        wrapper.setProps({period});
        expect(wrapper.vm.isValidDatesPeriod).toBeTruthy();
    });
});
