import languages from './languages';

export default {
    props: {
        /**
         * Language
         */
        lang: {
            type: String,
            default: 'en',
            validator: function (value) {
                return Object.keys(languages).some(l => Object.is(l, value));
            },
            required: false,
        },
        /**
         * List of months
         */
        months: {
            type: Array,
            default: null,
            validator: function (value) {
                return value.length === 12;
            },
            required: false,
        },
        /**
         * Preselected month and year
         */
        defaultValue: {
            type: Object,
            default: () => ({
                month: new Date().getMonth(),
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
    computed: {
        monthsByLang: function () {
            if (this.months !== null &&
                this.months.length === 12) {
                return this.months;
            }
            return languages[this.lang];
        },
    },
};