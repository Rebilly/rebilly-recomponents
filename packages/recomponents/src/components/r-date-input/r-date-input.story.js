import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, select, text} from '@storybook/addon-knobs';
import RDateInput from './r-date-input.vue';
import markdown from './r-date-input.md';

storiesOf('Components/DateInput', module)
    .add('Date', () => ({
        props: {
            availableDates: {
                default: select(
                    'availableDates',
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
        components: {RDateInput},
        template: `<r-date-input 
                        :available-dates="availableDates"
                        :label="label"
                        :disabled="disabled"
                        :placeholder="placeholder"
                        :helpText="helpText"
                        :stack="stack"
                        :type="type"  
                        :validate="validate"  
                        :noFlex="noFlex"  
                        v-model="date"
                        @input="input"/>`,
    }), {
        notes: {markdown},
    });
