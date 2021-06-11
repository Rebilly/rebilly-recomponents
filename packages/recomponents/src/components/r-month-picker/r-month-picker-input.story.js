import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import markdown from './r-month-picker.md';
import RMonthPickerInput from './r-month-picker-input.vue';

storiesOf('Components.Month Picker', module)
  .addParameters({ component: RMonthPickerInput })
  .add('Month Picker Input', () => ({
    props: {
      clearable: { default: boolean('Clearable', false) },
      position: {
        default: select('Position', {
          'Bottom Start': 'bottomStart',
          'Bottom End': 'bottomEnd',
          'Top Start': 'topStart',
          'Top End': 'topEnd',
        }, 'bottomStart'),
      },
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
                        :position="position"
                        :default-month="2"
                        :clearable="clearable"
                        :default-year="2020"
                        @input="input"/>
            </div>
`,
  }), {
    notes: { markdown },
  });
