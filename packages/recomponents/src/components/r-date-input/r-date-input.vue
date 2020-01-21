<template>
    <div :class="{'r-no-flex': noFlex}">
        <template v-if="type === 'date'">
            <div class="r-field" :class="{'r-is-error': isInvalid}">
                <label v-if="label" class="r-field-label">{{label}}</label>
                <r-calendar-manager
                    class="r-date-input"
                    type="calendar"
                    @input="dateChange"
                    :value="value"
                    :disabled="disabled"
                    :available-dates="availableDates"
                />
                <span class="r-field-caption" v-if="helpText">{{helpText}}</span>
            </div>
        </template>
        <template v-if="type === 'datetime'">
            <p v-if="label" class="r-stack-xs">{{label}}</p>
            <div class="r-grid-fitted r-grid-unstackable r-align-items-center" :class="{'r-is-error': isInvalid}">
                <div class="r-grid-item r-inline-s">
                    <r-calendar-manager
                        class="r-date-input"
                        type="calendar"
                        @input="dateChange"
                        :value="value"
                        :disabled="disabled"
                        :available-dates="availableDates"
                    />
                </div>
                <div class="r-grid-item r-no-flex">
                    <r-select
                        :options="timeOptions.hours"
                        :value="selectedTime.hours"
                        placeholder=""
                        :disabled="disabled"
                        @input="updateHours"
                        class="r-no-flex r-date-time-input"/>
                </div>
                <div class="r-grid-item r-no-flex">
                    <span class="r-date-time-divider">:</span>
                </div>
                <div class="r-grid-item r-no-flex">
                    <r-select
                        :options="timeOptions.minutes"
                        placeholder=""
                        :disabled="disabled"
                        :value="selectedTime.minutes"
                        class="r-no-flex r-date-time-input"
                        @input="updateMinutes"
                    />
                </div>
            </div>
            <span class="r-field-caption" v-if="helpText">{{helpText}}</span>
        </template>
        <template v-if="type === 'time'">
            <p v-if="label" class="r-stack-xs">{{label}}</p>
            <div class="r-grid-fitted grid-unstackable r-align-items-center">
                <div class="r-grid-item r-no-flex">
                    <slot
                        :options="timeOptions.hours"
                        :value="selectedTime.hours"
                        :disabled="disabled"
                        :input="updateHours"
                        name="hours-input">
                        <r-select
                            :options="timeOptions.hours"
                            :value="selectedTime.hours"
                            placeholder=""
                            :disabled="disabled"
                            @input="updateHours"
                            class="r-no-flex r-date-time-input"/>
                    </slot>
                </div>
                <div class="r-grid-item r-no-flex">
                    <span class="r-date-time-divider">:</span>
                </div>
                <div class="r-grid-item r-no-flex">
                    <slot
                        :options="timeOptions.minutes"
                        :value="selectedTime.minutes"
                        :disabled="disabled"
                        :input="updateMinutes"
                        name="minutes-input">
                        <r-select
                            :options="timeOptions.minutes"
                            placeholder=""
                            :disabled="disabled"
                            :value="selectedTime.minutes"
                            class="r-no-flex r-date-time-input"
                            @input="updateMinutes"/>
                    </slot>
                </div>
            </div>
            <span class="r-field-caption" v-if="helpText">{{helpText}}</span>
        </template>
        <template v-if="type === 'datepicker'">
            <v-date-picker v-model="selectedDate"
                           @input="$emit('input', selectedDate)" is-inline/>
        </template>
        <template v-if="type === 'range'">
            <r-calendar-manager type="range"
                                :value="value"
                                @input="$emit('input', $event)"></r-calendar-manager>
        </template>
    </div>
</template>

<script>
    import moment from 'moment';
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
             * TBD
             */
            availableDates: {
                type: Object,
                required: false,
                default: null,
            },
            /**
             * TBD
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            placeholder: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            helpText: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            stack: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            type: {
                type: String,
                default: 'date',
            },
            /**
             * TBD
             */
            name: {
                type: String,
                default: () => shortid.generate(),
            },
            /**
             * TBD
             */
            value: {
                type: Object,
            },
            /**
             * TBD
             */
            validate: {
                type: Object,
                default: null,
            },
            /**
             * TBD
             */
            noFlex: {
                type: Boolean,
                required: false,
                default: false,
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
            selectedTime() {
                return this.restoreTime(this.value);
            },
        },
        methods: {
            dateChange(date) {
                this.selectedDate = date;
                if (this.value) {
                    this.selectedDate.hours(this.value.hours());
                    this.selectedDate.minutes(this.value.minutes());
                }
                this.$emit('input', this.selectedDate);
            },
            // TODO 00 hours/time
            updateTime(type, value) {
                // set empty value
                if (!value) {
                    this.selectedTime.hours = '';
                    this.selectedTime.minutes = '';
                    this.$emit('input', null);
                    return;
                }
                /**
                 * If datepicker would be initialized with null value
                 * this.value is moment, but invalid time.
                 * And, after value changed to null or empty - it's invalid date too.
                 * We should fix that, so, need check value
                 */
                const data = {
                    hours: this.selectedTime.hours || '00',
                    minutes: this.selectedTime.minutes || '00',
                    [type]: value,
                };

                const datetime = this.value && this.value.isValid()
                    ? this.value.clone()
                    : moment().startOf('day');

                this.selectedTime.hours = data.hours;
                this.selectedTime.minutes = data.minutes;

                datetime
                    .hours(parseInt(this.selectedTime.hours, 10))
                    .minutes(parseInt(this.selectedTime.minutes, 10));

                this.$emit('input', datetime);
            },
            updateHours(hours) {
                this.updateTime('hours', hours);
            },
            updateMinutes(minutes) {
                this.updateTime('minutes', minutes);
            },
            restoreTime(date) {
                if (!date) {
                    return {
                        hours: '',
                        minutes: '',
                    };
                }
                // TODO how about {hours: '', minutes:''} value
                if (date !== null && moment.isMoment(date)) {
                    return {
                        hours: date.format('HH'),
                        minutes: date.format('mm'),
                    };
                }
                return {
                    hours: '00',
                    minutes: '00',
                };
            },
        },
    };
</script>
<style lang="scss">
    @import '../../styles/grid.scss';
    @import '../r-input/r-input.scss';
    @import './r-date-input.scss';
</style>
