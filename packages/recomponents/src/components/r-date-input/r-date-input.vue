<template>
  <div :class="{'r-no-flex': noFlex}">
    <div class="r-field" :class="{'r-is-error': isInvalid}">
      <label v-if="label" class="r-field-label">{{ label }}</label>
      <r-calendar-manager class="r-date-input"
                          :type="CalendarOptions[type].type"
                          :time-picker="CalendarOptions[type].timePicker"
                          :date-picker="CalendarOptions[type].datePicker"
                          :value="value"
                          :timezone="timezone"
                          :min-date="minDate"
                          :max-date="maxDate"
                          :drag-select-attributes="dragSelectAttributes"
                          :disabled="disabled"
                          :placeholder="placeholder"
                          :available-dates="availableDates"
                          :is24hr="is24hr"
                          @input="onInput"/>
      <span class="r-field-caption" v-if="helpText">{{ helpText }}</span>
    </div>
  </div>
</template>

<script>
    import moment from 'moment';
    import shortid from 'shortid';
    import rIcon from '../r-icon/r-icon.vue';
    import rSelect from '../r-select/r-select.vue';
    import {DateInputType, CalendarOptions} from './shared';
    import rCalendarManager from './r-calendar-manager.vue';

    // TODO: prefixes simple classes `r-stack-xs, r-is-error, etc`
    export default {
        name: 'RDateInput',
        components: {
            rIcon,
            rSelect,
            rCalendarManager,
        },
        props: {
            /**
             * Specify available dates list
             */
            availableDates: {
                type: Object,
                required: false,
                default: null,
            },
            /**
             * Set the label
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * Define number of calendars (inline)
             */
            columns: {
                type: Number,
                default: 1,
            },
            /**
             * Disabled state of date picker
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Set the placeholder
             */
            placeholder: {
                type: String,
                default: null,
            },
            /**
             * Set the placement of the calendar popover
             */
            placement: {
                type: String,
                default: 'bottom',
            },
            /**
             * Set the help text
             */
            helpText: {
                type: String,
                default: null,
            },
            /**
             * Specify type of the date picker
             */
            type: {
                type: String,
                default: 'date',
            },
            /**
             * Change the name of date picker
             */
            name: {
                type: String,
                default: () => shortid.generate(),
            },
            /**
             * Used to specify what dates are selected
             */
            value: {
                type: [Object, String, Date],
                default: () => new Date(),
            },
            /**
             * Specify how to validate
             */
            validate: {
                type: Object,
                default: null,
            },
            /**
             * Styles the view of date picker
             */
            noFlex: {
                type: Boolean,
                required: false,
                default: false,
            },
            /**
             * Configure the view of date picker details (popover etc.)
             */
            dragSelectAttributes: {
                type: Object,
            },
            /**
             * Specify the max date of available for selection dates
             */
            maxDate: {
                type: Date,
            },
            /**
             * Specify the min date of available for selection dates
             */
            minDate: {
                type: Date,
            },
            /**
             * Specify the timezone
             */
            timezone: {
                type: String,
                default: 'UTC',
            },
            /**
             * Define if the time format is 24H
             */
            is24hr: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                CalendarOptions,
            };
        },
        computed: {
            isInvalid() {
                if (this.validate) {
                    return this.validate.$invalid && this.validate.$dirty;
                }
                return false;
            },
            isDateRange() {
                return [DateInputType.dateRange, DateInputType.dateTimeRange].includes(this.type);
            },
        },
        methods: {
            onInput(date) {
                let value;
                if ([DateInputType.dateTimeRange, DateInputType.dateRange].includes(this.type)) {
                    value = {
                        ...date,
                        start: moment(date.start).tz(this.timezone),
                        end: moment(date.end).tz(this.timezone),
                    };
                } else {
                    value = moment(date).tz(this.timezone, this.type === DateInputType.date);
                }
                /**
                 * Date change by element click or from parent component
                 * @type {Event}
                 */
                this.$emit('input', value);
            },
        },
    };
</script>
<style lang="scss">
@import '../../styles/grid.scss';
@import '../r-input/r-input.scss';
@import './r-date-input.scss';
</style>
