export default {
    data() {
        return {
            pointer: 0,
            pointerDirty: false,
        };
    },
    props: {
        optionHeight: {
            type: Number,
            default: 40,
        },
        /**
         * Enable/disable highlighting of the pointed value.
         * @type {Boolean}
         * @default true
         */
        showPointer: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        pointerPosition() {
            return this.pointer * this.optionHeight;
        },
        visibleElements() {
            return this.optimizedHeight / this.optionHeight;
        },
    },
    watch: {
        filteredOptions() {
            this.pointerAdjust();
        },
        isOpen() {
            this.pointerDirty = false;
        },
        pointer() {
            this.$refs.search.setAttribute('aria-activedescendant', this.id + '-' + this.pointer.toString());
        },
    },
    methods: {
        addPointerElement({key} = 'Enter') {
            if (this.filteredOptions.length > 0) {
                this.select(this.filteredOptions[this.pointer], key);
            }
            this.pointerReset();
        },
        optionHighlight(index, option) {
            return {
                'r-select__option--highlight': index === this.pointer && this.showPointer,
                'r-select__option--selected': this.isSelected(option),
            };
        },
        pointerAdjust() {
            if (this.pointer >= this.filteredOptions.length - 1) {
                this.pointer = this.filteredOptions.length
                    ? this.filteredOptions.length - 1
                    : 0;
            }
        },
        pointerBackward() {
            if (this.pointer > 0) {
                this.pointer--;
                if (this.$refs.list.scrollTop >= this.pointerPosition) {
                    this.$refs.list.scrollTop = this.pointerPosition;
                }
            }
            this.pointerDirty = true;
        },
        pointerForward() {
            if (this.pointer < this.filteredOptions.length - 1) {
                this.pointer++;
                if (this.$refs.list.scrollTop <= this.pointerPosition - (this.visibleElements - 1) * this.optionHeight) {
                    this.$refs.list.scrollTop = this.pointerPosition - (this.visibleElements - 1) * this.optionHeight;
                }
            }
            this.pointerDirty = true;
        },
        pointerReset() {
            if (!this.closeOnSelect) {
                return;
            }
            this.pointer = 0;
            if (this.$refs.list) {
                this.$refs.list.scrollTop = 0;
            }
        },
        pointerSet(index) {
            this.pointer = index;
            this.pointerDirty = true;
        },
    },
};