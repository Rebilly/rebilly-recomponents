<template>
    <r-popper :position="position" ref="monthPicker">
        <template #trigger="monthPicker">
            <r-icon-button class="r-month-picker-input"
                           @click="$refs['monthPicker'].popper.toggle()">
                <span v-if="selectedDate">{{ selectedDateLabel }}</span>
                <span v-else class="r-text-muted">{{ placeholder }}</span>
                <r-icon class="r-date-range-calendar-icon" slot="left-icon" icon="calendar"/>
            </r-icon-button>
        </template>
        <template #content="monthPicker">
            <div class="r-popover r-month-picker-input-container">
                <div class="r-popover-control">
                    <div class="r-popover-content r-popover-menu" width="300px">
                        <r-month-picker
                                @input="populateInput"
                                @month-change="$refs['monthPicker'].popper.close()"
                                @clear="onClear"
                                v-model="selectedDate"
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
    import RIconButton from '../r-icon-button/r-icon-button.vue';
    import RIcon from '../r-icon/r-icon.vue';
    import RPopper from '../r-popper/r-popper.vue';
    import RMonthPicker from './r-month-picker.vue';

    export default {
        name: 'r-month-picker-input',
        mixins: [MonthPickerMixin],
        components: {
            RIcon, RIconButton, RPopper, RMonthPicker,
        },
        mounted() {
            this.selectedDate = this.value;
            if (!this.selectedDate.year || !Number.parseInt(this.selectedDate.year, 10)) {
                this.selectedDate.year = new Date().getFullYear();
            }
        },
        props: {
            /**
             * Placeholder of the input if no month is selected
             */
            placeholder: {
                type: String,
                default: 'Select month',
            },
            /**
             * Position of popover control
             */
            position: {
                type: String,
                default: 'bottomEnd',
                validator: position => ['bottomStart', 'bottomEnd', 'topStart', 'topEnd'].includes(position),
            },
        },
        methods: {
            populateInput(date) {
                this.selectedDate = date;
                /**
                 * The month selected
                 * @type {Event}
                 */
                this.$emit('input', this.selectedDate);
            },
            onClear() {
                this.selectedDate = null;
                this.$emit('input', this.selectedDate);

                /**
                 * The month picker is clear
                 * @type {Event}
                 */
                this.$emit('clear');
            },
        },
    };
</script>

<style lang="scss">
    @import "./r-month-picker.scss";
</style>
