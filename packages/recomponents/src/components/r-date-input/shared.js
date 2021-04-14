const DateInputType = {
    date: 'date',
    dateTime: 'datetime',
    dateRange: 'date-range',
    dateTimeRange: 'datetime-range',
    time: 'time',
};

const CalendarOptions = {
    [DateInputType.date]: {type: 'calendar', timePicker: false, datePicker: true, onInput: 'dateChange'},
    [DateInputType.dateTime]: {type: 'calendar', timePicker: true, datePicker: true, onInput: 'dateChange'},
    [DateInputType.time]: {type: 'calendar', timePicker: true, datePicker: false, onInput: 'timeChange'},
    [DateInputType.dateRange]: {type: 'range', timePicker: false, datePicker: true, onInput: 'periodChange'},
    [DateInputType.dateTimeRange]: {type: 'range', timePicker: true, datePicker: true, onInput: 'periodChange'},
};

export {
    DateInputType,
    CalendarOptions,
};
