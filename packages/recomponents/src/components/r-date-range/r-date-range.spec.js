import moment from 'moment-timezone';
import {mount} from '@vue/test-utils';
import {renderToString} from '@vue/server-test-utils';
import RDateRange from './r-date-range.vue';
import DateTimeFormats from '../../common/datetime-formats';

const timezone = 'America/Montreal';
const start = '2020-01-01T00:00:00.000Z';
const end = '2020-01-01T23:59:59.999Z';
const period = `${start}..${end}`;

moment.tz.setDefault(timezone);

class TimezoneMock {
    // eslint-disable-next-line class-methods-use-this
    tz() {
        return timezone;
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
    getRaw(date) {
        return moment.tz(date, this.tz()).utc();
    }
}

describe('r-date-range.vue', () => {
    it('renders props when passed', () => {
        const wrapper = mount(RDateRange, {
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
            stubs: ['no-ssr'],
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should render via SSR and match snapshot', async () => {
        const wrapper = renderToString(RDateRange, {
            propsData: {
                period: `2020-01-01..2020-05-01`,
                timezoneHandler: () => new TimezoneMock(),
            },
            stubs: ['no-ssr'],
        });

        expect(wrapper).toMatchSnapshot();
    });

    it('should emit on selecting range in the calendar', async () => {
        const wrapper = mount(RDateRange, {
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
            stubs: ['no-ssr'],
        });

        expect(wrapper.find('.r-date-range').exists()).toBeTruthy();

        const selected = {
            start: moment(start).utc(),
            end: moment(end).utc(),
        };

        wrapper.vm.dateChange(selected);
        expect(wrapper.emitted().input[0][0].start)
            .toEqual(selected.start.format());
        expect(wrapper.emitted().input[0][0].end)
            .toEqual(selected.end.format());
    });

    it('should toggle the poppers', async () => {
        const wrapper = mount(RDateRange, {
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
            stubs: ['no-ssr'],
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
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
            stubs: ['no-ssr'],
        });

        const preset = 'today';
        expect(wrapper.vm.getPresetLabel(preset))
            .toEqual('Today');
        expect(wrapper.vm.getFormattedPresetPeriod(preset))
            .toEqual(moment().format(DateTimeFormats.orderDate));
        wrapper.vm.relativeFilterChange(preset);
        expect(wrapper.emitted().input[0][0].start)
            .toEqual(moment().startOf('day').utc(true).format());
        expect(wrapper.emitted().input[0][0].end)
            .toEqual(moment().endOf('day').utc(true).format());
    });

    it('should show selected date range properly', async () => {
        const wrapper = mount(RDateRange, {
            propsData: {
                period,
                timezoneHandler: () => new TimezoneMock(),
            },
            stubs: ['no-ssr'],
        });

        const selected = {
            start: moment(start).utc(),
            end: moment(end).utc(),
        };

        expect(wrapper.vm.selectedPeriod.start.utc().format(DateTimeFormats.datetime))
            .toEqual(selected.start.format(DateTimeFormats.datetime));
        expect(wrapper.vm.selectedPeriod.end.utc().format(DateTimeFormats.datetime))
            .toEqual(selected.end.format(DateTimeFormats.datetime));
        expect(wrapper.vm.selectedDateLabel)
            .toEqual(`${moment(start).format(DateTimeFormats.shortDate)} - ${moment(end).format(DateTimeFormats.shortDate)}`);
    });

    it('should not show relative preset text if it is mobile version', async () => {
        const lastYear = {
            start: moment().subtract(1, 'year').startOf('year'),
            end: moment().subtract(1, 'year').endOf('year'),
        };

        const selectedPeriod = {
            isRelative: true,
            relativeFilterValue: 'first day of January last year midnight..last day of December last year 23:59:59',
            start: lastYear.start,
            end: lastYear.end,
        };

        const wrapper = mount(RDateRange, {
            propsData: {
                period: selectedPeriod,
                timezoneHandler: () => new TimezoneMock(),
            },
            stubs: ['no-ssr'],
        });

        expect(wrapper.vm.selectedDateLabel)
            .toEqual(`Last year / ${moment(lastYear.start).format(DateTimeFormats.shortDate)} - ${moment(lastYear.end).format(DateTimeFormats.shortDate)}`);

        window.innerWidth = 560;
        window.dispatchEvent(new Event('resize'));

        const mobileWrapper = mount(RDateRange, {
            propsData: {
                period: selectedPeriod,
                timezoneHandler: () => new TimezoneMock(),
            },
            stubs: ['no-ssr'],
        });

        expect(mobileWrapper.vm.isMobile).toBe(true);
        expect(mobileWrapper.vm.selectedDateLabel)
            .toEqual(`${moment(lastYear.start).format(DateTimeFormats.shortDate)} - ${moment(lastYear.end).format(DateTimeFormats.shortDate)}`);
    });

    it('should check is the period valid', async () => {
        const wrapper = mount(RDateRange, {
            propsData: {
                period: `01-01..01-10`,
                timezoneHandler: () => new TimezoneMock(),
            },
            stubs: ['no-ssr'],
        });

        expect(wrapper.vm.isValidDatesPeriod).toBeFalsy();
        wrapper.setProps({period});
        expect(wrapper.vm.isValidDatesPeriod).toBeTruthy();
    });
});
