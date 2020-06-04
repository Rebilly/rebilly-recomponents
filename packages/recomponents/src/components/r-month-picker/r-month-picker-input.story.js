import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean, number, select} from '@storybook/addon-knobs';
import markdown from './r-month-picker.md';
import RMonthPickerInput from './r-month-picker-input.vue';
import months from './months';

storiesOf('Components.Month Picker', module)
    .addParameters({component: RMonthPickerInput})
    .add('Month Picker Input', () => ({
        props: {
            defaultMonth: {
                default: select(
                    'Default Month',
                    months,
                    'February',
                ),
            },
            defaultYear: {default: number('Default Year', 2020)},
            clearable: {default: boolean('Clearable', false)},
        },
        methods: {
            input: action('input'),
        },
        computed: {
            defaultValue() {
                return {
                    month: this.defaultMonth,
                    year: this.defaultYear,
                };
            },
        },
        template: `
            <div class="storybook-center">
                <r-month-picker-input
                        :default-value="defaultValue"
                        :default-month="2"
                        :clearable="clearable"
                        :default-year="2020"
                        @input="input"/>
            </div>
`,
    }), {
        notes: {markdown},
    });
