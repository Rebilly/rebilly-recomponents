import months from './months';

export default {
    props: {
        /**
         * Preselected month and year
         */
        defaultValue: {
            type: Object,
            default: () => ({
                monthIndex: new Date().getMonth(),
                year: new Date().getFullYear(),
            }),
            required: false,
        },
        /**
         * Default year
         */
        defaultYear: {
            type: Number,
            default: null,
            required: false,
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
            currentMonthIndex: null,
            year: new Date().getFullYear(),
            months,
        };
    },
    mounted() {
        if (this.defaultValue) {
            this.setDefaults(this.defaultValue);
        }
    },
    methods: {
        setDefaults(value) {
            if (value.monthIndex) {
                this.currentMonthIndex = value.monthIndex;
            }
            if (value.month) {
                this.currentMonthIndex = this.months.indexOf(value.month);
            }
            if (value.year) {
                this.year = value.year;
            }
        },
    },
    watch: {
        defaultValue(newVal) {
            this.setDefaults(newVal);
        },
    },
};