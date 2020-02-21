import {boolean, select} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/vue';
import markdown from './r-date-range.md';
import RDateRange from './r-date-range.vue';
import DateTimeFormats from '../../common/datetime-formats';
import calendarPresets, {getCalendarPresetPeriods} from './calendar-presets';

const minDate = new Date();

storiesOf('Components.Date Range', module)
    .addParameters({component: RDateRange})
    .add('Component', () => ({
        props: {
            showPresets: {
                default: boolean('Show Presets', true),
            },
            disabled: {
                default: boolean('Disabled', false),
            },
            maxDate: {
                default: select(
                    'Max Date', {
                        'no restrictions': null,
                        'only past dates': new Date(),
                    }, null,
                ),
            },
            minDate: {
                default: select(
                    'Min Date', {
                        'no restrictions': null,
                        'only past dates': new Date(),
                        [`allow since ${minDate}`]: minDate,
                    }, null,
                ),
            },
        },
        data() {
            return {
                period: undefined,
            };
        },
        created() {
            if (!this.period) {
                this.updatePeriod(getCalendarPresetPeriods(this.$tz())[calendarPresets.today]);
            }
        },
        methods: {
            convertDate(date) {
                return this.$tz().fromDate(date).format(DateTimeFormats.datePickerDate);
            },
            updatePeriod(period) {
                this.period = `${this.convertDate(period.start)}..${this.convertDate(period.end)}`;
            },
        },
        template: `
            <div class="storybook-center">
                <div>
                    <r-date-range :timezone-handler="$tz"
                                  :period="period"
                                  :min-date="minDate"
                                  :show-presets="showPresets"
                                  :max-date="maxDate"
                                  :disabled="disabled"
                                  @input="updatePeriod"></r-date-range>
                </div>
            </div>`,
    }), {
        notes: {markdown},
    });
