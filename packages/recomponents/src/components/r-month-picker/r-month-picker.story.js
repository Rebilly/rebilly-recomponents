import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import markdown from './r-month-picker.md';
import RMonthPickerInput from './r-month-picker-input.vue';

const minDate = new Date();

storiesOf('Components.Month Picker', module)
    .addParameters({component: RMonthPickerInput})
    .add('Component', () => ({
        methods: {
            input: action('input'),
        },
        template: `
            <div class="storybook-center">
                <r-month-picker-input
                        v-model="month"
                        :default-month="2"
                        :default-year="2020"
                        @input="input"/>
            </div>
`,
    }), {
        notes: {markdown},
    });
