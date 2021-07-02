<template>
    <r-button-group :class="{'r-button-group-single': !showPresets}">
      <r-icon-button :disabled="disabled"
                     :class="{'r-date-range-button': showPresets}"
                     @click="calendarToggle()">
        <span class="r-date-range-label" v-if="selectedDateLabel">{{ selectedDateLabel }}</span>
        <span class="r-date-range-label r-text-muted" v-else>{{ placeholder }}</span>
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
                  <strong>{{ getPresetLabel(presetName) }}&nbsp;</strong>
                  <span class="r-text-muted">
                  {{ getFormattedPresetPeriod(presetName) }}
                </span>
                </a>
              </div>
            </div>
          </div>
        </template>
      </r-popper>
    </r-button-group>
</template>

<script>
    import _ from '../../common/helpers';
    import calendarPresets, {
        calendarPresetsLabels,
        getCalendarPresetPeriods,
        oneValuePresetsList,
    } from './calendar-presets';
    import DateTimeFormats from '../../common/datetime-formats';
    import RButtonGroup from '../r-button-group/r-button-group.vue';
    import RIcon from '../r-icon/r-icon.vue';
    import RIconButton from '../r-icon-button/r-icon-button.vue';
    import RPopper from '../r-popper/r-popper.vue';

    export default {
        name: 'RDateRangeButtonGroup',
        components: {
            RButtonGroup,
            RIcon,
            RIconButton,
            RPopper,
        },
        props: {
            value: {
                type: [String, Object, Date],
            },
            calendarToggle: {
                type: Function,
                default: () => {
                },
            },
            /**
             * Specify if the date range picker is disabled
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            timePicker: {
                type: Boolean,
                default: false,
            },
            /**
             * Specify if there are presets shown
             */
            showPresets: {
                type: Boolean,
                default: true,
            },
            placeholder: {
                type: String,
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
                return getCalendarPresetPeriods(this.timezone);
            },
            calendarPresetsPeriodsList() {
                return Object.entries(this.calendarPresetsPeriods);
            },
            isValidDatesPeriod() {
                return this.value && (this.validateDatesPeriod(this.value)
                    || (this.validateDatesPeriod(this.value.start) && this.validateDatesPeriod(this.value.end)));
            },
            isRelative() {
                // the props value period is relative period but could be custom period
                // so it could be something like '5 years ago..now'
                return (this.value && this.value.isRelative) || !this.isValidDatesPeriod;
            },
            selectedRelativeParams() {
                // returns {start, end, presetName: (optional), presetLabel: (optional)}
                // if the period props value is relative date then that method should return start and end values
                // also if the period is one of default presets method will return default preset name and label
                if (!this.isRelative) {
                    return null;
                }
                const preset = this.value && this.calendarPresetsPeriodsList
                    .find(([, {relativeFilterValue}]) => relativeFilterValue === this.value.relativeFilterValue);
                if (preset) {
                    // the period value is one of default relative presets
                    const [presetName, presetParams] = preset;
                    return {
                        presetName,
                        presetLabel: calendarPresetsLabels[presetName],
                        ...presetParams,
                    };
                }

                return this.parsePeriod(this.value);
            },
            isRelativePreset() {
                // returns true if the props period is relative date and one of default presets
                return this.selectedRelativeParams && !!this.selectedRelativeParams.presetName;
            },
            selectedPeriod() {
                if (!this.value) {
                    return null;
                }
                if (this.isRelative && this.isRelativePreset) {
                    const relative = this.selectedRelativeParams;
                    return {
                        ...relative,
                        start: relative.start,
                        end: relative.end,
                    };
                }
                const {start, end} = this.parsePeriod(this.value);
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
            selectedDateLabel() {
                // that means profile timezone !== browser timezone
                // so we could have some problems with time understanding
                const selected = this.selectedPeriod;

                if (!selected) {
                    return null;
                }

                console.log(this.timePicker, this.is24hr);
                const format = this.timePicker
                    ? (this.is24hr ? DateTimeFormats.shortDate24HrTime : DateTimeFormats.shortDateTime)
                    : DateTimeFormats.shortDate;
                console.log(format);
                if (!this.isMobile) {
                    if (this.isRelative && this.isRelativePreset) {
                        // props period is relative and one of default preset
                        if (oneValuePresetsList.includes(selected.presetName)) {
                            // props period is relative and one-day values like today/yesterday
                            // returns "Today / Date"
                            return [
                                selected.presetLabel,
                                _.formatDate(selected.start, DateTimeFormats.orderDate, this.timezone),
                            ].join(' / ');
                        }

                        // returns "Today / yy-mm-dd - yy-mm-dd"
                        return `${selected.presetLabel} / ${[
                            _.formatDate(selected.start, format, this.timezone),
                            _.formatDate(selected.end, format, this.timezone),
                        ].join(' - ')}`;
                    }

                    if (this.isRelative) {
                        return `${[
                            _.formatDate(selected.start, format, this.timezone),
                            _.formatDate(selected.end, format, this.timezone),
                        ].join(' - ')}`;
                    }
                }
                // returns real dates in DateTimeFormats.shortDate string format
                return [
                    _.formatDate(selected.start, format, this.timezone),
                    _.formatDate(selected.end, format, this.timezone),
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
                    return _.formatDate(period.start, DateTimeFormats.orderDate, this.timezone);
                }
                const formatter = value => _.formatDate(value, DateTimeFormats.shortDate, this.timezone);
                return `${formatter(period.start)} — ${formatter(period.end)}`;
            },
            validateDatesPeriod(period) {
                const date = _.formatDate(period, DateTimeFormats.datePickerDate, this.timezone);
                return date && /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date); // has year value
            },
            toggle(name) {
                if (this.$refs[name] && this.$refs[name].popper) {
                    this.$refs[name].popper.toggle();
                }
            },
            parsePeriod(period) {
                if (!period) {
                    return null;
                }
                if (typeof period === 'string') {
                    const relative = Object.values(this.calendarPresetsPeriods)
                        .find(per => per.relativeFilterValue === period);
                    if (relative) {
                        return relative;
                    }
                    const [start, end] = period.split('..');
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
                    this.toggle('presets');
                });
            },
        },
    };
</script>

<style lang="scss">
@import 'r-date-range-button-group';
</style>
