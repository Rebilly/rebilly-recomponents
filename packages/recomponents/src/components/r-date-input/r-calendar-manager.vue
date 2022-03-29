<template>
  <div class="calendar">
    <r-input
        :disabled="disabled"
        right-icon="calendar"
        v-show="disabled"/>
    <no-ssr>
      <v-date-picker ref="datePicker"
                     v-if="!isDateRange"
                     v-show="!disabled"
                     :value="value"
                     @input="dateInput"
                     :mode="mode"
                     popover-visibility="focus"
                     :popover-content-offset="4"
                     :popover="popoverConfigs"
                     :min-date="minDate"
                     :max-date="maxDate"
                     :columns="columns"
                     color="blue"
                     :theme-styles="themeStyles"
                     :timezone="timezone"
                     :model-config="modelConfig"
                     :is24hr="is24hr"
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
                     :value="prepValue"
                     :masks="masks"
                     :theme-styles="themeStyles"
                     show-caps
                     :min-date="minDate"
                     :max-date="maxDate"
                     :model-config="modelConfig"
                     :select-attribute="dragSelectAttributes"
                     :drag-attribute="dragSelectAttributes"
                     color="blue"
                     :popover="popoverConfigs"
                     :timezone="timezone"
                     :available-dates="availableDates"
                     :disabled-attribute="disabledAttribute"
                     :is24hr="is24hr"
                     :columns="columns"
      >
        <template v-slot="{ togglePopover }">
          <r-date-range-button-group :value="value"
                                     :calendar-toggle="togglePopover"
                                     :disabled="disabled"
                                     :time-picker="timePicker"
                                     :timezone="timezone"
                                     :placeholder="placeholder"
                                     :is24hr="is24hr"
                                     @input="periodInput"/>
        </template>
      </v-date-picker>
    </no-ssr>
  </div>
</template>

<script>
    import rInput from '../r-input/r-input.vue';
    import rDateRangeButtonGroup from './r-date-range-button-group.vue';

    // TODO disabled state + active value (no-editable date value)
    export default {
        name: 'RCalendarManager',
        components: {
            rInput,
            rDateRangeButtonGroup,
        },
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
                type: [Object, String, Date],
            },
            placeholder: {
                type: String,
            },
            timezone: {
                type: String,
            },
            hideOnSelection: {
                type: Boolean,
                default: false,
            },
            /**
             * Define if the time format is 24H
             */
            is24hr: {
                type: Boolean,
                default: false,
            },
            placement: {
                type: String,
                default: 'bottom',
            },
        },
        computed: {
            popoverConfigs() {
                return {
                    placement: this.placement,
                    visibility: 'click',
                    modifiers: [
                        {
                            name: 'flip',
                            options: {
                                allowedAutoPlacements: ['bottom'],
                                fallbackPlacements: ['bottom', 'top'],
                            },
                        },
                    ],
                };
            },
            mode() {
                let mode = this.datePicker ? 'date' : '';
                mode += this.timePicker && 'Time';
                return mode;
            },
            modelConfig() {
                if (!this.isDateRange) {
                    return this.timePicker ? {timeAdjust: '00:00:00'} : {
                        type: 'string', mask: 'YYYY-MM-DD',
                    };
                }

                return {
                    start: {timeAdjust: '00:00:00'},
                    end: {timeAdjust: '23:59:59'},
                };
            },
            isDateRange() {
                return this.type === 'range';
            },
            prepValue() {
                if (!this.value) {
                    return null;
                }

                const {start, end} = this.value;
                return {
                    ...this.value,
                    start: start && start.format ? start.format() : start,
                    end: end && end.format ? end.format() : end,
                };
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

                if (this.hideOnSelection) {
                    this.$refs.datePicker.hidePopover();
                }
            },
        },
    };
</script>
<style lang="scss">
@import './v-calendar.min.css';
@import './r-date-input.scss';
</style>
