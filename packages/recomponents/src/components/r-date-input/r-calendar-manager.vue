<template>
    <div class="calendar">
        <r-input
            :disabled="disabled"
            right-icon="calendar"
            v-show="disabled" />
        <v-date-picker
            v-show="!disabled"
            v-if="isDateRange"
            mode="range"
            is-double-paned
            is-inline
            show-caps
            :show-popover="false"
            :theme-styles="themeStyles"
            :tint-color="tintColor"
            :max-date="maxDate"
            :available-dates="availableDates"
            @input="periodInput"
            :disabled-attribute="disabledAttribute"
            :value="internalPeriod">
        </v-date-picker>
        <v-date-picker
            v-show="!disabled"
            v-if="!isDateRange"
            mode="single"
            popover-visibility="focus"
            :popover-content-offset="4"
            :theme-styles="themeStyles"
            :tint-color="tintColor"
            :available-dates="availableDates"
            @input="dateInput"
            :value="internalDate">
        </v-date-picker>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment-timezone';
    import vCalendar from 'v-calendar';
    import 'v-calendar/lib/v-calendar.min.css';
    import {DateTimeFormats} from '../../common/datetime-formats';
    import rInput from '../r-input/r-input.vue';

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

    export default {
        name: 'RCalendarManager',
        components: {rInput},
        props: {
            type: {
                type: String,
                default: 'calendar',
                validator: type => ['calendar', 'range'].includes(type),
            },
            value: {
                type: [Object, String],
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            availableDates: {
                type: Object,
                default: null,
            },
        },
        computed: {
            isDateRange() {
                return this.type === 'range';
            },
            internalPeriod() {
                const start = this.value.start.clone();
                const end = this.value.end.clone();
                return {
                    start: start.tz(moment.tz.guess(), true).toDate(),
                    end: end.tz(moment.tz.guess(), true).toDate(),
                };
            },
            internalDate() {
                if (!this.value) {
                    return null;
                }
                const date = this.value.clone();
                return date.tz(moment.tz.guess(), true).toDate();
            },
        },
        data() {
            return {
                initialDate: this.value,
                maxDate: new Date(),
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
                },
                tintColor: '#DCE7FE',
                disabledAttribute: {
                    contentStyle: {
                        color: '#C4CED8',
                        fontWeight: 'normal',
                    },
                },
            };
        },
        methods: {
            periodInput({start, end}) {
                // convert `v-calendar` Date objects to Moment instances
                // in the user's preferred time zone
                const mutablePeriod = {
                    start: moment(start).startOf('day'),
                    end: moment(end).endOf('day'),
                };
                this.$emit('input', mutablePeriod);
            },
            dateInput(date) {
                // v-date-picker will return null if the selected date is the same as the currently selected date.
                if (!date) {
                    return;
                }
                this.$emit('input', moment(date).startOf('day'));
            },
        },
    };
</script>
