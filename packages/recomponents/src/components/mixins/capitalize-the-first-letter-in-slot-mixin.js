export default {
    methods: {
        capitalizeTheFirstLetterInSlot() {
            if (this.$slots.default) {
                let {text} = this.$slots.default[0];
                if (text) {
                    text = text.trim();
                    text = text.charAt(0).toUpperCase() + text.slice(1);
                    this.$slots.default[0].text = text;
                }
            }
        },
    },
    beforeUpdate() {
        this.capitalizeTheFirstLetterInSlot();
    },
    created() {
        this.capitalizeTheFirstLetterInSlot();
    },
};
