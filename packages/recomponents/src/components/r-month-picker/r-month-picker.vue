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
            <div v-for="(month, i) in monthsByLang"
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

    export default {
        name: 'r-month-picker',
        mixins: [MonthPickerMixin],
        data() {
            return {
                currentMonthIndex: null,
                year: new Date().getFullYear(),
            };
        },
        computed: {
            currentMonth() {
                if (this.currentMonthIndex !== null) {
                    return this.monthsByLang[this.currentMonthIndex];
                }
            },
            date() {
                const month = this.monthsByLang.indexOf(this.currentMonth) + 1;
                const date = new Date(`${this.year}/${month}/01`);
                const year = date.getFullYear();
                return {
                    from: date,
                    to: new Date(year, month, 1),
                    month: this.monthsByLang[month - 1],
                    monthIndex: month,
                    year: year,
                };
            },
        },
        watch: {
            defaultValue(newVal) {
                if (newVal.month) {
                    this.currentMonthIndex = newVal.month;
                }
                if (newVal.year) {
                    this.year = newVal.year;
                }
            },
        },
        mounted() {
            if (this.defaultValue && this.defaultValue.year) {
                this.year = this.defaultValue.year;
            }

            this.selectMonth(this.defaultValue && this.defaultValue.month ? this.defaultValue.month - 1 : 0);
        },
        methods: {
            onChange() {
                if (!Number.parseInt(this.year)) {
                    this.year = this.defaultValue && this.defaultValue.year || new Date().getFullYear();
                }

                this.$emit('change', this.date);
            },
            selectMonth(index, input = false) {
                const isAlreadySelected = this.currentMonthIndex === index;

                if (this.clearable && isAlreadySelected) {
                    this.currentMonthIndex = null;
                    this.$emit('clear');
                    return;
                }

                if (isAlreadySelected) {
                    return;
                }

                this.currentMonthIndex = index;
                this.onChange();

                if (input) {
                    this.$emit('input', this.date);
                }
            },
            changeYear(value) {
                this.year += value;
                this.onChange();
                this.$emit('change-year', this.year);
            },
        },
    };

</script>
<style lang="scss">
    @import "./r-month-picker.scss";
</style>