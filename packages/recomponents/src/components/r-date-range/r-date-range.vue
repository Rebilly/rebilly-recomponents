<template>
    <r-popper position="bottomEnd" class="r-date-range" ref="calendar" :disabled="false">
        <template #trigger="calendar">
            <r-button-group>
                <r-icon-button :disabled="disabled" @click="toggle('calendar')">
                    <span class="r-date-range-label" :title="profileTimezoneTitle">
                        {{ selectedDateLabel }}
                    </span>
                    <r-icon class="r-date-range-calendar-icon" slot="left-icon" icon="calendar"/>
                </r-icon-button>
                <r-popper class="r-date-range-preset-picker" position="bottomEnd" ref="presets" :disabled="disabled">
                    <template #trigger="optionsList">
                        <r-icon-button :disabled="disabled" @click="toggle('presets')">
                            <r-icon icon="actions"/>
                        </r-icon-button>
                    </template>
                    <template #content="optionsList">
                        <div class="r-popover">
                            <div class="r-popover-control">
                                <div class="r-popover-content r-popover-menu text-left ">
                                    <a class="r-popover-menu-item r-range-picker-item"
                                       v-for="presetName of calendarPresets"
                                       @click="relativeFilterChange(presetName)">
                                        <strong>{{getPresetLabel(presetName)}}&nbsp;</strong>
                                        <span class="text-muted c-range-picker-item-date-placeholder">
                                            {{getFormattedPresetPeriod(presetName)}}
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>
                </r-popper>
            </r-button-group>
        </template>
        <template #content="calendar">
            <div class="r-popover r-date-range-calendar">
                <div class="r-popover-control">
                    <div class="r-popover-content r-popover-menu">
                        <r-date-input
                                type="range"
                                :disabled="disabled"
                                :value="selectedDate"
                                @input="dateChange($event)"/>
                    </div>
                </div>
            </div>
        </template>
    </r-popper>
</template>

