const calendarPresets = {
    last30Days: 'last30Days',
    thisMonth: 'thisMonth',
    lastMonth: 'lastMonth',
    last3Months: 'last3Months',
    last6Months: 'last6Months',
    lastYear: 'lastYear',
};

export const calendarPresetsLabels = {
    [calendarPresets.last30Days]: 'Last 30 days',
    [calendarPresets.thisMonth]: 'This month',
    [calendarPresets.lastMonth]: 'Last month',
    [calendarPresets.last3Months]: 'Last 3 months',
    [calendarPresets.last6Months]: 'Last 6 months',
    [calendarPresets.lastYear]: 'Last year',
};

export const calendarPresetsPeriods = {
    [calendarPresets.last30Days]: tz => ({
        start: tz.now().startOf('day').subtract(30, 'days'),
        end: tz.now().endOf('day'),
    }),
    [calendarPresets.thisMonth]: tz => ({
        start: tz.now().startOf('month'),
        end: tz.now().endOf('day'),
    }),
    [calendarPresets.lastMonth]: tz => ({
        start: tz.now().subtract(1, 'month').startOf('month'),
        end: tz.now().subtract(1, 'month').endOf('month'),
    }),
    [calendarPresets.last3Months]: tz => ({
        start: tz.now().subtract(3, 'month').startOf('month'),
        end: tz.now().subtract(1, 'month').endOf('month'),
    }),
    [calendarPresets.last6Months]: tz => ({
        start: tz.now().subtract(6, 'month').startOf('month'),
        end: tz.now().subtract(1, 'month').endOf('month'),
    }),
    [calendarPresets.lastYear]: tz => ({
        start: tz.now().subtract(1, 'year').startOf('year'),
        end: tz.now().subtract(1, 'year').endOf('year'),
    }),
};

export default calendarPresets;
