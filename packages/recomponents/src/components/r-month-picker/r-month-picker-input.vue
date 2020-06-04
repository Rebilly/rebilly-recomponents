<template>
    <r-popper position="bottomEnd" ref="monthPicker">
        <template #trigger="monthPicker">
            <r-icon-button class="r-month-picker-input"
                           @click="$refs['monthPicker'].popper.toggle()">
                <span v-if="selectedDate">{{ selectedDate }}</span>
                <span v-else class="r-text-muted">{{ placeholder }}</span>
                <r-icon class="r-date-range-calendar-icon" slot="left-icon" icon="calendar"/>
            </r-icon-button>
        </template>
        <template #content="monthPicker">
            <div class="r-popover r-month-picker-input-container">
                <div class="r-popover-control">
                    <div class="r-popover-content r-popover-menu" width="300px">
                        <r-month-picker
                                @input="$refs['monthPicker'].popper.close()"
                                @change="populateInput"
                                @clear="onClear"
                                :default-value="date || defaultValue"
                                :clearable="clearable">
                        </r-month-picker>
                    </div>
                </div>
            </div>
        </template>
    </r-popper>
</template>

<script>
    import MonthPickerMixin from './month-picker-mixin';
    import RIconButton from '../r-icon-button/r-icon-button';
    import RIcon from '../r-icon/r-icon';
    import RPopper from '../r-popper/r-popper';
    import RMonthPicker from './r-month-picker';

    export default {
        name: 'r-month-picker-input',
        mixins: [MonthPickerMixin],
        components: {RIcon, RIconButton, RPopper, RMonthPicker},
        data() {
            return {
                selectedDate: null,
                date: null,
            };
        },
        props: {
            /**
             * Placeholder of the input if no month is selected
             */
            placeholder: {
                type: String,
                default: 'Select month',
            },
        },
        methods: {
            populateInput(date) {
                this.selectedDate = `${date.month}, ${date.year}`;
                this.date = date;
                /**
                 * The month selected
                 * @type {Event}
                 */
                this.$emit('input', date);
            },
            onClear() {
                this.selectedDate = null;
                this.date = null;
                /**
                 * The month picker is clear
                 * @type {Event}
                 */
                this.$emit('clear');
            },
        },
        watch: {
            currentMonthIndex() {
                this.populateInput({month: this.months[this.currentMonthIndex], year: this.year});
            },
        },
    };
</script>

<style lang="scss">
    @import "./r-month-picker.scss";
</style>