<script>
    import _ from '../../common/helpers';
    import calendarPresets, {
        oneValuePresetsList,
        calendarPresetsLabels,
        getCalendarPresetPeriods,
    } from './calendar-presets';
    import DateTimeFormats from '../../common/datetime-formats';

    export default {
        name: 'RDateRange',
        components: {},
        props: {
            /**
             * Specify the selected period
             */
            period: {
                type: String,
                required: true,
            },
            /**
             * Specify the timezone handler
             */
            timezoneHandler: {
                type: Function,
            },
            /**
             * Specify if the date range picker is disabled
             */
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                value: {},
            };
        },
        computed: {
            calendarPresets() {
                // list of default preset names today, yesterday, lastWeek, last30Days, etc...
                return calendarPresets;
            },
            calendarPresetsPeriods() {
                // object with values for current preset list
                // what is the today? what is the last week?
                // the getCalendarPresetPeriods returns
                // {today: {relativeFilterValue: String, start: MomentDate, end: MomentDate}}
                // {last30Days: {relativeFilterValue: String, start: MomentDate, end: MomentDate}}
                return getCalendarPresetPeriods(this.timezoneHandler());
            },
            calendarPresetsPeriodsList() {
                return Object.entries(this.calendarPresetsPeriods);
            },
            isValidDatesPeriod() {
                return /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(this.period); // has year value
            },
            isRelative() {
                // the props value period is relative period but could be custom period
                // so it could be something like '5 years ago..now'
                return !this.isValidDatesPeriod;
            },
            selectedRelativeParams() {
                // returns {start, end, presetName: (optional), presetLabel: (optional)}
                // if the period props value is relative date then that method should return start and end values
                // also if the period is one of default presets method will return default preset name and label
                if (!this.isRelative) {
                    return null;
                }
                const preset = this.calendarPresetsPeriodsList
                    .find(([, {relativeFilterValue}]) => relativeFilterValue === this.period);
                if (preset) {
                    // the period value is one of default relative presets
                    const [presetName, presetParams] = preset;
                    return {
                        presetName,
                        presetLabel: calendarPresetsLabels[presetName],
                        ...presetParams,
                    };
                }
                // the props period value is relative but not default preset
                const [start, end] = this.period.split('..');
                // this is the relative value but not value from the preset
                // so the value could be like "5 years ago..now"
                // see https://help.rebilly.com/en/articles/3296639-relative-time-filters
                return {start, end};
            },
            isRelativePreset() {
                // returns true if the props period is relative date and one of default presets
                return this.selectedRelativeParams && this.selectedRelativeParams.presetName;
            },
            selectedPeriod() {
                if (this.isRelative && this.isRelativePreset) {
                    const relative = this.selectedRelativeParams;
                    return {
                        ...relative,
                        start: relative.start,
                        end: relative.end,
                    };
                }
                const [start, end] = this.period.split('..');
                if (this.isValidDatesPeriod) {
                    // the start and end values are ISO strings
                    // convert to profile timezone
                    return {
                        start: this.timezoneHandler().fromDate(start),
                        end: this.timezoneHandler().fromDate(end),
                    };
                }
                return {
                    // the start and end some non-default relative value
                    // we can't to parse custom relative values
                    // so just render
                    start,
                    end,
                };
            },
            selectedDate() {
                return this.isValidDatesPeriod || this.isRelativePreset
                    ? this.selectedPeriod
                    : {start: null, end: null};
            },
            profileTimezoneTitle() {
                if (!this.isRelative) {
                    return this.timezoneHandler().tz();
                }
                return '';
            },
            selectedDateLabel() {
                // that means profile timezone !== browser timezone
                // so we could have some problems with time understanding
                const selected = this.selectedPeriod;
                if (this.isRelative && this.isRelativePreset) {
                    // props period is relative and one of default preset
                    if (oneValuePresetsList.includes(selected.presetName)) {
                        // props period is relative and one-day values like today/yesterday
                        // returns "Today / Date"
                        return [
                            selected.presetLabel,
                            _.date(selected.start, DateTimeFormats.orderDate),
                        ].join(' / ');
                    }
                    // returns "Today / yy-mm-dd - yy-mm-dd"
                    return `${selected.presetLabel} / ${[
                        _.date(selected.start, DateTimeFormats.shortDate),
                        _.date(selected.end, DateTimeFormats.shortDate),
                    ].join(' - ')}`;
                }
                if (this.isRelative) {
                    // custom relative
                    // returns some custom relative values
                    // like 7 Years Ago..2 Years Ago
                    return [selected.start, selected.end].join(' - ');
                }
                // returns real dates in DateTimeFormats.shortDate string format
                return [
                    _.date(selected.start, DateTimeFormats.shortDate),
                    _.date(selected.end, DateTimeFormats.shortDate),
                ].join(' - ');
            },
        },
        methods: {
            getPresetLabel(presetName) {
                return calendarPresetsLabels[presetName];
            },
            getFormattedPresetPeriod(presetName) {
                const period = this.calendarPresetsPeriods[presetName];
                if (oneValuePresetsList.includes(presetName)) {
                    return _.date(period.start, DateTimeFormats.orderDate);
                }
                const formatter = value => _.date(value, DateTimeFormats.shortDate);
                return `${formatter(period.start)} — ${formatter(period.end)}`;
            },
            toggle(name) {
                if (name === 'presets') {
                    this.$refs.presets.popper.toggle();
                    this.$refs.calendar.popper.close();
                } else {
                    this.$refs.calendar.popper.toggle();
                    this.$refs.presets.popper.close();
                }
            },
            close() {
                this.$refs.presets.popper.close();
                this.$refs.calendar.popper.close();
            },
            relativeFilterChange(presetName) {
                const period = this.calendarPresetsPeriods[presetName];
                /**
                 * The date range selected
                 * @type {Event}
                 */
                this.$emit('input', {
                    isRelative: true,
                    ...period,
                });
                this.$nextTick(() => {
                    this.close();
                });
            },
            dateChange(date) {
                // parse selected dates and convert to correct timezone
                // the datepicker returns dates in browser timezone
                // we should emit values in profile timezone
                // so we have to convert
                // the problem details: if your browser timezone is +3 then you will have .toISOString as 21:00
                // and user profile timezone will never change that value
                const start = this.timezoneHandler().readLocalDate(date.start.format(DateTimeFormats.datePickerDate)).startOf('day');
                const end = this.timezoneHandler().readLocalDate(date.end.format(DateTimeFormats.datePickerDate)).endOf('day');
                this.$emit('input', {
                    isRelative: false,
                    start,
                    end,
                });
                this.$nextTick(() => {
                    this.close();
                });
            },
        },
    };
</script>

<style lang="scss">
    @import './r-date-range.scss';
</style>
