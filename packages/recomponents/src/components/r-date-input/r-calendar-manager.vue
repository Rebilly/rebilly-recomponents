<template>
  <div class="calendar">
    <r-input
        :disabled="disabled"
        right-icon="calendar"
        v-show="disabled"/>
    <no-ssr>
      <v-date-picker v-if="!isDateRange"
                     v-show="!disabled"
                     :value="value"
                     @input="dateInput"
                     :mode="mode"
                     popover-visibility="focus"
                     :popover-content-offset="4"
                     :min-date="minDate"
                     :max-date="maxDate"
                     :columns="columns"
                     color="blue"
                     :theme-styles="themeStyles"
                     :available-dates="availableDates">
        <template v-slot="{ inputValue, inputEvents }">
          <r-input :value="inputValue"
                   :input-events="inputEvents"
                   :disabled="disabled"
                   :placeholder="placeholder"
                   right-icon="calendar"/>
        </template>
      </v-date-picker>
      <v-date-picker v-else
                     :mode="mode"
                     @input="periodInput"
                     is-range
                     :value="value"
                     :masks="masks"
                     :theme-styles="themeStyles"
                     show-caps
                     :min-date="minDate"
                     :max-date="maxDate"
                     :select-attribute="dragSelectAttributes"
                     :drag-attribute="dragSelectAttributes"
                     color="blue"
                     :available-dates="availableDates"
                     :disabled-attribute="disabledAttribute"
                     :columns="columns"
      >
        <template v-slot="{ togglePopover }">
          <r-date-range-button-group :value="value"
                                     :calendar-toggle="togglePopover"
                                     :disabled="disabled"
                                     :placeholder="placeholder"
                                     @input="periodInput"/>
        </template>
      </v-date-picker>
    </no-ssr>
  </div>
</template>

<script>
    import Vue from 'vue';
    import vCalendar from 'v-calendar';
    import DateTimeFormats from '../../common/datetime-formats';
    import rInput from '../r-input/r-input.vue';
    import rDateRangeButtonGroup from './r-date-range-button-group.vue';

    Vue.use(vCalendar, {
        formats: {
            title: 'MMMM YYYY',
            weekdays: 'W',
            navMonths: 'MMM',
            input: [
                DateTimeFormats.datePickerDate,
                'YYYY-MM-DD',
                'YYYY/MM/DD',
            ],
            dayPopover: 'L',
        },
    });

    // TODO disabled state + active value (no-editable date value)
    export default {
        name: 'RCalendarManager',
        components: {rInput, rDateRangeButtonGroup},
        props: {
            availableDates: {
                type: Object,
                default: null,
            },
            columns: {
                type: Number,
                default: 1,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            dragSelectAttributes: {
                type: Object,
                default: () => ({
                    popover: {
                        visibility: 'hidden',
                    },
                }),
            },
            datePicker: {
                type: Boolean,
                default: true,
            },
            timePicker: {
                type: Boolean,
                default: false,
            },
            minDate: {
                type: Date,
            },
            maxDate: {
                type: Date,
                default: () => new Date(),
            },
            type: {
                type: String,
                default: 'calendar',
                validator: type => ['calendar', 'range'].includes(type),
            },
            value: {
                type: [Object, String],
            },
            placeholder: {
                type: String,
            },
        },
        computed: {
            mode() {
                let mode = this.datePicker ? 'date' : '';
                mode += this.timePicker && 'Time';
                return mode;
            },
            isDateRange() {
                return this.type === 'range';
            },
        },
        data() {
            return {
                initialDate: this.value,
                masks: {
                    input: 'YYYY-MM-DD h:mm A',
                },
                themeStyles: {
                    wrapper: {
                        background: '#FFFFFF',
                        borderRadius: '4px',
                        boxShadow: 'none',
                        border: 'none',
                        fontFamily: '"Roboto", sans-serif',
                    },
                    header: {
                        padding: '16px 20px',
                    },
                    headerTitle: {
                        fontSize: '16px',
                        lineHeight: '20px',
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: '500',
                        color: '#0D2B3E',
                    },
                    weekdays: {
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#6B7384',
                        fontWeight: 'normal',
                    },
                    dayCell: {
                        backgroundColor: '',
                    },
                    dayContent: {
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#0D2B3E',
                        width: '32px',
                        height: '32px',
                    },
                    dayContentHover: {
                        backgroundColor: '#E1E7EA',
                    },
                    verticalDivider: {
                        borderLeft: '1px solid #E1E7EA',
                    },
                    bars: {
                        backgroundColor: 'red',
                    },
                    tintColor: '#DCE7FE',
                },
                disabledAttribute: {
                    contentStyle: {
                        color: '#C4CED8',
                        fontWeight: 'normal',
                    },
                },
            };
        },
        methods: {
            periodInput(period) {
                this.$emit('input', period);
            },
            dateInput(date) {
                if (!date) {
                    return;
                }
                this.$emit('input', date);
            },
        },
    };
</script>
<style lang="scss">
@import './v-calendar.min.css';
@import './r-date-input.scss';
</style>
