import months from './months';

export default {
    props: {
        /**
         * Selected month and year
         */
        value: {
            default: () => ({
                monthIndex: new Date().getMonth(),
                year: new Date().getFullYear(),
            }),
            required: true,
        },
        /**
         * Defines if month picker is clearable
         */
        clearable: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    computed: {
        selectedDateLabel() {
            return `${months[this.value.monthIndex]}, ${this.value.year}`;
        },
    },
    data() {
        return {
            months,
            selectedDate: {},
        };
    },
};
