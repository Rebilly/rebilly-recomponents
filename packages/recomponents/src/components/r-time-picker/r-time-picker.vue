<template>
    <div class="r-field r-time-picker__wrapper">
        <label v-if="label"
               class="r-field-label">
            {{ label }}
        </label>
        <div class="r-time-picker">
            <div class="r-time-picker__input">
                <r-select
                        :id="getId('hours')"
                        :options="timeOptions.hours"
                        :value="selectedTime.hours"
                        :placeholder="placeholder"
                        :disabled="disabled"
                        @input="updateHours"
                        @close="$emit('close', $event)"
                        @open="$emit('open', $event)"
                        @remove="$emit('remove', $event)"
                        @select="$emit('select', $event)"></r-select>
            </div>
            <div class="r-time-picker__divider">
                <span>:</span>
            </div>
            <div class="r-time-picker__input">
                <r-select
                        :id="getId('minutes')"
                        :options="timeOptions.minutes"
                        :placeholder="placeholder"
                        :disabled="disabled"
                        :value="selectedTime.minutes"
                        @input="updateMinutes"
                        @close="$emit('close', $event)"
                        @open="$emit('open', $event)"
                        @remove="$emit('remove', $event)"
                        @select="$emit('select', $event)"></r-select>
            </div>
        </div>
        <span class="r-field-caption" v-if="helpText">{{ helpText }}</span>
    </div>
</template>

<script>
    import moment from 'moment';
    import RSelect from '../r-select/r-select.vue';

    export default {
        name: 'r-time-picker',
        components: {RSelect},
        data() {
            return {};
        },
        props: {
            id: {
                type: String,
                default: null,
            },
            label: {
                type: String,
                default: null,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
                default: null,
            },
            helpText: {
                type: String,
                default: '',
            },
            validate: {
                type: Object,
                default: null,
            },
            value: {
                type: [Object, String],
            },
        },
        computed: {
            isInvalid() {
                if (this.validate) {
                    return this.validate.$invalid && this.validate.$dirty;
                }
                return false;
            },
            timeOptions() {
                const hours = Array.from(new Array(24), (val, index) => (index < 10
                    ? `0${index}`
                    : index.toString()));
                const minutes = Array.from(new Array(60), (val, index) => (index < 10
                    ? `0${index}`
                    : index.toString()));
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
            getId(type) {
                return this.id ? `${this.id}-${type}` : null;
            },
            updateTime(type, value) {
                if (!value) {
                    this.selectedTime.hours = '';
                    this.selectedTime.minutes = '';
                    this.$emit('input', null);
                    return;
                }

                const data = {
                    hours: this.selectedTime.hours || '00',
                    minutes: this.selectedTime.minutes || '00',
                    [type]: value,
                };

                const datetime = moment(this.value).isValid()
                    ? moment(this.value)
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
                if (date !== null && moment(date).isValid()) {
                    return {
                        hours: moment(date).format('HH'),
                        minutes: moment(date).format('mm'),
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
    @import "./r-time-picker.scss";
</style>
