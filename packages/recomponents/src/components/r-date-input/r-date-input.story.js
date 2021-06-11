import moment from 'moment';
import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import markdown from './r-date-input.md';
import DateTimeFormats from '../../common/datetime-formats';
import RDateInput from './r-date-input.vue';

const minDate = new Date();

storiesOf('Components.Date Input', module)
  .addParameters({ component: RDateInput })
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
          'datetime-range',
        ),
      },
      timezone: {
        default: select(
          'timezone',
          [
            'Australia/Sydney',
            'America/Montreal',
            'Europe/Prague',
            'Asia/Aqtau',
            'Asia/Krasnoyarsk',
            'Asia/Vladivostok',
            'America/Los_Angeles',
          ],
          'America/Montreal',
        ),
      },
      validate: {
        default: select('validate', [null], null),
      },
      noFlex: {
        default: boolean('noFlex', false),
      },
    },
    data: () => ({
      date: null,
    }),
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
                        @input="input"/>
            </div>
        `,
  }), {
    notes: { markdown },
  });
