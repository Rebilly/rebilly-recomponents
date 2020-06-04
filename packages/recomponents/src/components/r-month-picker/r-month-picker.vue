<template>
    <div class="r-month-picker-container">
        <div class="r-month-picker-year">
            <r-icon-button @click="changeYear(-1)"
                           type="default"
                           size="small">
                <r-icon icon="caret-left"/>
            </r-icon-button>
            <div>{{ year }}</div>
            <r-icon-button @click="changeYear(+1)"
                           type="default"
                           size="small">
                <r-icon icon="caret-right"/>
            </r-icon-button>
        </div>
        <div class="r-month-picker">
            <div v-for="(month, i) in months"
                 :key="month"
                 :class="{'r-month-picker-month-selected': currentMonth === month}"
                 class="r-month-picker-month"
                 @click="selectMonth(i, true)">
                {{ month }}
            </div>
        </div>
    </div>
</template>

<script>
    import MonthPickerMixin from './month-picker-mixin';
    import RIconButton from '../r-icon-button/r-icon-button';
    import RIcon from '../r-icon/r-icon';

    export default {
        name: 'r-month-picker',
        components: {RIconButton, RIcon},
        mixins: [MonthPickerMixin],
        computed: {
            currentMonth() {
                if (this.currentMonthIndex !== null) {
                    return this.months[this.currentMonthIndex];
                }
            },
            date() {
                const monthIndex = this.months.indexOf(this.currentMonth);
                const date = new Date(`${this.year}/${monthIndex + 1}/01`);
                const year = date.getFullYear();
                return {
                    from: date,
                    to: new Date(year, monthIndex + 1, 1),
                    month: this.months[monthIndex],
                    monthIndex,
                    year,
                };
            },
        },
        methods: {
            onChange() {
                if (!Number.parseInt(this.year)) {
                    this.year = this.defaultValue && this.defaultValue.year || new Date().getFullYear();
                }

                /**
                 * The month/year were changed
                 * @type {Event}
                 */
                this.$emit('change', this.date);
            },
            selectMonth(index, input = false) {
                const isAlreadySelected = this.currentMonthIndex === index;

                if (this.clearable && isAlreadySelected) {
                    this.currentMonthIndex = null;
                    /**
                     * Already selected month was clicked when the month picker is clearable
                     * @type {Event}
                     */
                    this.$emit('clear');
                    return;
                }

                if (isAlreadySelected) {
                    return;
                }

                this.currentMonthIndex = index;
                this.onChange();

                if (input) {
                    /**
                     * The month selected
                     * @type {Event}
                     */
                    this.$emit('input', this.date);
                }
            },
            changeYear(value) {
                this.year += value;
                this.onChange();
                /**
                 * The year changed
                 * @type {Event}
                 */
                this.$emit('change-year', this.year);
            },
        },
    };

</script>
<style lang="scss">
    @import "./r-month-picker.scss";
</style>