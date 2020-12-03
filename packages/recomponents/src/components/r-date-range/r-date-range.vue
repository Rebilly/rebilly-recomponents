<template>
    <r-popper position="bottomEnd"
              class="r-date-range"
              ref="calendar"
              :disabled="false"
              :offset="6"
              :margin="[0, 14, 0, 0]">
        <template #trigger="calendar">
            <r-button-group :class="{'r-button-group-single': !showPresets}">
                <r-icon-button :disabled="disabled"
                               :class="{'r-date-range-button': showPresets}"
                               @click="toggle('calendar')">
                    <span class="r-date-range-label" :title="profileTimezoneTitle">
                        {{ selectedDateLabel }}
                    </span>
                    <r-icon class="r-date-range-calendar-icon" slot="left-icon" icon="calendar"/>
                </r-icon-button>
                <r-popper v-if="showPresets"
                          class="r-date-range-preset-picker"
                          position="bottomEnd"
                          ref="presets"
                          :offset="6"
                          :disabled="disabled">
                    <template #trigger="optionsList">
                        <r-icon-button :disabled="disabled" @click="toggle('presets')">
                            <r-icon icon="actions"/>
                        </r-icon-button>
                    </template>
                    <template #content="optionsList">
                        <div class="r-popover">
                            <div class="r-popover-control">
                                <div class="r-popover-content r-popover-menu r-is-scrollable">
                                    <a class="r-popover-menu-item r-range-picker-item"
                                       v-for="presetName of calendarPresets"
                                       @click="relativeFilterChange(presetName)">
                                        <strong>{{getPresetLabel(presetName)}}&nbsp;</strong>
                                        <span class="r-text-muted">
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
            <div class="r-popover r-date-range-calendar"
                 :style="{minWidth: isMobile ? `140px` : `513px`}">
                <div class="r-popover-control">
                    <div class="r-popover-content r-popover-menu">
                        <r-date-input
                                type="range"
                                :disabled="disabled"
                                :max-date="maxDate"
                                :min-date="minDate"
                                :columns="isMobile ? 1 : 2"
                                :value="selectedDate"
                                @input="dateChange($event)"/>
                    </div>
                </div>
            </div>
        </template>
    </r-popper>
</template>

