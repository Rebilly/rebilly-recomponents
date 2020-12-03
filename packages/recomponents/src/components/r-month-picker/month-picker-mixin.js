import months from './months';

const defaultValue = {
    monthIndex: new Date().getMonth(),
    year: new Date().getFullYear(),
};

export default {
    props: {
        /**
         * Selected month and year
         */
        value: {
            defaultValue: () => defaultValue,
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
    data() {
        return {
            months,
            selectedDate: null,
        };
    },
    computed: {
        selectedDateLabel() {
            return `${months[this.selectedDate.monthIndex]}, ${this.selectedDate.year}`;
        },
    },
};
