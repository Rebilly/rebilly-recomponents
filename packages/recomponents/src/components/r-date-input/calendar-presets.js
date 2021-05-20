import moment from 'moment';

const calendarPresets = {
    today: 'today',
    yesterday: 'yesterday',
    thisWeek: 'thisWeek',
    lastWeek: 'lastWeek',
    last30Days: 'last30Days',
    thisMonth: 'thisMonth',
    lastMonth: 'lastMonth',
    last3Months: 'last3Months',
    last6Months: 'last6Months',
    thisYear: 'thisYear',
    lastYear: 'lastYear',
};

export const oneValuePresetsList = [calendarPresets.today, calendarPresets.yesterday];

export const calendarPresetsLabels = {
    [calendarPresets.today]: 'Today',
    [calendarPresets.yesterday]: 'Yesterday',
    [calendarPresets.thisWeek]: 'This week',
    [calendarPresets.lastWeek]: 'Last week',
    [calendarPresets.last30Days]: 'Last 30 days',
    [calendarPresets.thisMonth]: 'This month',
    [calendarPresets.lastMonth]: 'Last month',
    [calendarPresets.last3Months]: 'Last 3 months',
    [calendarPresets.last6Months]: 'Last 6 months',
    [calendarPresets.thisYear]: 'This year',
    [calendarPresets.lastYear]: 'Last year',
};

export const getCalendarPresetPeriods = {
    [calendarPresets.today]: {
        relativeFilterValue: 'today..tomorrow',
        start: moment().startOf('day'),
        end: moment().endOf('day'),
    },
    [calendarPresets.yesterday]: {
        relativeFilterValue: 'yesterday..midnight',
        start: moment().subtract(1, 'day').startOf('day'),
        end: moment().subtract(1, 'day').endOf('day'),
    },
    [calendarPresets.thisWeek]: (() => {
        const start = moment().startOf('week');
        const diff = moment().diff(start, 'days');
        return {
            relativeFilterValue: `${diff} days ago midnight..now`,
            start,
            end: moment().endOf('day'),
        };
    })(),
    [calendarPresets.lastWeek]: (() => {
        const start = moment().subtract(1, 'week').startOf('week');
        const end = moment().subtract(1, 'week').endOf('week');
        const diffStart = moment().diff(start, 'days');
        const diffEnd = moment().diff(end, 'days');
        return {
            relativeFilterValue: `${diffStart} days ago midnight..${diffEnd} days ago midnight`,
            start,
            end,
        };
    })(),
    [calendarPresets.last30Days]: {
        relativeFilterValue: '30 days ago midnight..now',
        start: moment().startOf('day').subtract(30, 'days'),
        end: moment().endOf('day'),
    },
    [calendarPresets.thisMonth]: {
        relativeFilterValue: 'first day of this month midnight..now',
        start: moment().startOf('month'),
        end: moment().endOf('day'),
    },
    [calendarPresets.lastMonth]: {
        relativeFilterValue: 'first day of last month midnight..last day of last month 23:59:59',
        start: moment().subtract(1, 'month').startOf('month'),
        end: moment().subtract(1, 'month').endOf('month'),
    },
    [calendarPresets.last3Months]: {
        relativeFilterValue: 'first day of 3 month ago midnight..now',
        start: moment().subtract(3, 'month').startOf('month'),
        end: moment().subtract(1, 'month').endOf('month'),
    },
    [calendarPresets.last6Months]: {
        relativeFilterValue: 'first day of 6 month ago midnight..now',
        start: moment().subtract(6, 'month').startOf('month'),
        end: moment().subtract(1, 'month').endOf('month'),
    },
    [calendarPresets.thisYear]: {
        relativeFilterValue: 'first day of January midnight..now 23:59:59',
        start: moment().startOf('year'),
        end: moment().endOf('day'),
    },
    [calendarPresets.lastYear]: {
        relativeFilterValue: 'first day of January last year midnight..last day of December last year 23:59:59',
        start: moment().subtract(1, 'year').startOf('year'),
        end: moment().subtract(1, 'year').endOf('year'),
    },
};

export default calendarPresets;
