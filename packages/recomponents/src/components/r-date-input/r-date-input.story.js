import moment from 'moment';
import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, select, text} from '@storybook/addon-knobs';
import markdown from './r-date-input.md';
import DateTimeFormats from '../../common/datetime-formats';
import RDateInput from './r-date-input.vue';
import {DateInputType} from './shared';

const timezones = require('./timezones.json');

const minDate = new Date();

storiesOf('Components.Date Input', module)
    .addParameters({component: RDateInput})
    .add('Component', () => ({
        props: {
            availableDates: {
                default: select(
                    'available dates',
                    {
                        null: null,
                        'start from today': {
                            start: new Date(),
                            end: null,
                        },
                    },
                    null,
                ),
            },
            maxDate: {
                default: select(
                    'max date',
                    {
                        'no restrictions': null,
                        'only past dates': new Date(),
                    }, null,
                ),
            },
            minDate: {
                default: select(
                    'min date',
                    {
                        'no restrictions': null,
                        [`allow since ${moment(minDate).format(DateTimeFormats.shortDate)}`]: minDate,
                    }, null,
                ),
            },
            label: {
                default: text('label', 'Date picker'),
            },
            disabled: {
                default: boolean('disabled', false),
            },
            placeholder: {
                default: text('placeholder', 'Date'),
            },
            helpText: {
                default: text('helpText', 'Please click on the input to select a date'),
            },
            stack: {
                default: text('stack', ''),
            },
            type: {
                default: select(
                    'type',
                    {
                        date: 'date',
                        datetime: 'datetime',
                        time: 'time',
                        dateRange: 'date-range',
                        dateTimeRange: 'datetime-range',
                    },
                    'datetime',
                ),
            },
            timezone: {
                default: select(
                    'timezone',
                    timezones,
                    'Etc/GMT+3',
                ),
            },
            validate: {
                default: select('validate', [null], null),
            },
            noFlex: {
                default: boolean('noFlex', false),
            },
            is24hr: {
                default: boolean('24-hr time mode', false),
            },
        },
        data() {
            return {
                date: null,
            };
        },
        watch: {
            type(newType) {
                this.date = [DateInputType.dateRange, DateInputType.dateTimeRange].includes(newType)
                    ? '2021-10-08T00:00:00-03:00'
                    : {
                        start: '2021-10-13T00:00:00-03:00',
                        end: '2021-10-20T23:59:59-03:00',
                    };
            },
        },
        methods: {
            input: action('input'),
        },
        template: `
          <div class="storybook-center">
          <r-date-input
              :available-dates="availableDates"
              :label="label"
              :disabled="disabled"
              :placeholder="placeholder"
              :helpText="helpText"
              :stack="stack"
              :type="type"
              :min-date="minDate"
              :max-date="maxDate"
              :validate="validate"
              :noFlex="noFlex"
              v-model="date"
              :timezone="timezone"
              :is24hr="is24hr"
              @input="input"/>
          </div>`,
    }), {
        notes: {markdown},
    });
