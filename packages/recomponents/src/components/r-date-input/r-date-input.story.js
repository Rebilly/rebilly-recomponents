import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, select, text} from '@storybook/addon-knobs';
import markdown from './r-date-input.md';
import RDateInput from './r-date-input.vue';

const date = new Date();

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
                        [`allow since ${date}`]: date,
                    }, null,
                ),
            },
            label: {
                default: text('label', ''),
            },
            disabled: {
                default: boolean('disabled', false),
            },
            placeholder: {
                default: text('placeholder', ''),
            },
            helpText: {
                default: text('helpText', ''),
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
                        datepicker: 'datepicker',
                        range: 'range',
                    },
                    'date',
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
                        @input="input"/>
            </div>
        `,
    }), {
        notes: {markdown},
    });
