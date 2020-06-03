<template>
    <r-popper position="bottomEnd" ref="monthPicker">
        <template #trigger="monthPicker">
            <r-icon-button class="r-month-picker-input"
                           @click="$refs['monthPicker'].popper.toggle()">
                {{ selectedDate }}
                <r-icon class="r-date-range-calendar-icon" slot="left-icon" icon="calendar"/>
            </r-icon-button>
        </template>
        <template #content="monthPicker">
            <div class="r-popover r-month-picker-input-container">
                <div class="r-popover-control">
                    <div class="r-popover-content r-popover-menu" width="300px">
                        <r-month-picker
                                @change="populateInput"
                                :lang="lang"
                                :default-value="defaultValue"
                                :months="months"
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

    export default {
        name: 'r-month-picker-input',
        mixins: [MonthPickerMixin],
        data() {
            return {
                monthPickerVisible: false,
                selectedDate: null,
            };
        },
        mounted() {
            if (this.defaultValue) {
                const month = this.defaultValue.month ? this.defaultValue.month - 1 : 0;
                const year = this.defaultValue.year ? this.defaultValue.year : new Date().getFullYear();
                this.populateInput({month: this.monthsByLang[month], year});
            }
        },
        methods: {
            populateInput(date) {
                this.selectedDate = `${date.month}, ${date.year}`;
                this.monthPickerVisible = false;
                this.$emit('input', date);
            },
        },
    };
</script>

<style lang="scss">
    @import "./r-month-picker.scss";
</style>
