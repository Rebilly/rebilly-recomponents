<template>
    <div :class="{'r-no-flex': noFlex}">
        <template v-if="type === 'date'">
            <div class="r-field" :class="{'r-is-error': isInvalid}">
                <label v-if="label" class="r-field-label">{{ label }}</label>
                <r-calendar-manager class="r-date-input"
                                    type="calendar"
                                    :value="value"
                                    :min-date="minDate"
                                    :max-date="maxDate"
                                    :drag-select-attributes="dragSelectAttributes"
                                    :disabled="disabled"
                                    :placeholder="placeholder"
                                    :available-dates="availableDates"
                                    @input="dateChange"/>
                <span class="r-field-caption" v-if="helpText">{{ helpText }}</span>
            </div>
        </template>
        <template v-if="type === 'datetime'">
            <p v-if="label" class="r-stack-xs">{{ label }}</p>
            <r-calendar-manager class="r-date-input"
                                type="calendar"
                                :time-picker="true"
                                :value="value"
                                :min-date="minDate"
                                :max-date="maxDate"
                                :drag-select-attributes="dragSelectAttributes"
                                :disabled="disabled"
                                :placeholder="placeholder"
                                :available-dates="availableDates"
                                @input="dateChange"
            />
            <span class="r-field-caption" v-if="helpText">{{ helpText }}</span>
        </template>
        <template v-if="type === 'time'">
            <p v-if="label" class="r-stack-xs">{{ label }}</p>
            <r-calendar-manager class="r-date-input"
                                type="calendar"
                                :date-picker="false"
                                :time-picker="true"
                                :value="value"
                                :min-date="minDate"
                                :max-date="maxDate"
                                :drag-select-attributes="dragSelectAttributes"
                                :disabled="disabled"
                                :placeholder="placeholder"
                                :available-dates="availableDates"
                                @input="updateTime"
            />
            <span class="r-field-caption" v-if="helpText">{{ helpText }}</span>
        </template>
        <template v-if="isDateRange">
            <r-calendar-manager type="range"
                                :time-picker="type === 'datetime-range'"
                                :min-date="minDate"
                                :max-date="maxDate"
                                :columns="columns"
                                :drag-select-attributes="dragSelectAttributes"
                                :value="value"
                                :placeholder="placeholder"
                                @input="$emit('input', $event)"
            ></r-calendar-manager>
        </template>
    </div>
</template>

<script>
    import shortid from 'shortid';
    import rCalendarManager from './r-calendar-manager.vue';
    import rIcon from '../r-icon/r-icon.vue';
    import rSelect from '../r-select/r-select.vue';
    // TODO: prefixes simple classes `r-stack-xs, r-is-error, etc`
    // TODO: detailed description of props
    export default {
        name: 'RDateInput',
        components: {
            rIcon, rCalendarManager, rSelect,
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
                default: null,
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
                type: Object,
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
        },
        data() {
            return {
                selectedDate: this.value,
            };
        },
        computed: {
            isInvalid() {
                if (this.validate) {
                    return this.validate.$invalid && this.validate.$dirty;
                }
                return false;
            },
            timeOptions() {
                /* eslint-disable no-confusing-arrow */
                const hours = Array.from(new Array(24), (val, index) => index < 10 ? `0${index}` : index.toString());
                const minutes = Array.from(new Array(60), (val, index) => index < 10 ? `0${index}` : index.toString());
                /* eslint-enable no-confusing-arrow */
                return {
                    hours,
                    minutes,
                };
            },
            isDateRange() {
                return ['date-range', 'datetime-range'].includes(this.type);
            },
        },
        methods: {
            dateChange(date) {
                this.selectedDate = date;
                if (this.value) {
                    this.selectedDate.hours(this.value.hours());
                    this.selectedDate.minutes(this.value.minutes());
                }
                /**
                 * Date change by element click or from parent component
                 * @type {Event}
                 */
                this.$emit('input', this.selectedDate);
            },
            updateTime(value) {
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