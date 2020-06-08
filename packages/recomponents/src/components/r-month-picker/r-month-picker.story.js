import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, number, select} from '@storybook/addon-knobs';
import markdown from './r-month-picker.md';
import RMonthPicker from './r-month-picker.vue';
import months from './months';

storiesOf('Components.Month Picker', module)
    .addParameters({component: RMonthPicker})
    .add('Month Picker', () => ({
        props: {
            defaultMonth: {
                default: select(
                    'Default Month',
                    months,
                    'August',
                ),
            },
            defaultYear: {default: number('Default Year', 2020)},
            clearable: {default: boolean('Clearable', false)},
        },
        methods: {
            input: action('input'),
            clear: action('clear'),
            yearChange: action('year-change'),
            monthChange: action('month-change'),
        },
        computed: {
            defaultValue() {
                return {
                    monthIndex: months.findIndex(month => month === this.defaultMonth),
                    year: this.defaultYear,
                };
            },
        },
        template: `
            <div class="storybook-center">
                <r-month-picker
                        :value="defaultValue"
                        :clearable="clearable"
                        @input="input"
                        @clear="clear"
                        @month-change="monthChange"
                        @year-change="yearChange"/>
            </div>
        `,
    }), {
        notes: {markdown},
    });