<script>
    import moment from 'moment';
    import _ from '../../common/helpers';
    import calendarPresets, {
        calendarPresetsLabels,
        getCalendarPresetPeriods,
        oneValuePresetsList,
    } from './calendar-presets';
    import DateTimeFormats from '../../common/datetime-formats';
    import RButtonGroup from '../r-button-group/r-button-group.vue';
    import RDateInput from '../r-date-input/r-date-input.vue';
    import RIcon from '../r-icon/r-icon.vue';
    import RIconButton from '../r-icon-button/r-icon-button.vue';
    import RPopper from '../r-popper/r-popper.vue';

    export default {
        name: 'RDateRange',
        components: {
            RButtonGroup,
            RDateInput,
            RIcon,
            RIconButton,
            RPopper,
        },
        props: {
            /**
             * Specify the selected period
             */
            period: {
                type: [String, Object],
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
            /**
             * Specify the max available date
             */
            maxDate: {
                type: Date,
                default: null,
            },
            /**
             * Specify the max available date
             */
            minDate: {
                type: Date,
                default: null,
            },
            /**
             * Specify if there are presets shown
             */
            showPresets: {
                type: Boolean,
                default: true,
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
                return this.validateDatesPeriod(this.period)
                    || (this.validateDatesPeriod(this.period.start) && this.validateDatesPeriod(this.period.end));
            },
            isMobile() {
                return window.innerWidth < 600;
            },
            isRelative() {
                // the props value period is relative period but could be custom period
                // so it could be something like '5 years ago..now'
                return this.period.isRelative || !this.isValidDatesPeriod;
            },
            selectedRelativeParams() {
                // returns {start, end, presetName: (optional), presetLabel: (optional)}
                // if the period props value is relative date then that method should return start and end values
                // also if the period is one of default presets method will return default preset name and label
                if (!this.isRelative) {
                    return null;
                }
                const preset = this.calendarPresetsPeriodsList
                    .find(([, {relativeFilterValue}]) => relativeFilterValue === this.period.relativeFilterValue);
                if (preset) {
                    // the period value is one of default relative presets
                    const [presetName, presetParams] = preset;
                    return {
                        presetName,
                        presetLabel: calendarPresetsLabels[presetName],
                        ...presetParams,
                    };
                }

                return this.parsePeriod(this.period);
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
                const {start, end} = this.parsePeriod(this.period);
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
                if (!this.isMobile) {
                    if (this.isRelative && this.isRelativePreset) {
                        // props period is relative and one of default preset
                        if (oneValuePresetsList.includes(selected.presetName)) {
                            // props period is relative and one-day values like today/yesterday
                            // returns "Today / Date"
                            return [
                                selected.presetLabel,
                                _.formatDate(selected.start, DateTimeFormats.orderDate),
                            ].join(' / ');
                        }
                        // returns "Today / yy-mm-dd - yy-mm-dd"
                        return `${selected.presetLabel} / ${[
                            _.formatDate(selected.start, DateTimeFormats.shortDate),
                            _.formatDate(selected.end, DateTimeFormats.shortDate),
                        ].join(' - ')}`;
                    }
                    if (this.isRelative) {
                        // custom relative
                        // returns some custom relative values
                        // like 7 Years Ago..2 Years Ago
                        return [selected.start, selected.end].join(' - ');
                    }
                }
                // returns real dates in DateTimeFormats.shortDate string format
                return [
                    _.formatDate(selected.start, DateTimeFormats.shortDate),
                    _.formatDate(selected.end, DateTimeFormats.shortDate),
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
                    return _.formatDate(period.start, DateTimeFormats.orderDate);
                }
                const formatter = value => _.formatDate(value, DateTimeFormats.shortDate);
                return `${formatter(period.start)} — ${formatter(period.end)}`;
            },
            validateDatesPeriod(period) {
                return /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(period); // has year value
            },
            toggle(name) {
                if (name === 'presets') {
                    this.$refs.presets.popper.toggle();
                    this.$refs.calendar.popper.close();
                } else {
                    this.$refs.calendar.popper.toggle();
                    if (this.$refs.presets) {
                        this.$refs.presets.popper.close();
                    }
                }
            },
            close() {
                if (this.$refs.presets) {
                    this.$refs.presets.popper.close();
                }

                this.$refs.calendar.popper.close();
            },
            parsePeriod(period) {
                if (typeof this.period === 'string') {
                    const [start, end] = this.period.split('..');
                    return {start, end};
                }
                return period;
            },
            relativeFilterChange(presetName) {
                const period = this.calendarPresetsPeriods[presetName];
                const start = period.start.format();
                const end = period.end.format();

                /**
                 * The date range selected
                 * @type {Event}
                 */
                this.$emit('input', {
                    isRelative: true,
                    ...period,
                    start,
                    end,
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
                const start = this.minDate && this.checkDatesAreSame(this.minDate, date.start)
                    ? this.timezoneHandler().fromDate(this.minDate).format()
                    : this.timezoneHandler().fromDate(moment(date.start).startOf('day')).format();

                const end = this.maxDate && this.checkDatesAreSame(this.maxDate, date.end)
                    ? this.timezoneHandler().fromDate(this.maxDate).format()
                    : this.timezoneHandler().fromDate(moment(date.end).endOf('day')).format();

                this.$emit('input', {
                    isRelative: false,
                    start,
                    end,
                });
                this.$nextTick(() => {
                    this.close();
                });
            },
            checkDatesAreSame(date1, date2) {
                return moment(date1).isSame(date2, 'day');
            },
        },
    };
</script>

<style lang="scss">
    @import './r-date-range.scss';
</style>
