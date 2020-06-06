import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {boolean} from '@storybook/addon-knobs';
import markdown from './r-month-picker.md';
import RMonthPickerInput from './r-month-picker-input.vue';

storiesOf('Components.Month Picker', module)
    .addParameters({component: RMonthPickerInput})
    .add('Month Picker Input', () => ({
        props: {
            clearable: {default: boolean('Clearable', false)},
        },
        data() {
            return {
                date: {
                    monthIndex: 2,
                    year: new Date().getFullYear(),
                },
            };
        },
        methods: {
            input: action('input'),
        },
        template: `
            <div class="storybook-center">
                <r-month-picker-input
                        v-model="date"
                        :default-month="2"
                        :clearable="clearable"
                        :default-year="2020"
                        @input="input"/>
            </div>
`,
    }), {
        notes: {markdown},
    });
