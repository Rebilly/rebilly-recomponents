<template>
    <div class="r-month-picker-container">
        <div class="r-month-picker-year">
            <r-icon-button @click="changeYear(-1)"
                           type="default"
                           size="small">
                <r-icon icon="caret-left"/>
            </r-icon-button>
            <div>{{ selectedDate.year }}</div>
            <r-icon-button @click="changeYear(+1)"
                           type="default"
                           size="small">
                <r-icon icon="caret-right"/>
            </r-icon-button>
        </div>
        <div class="r-month-picker">
            <div v-for="(month, i) in months"
                 :key="month"
                 :class="{'r-month-picker-month-selected': selectedDate.monthIndex === i}"
                 class="r-month-picker-month"
                 @click="selectMonth(i, true)">
                {{ month }}
            </div>
        </div>
    </div>
</template>

<script>
    import MonthPickerMixin from './month-picker-mixin';
    import RIconButton from '../r-icon-button/r-icon-button.vue';
    import RIcon from '../r-icon/r-icon.vue';

    export default {
        name: 'r-month-picker',
        components: {RIconButton, RIcon},
        mixins: [MonthPickerMixin],
        methods: {
            onChange() {
                /**
                 * The month/year were changed
                 * @type {Event}
                 */
                this.$emit('change', this.selectedDate);
            },
            selectMonth(index, input = false) {
                const isAlreadySelected = this.value.monthIndex === index;

                if (this.clearable && isAlreadySelected) {
                    this.selectedDate.monthIndex = null;
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

                this.selectedDate.monthIndex = index;
                this.onChange();

                if (input) {
                    /**
                     * The month selected
                     * @type {Event}
                     */
                    this.$emit('input', this.selectedDate);
                }
            },
            changeYear(value) {
                this.selectedDate.year += value;
                this.onChange();
            },
        },
    };

</script>
<style lang="scss">
    @import "./r-month-picker.scss";
</style>
