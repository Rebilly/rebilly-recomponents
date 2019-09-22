import shortid from 'shortid';

function isEmpty(opt) {
    if (opt === 0) {
        return false;
    }
    if (Array.isArray(opt) && opt.length === 0) {
        return true;
    }
    return !opt;
}

function not(fun) {
    return (...params) => !fun(...params);
}

function includes(str, query) {
    if (str === undefined) {
        str = 'undefined';
    }
    if (str === null) {
        str = 'null';
    }
    if (str === false) {
        str = 'false';
    }
    const text = str.toString().toLowerCase();
    return text.indexOf(query.trim()) !== -1;
}

function filterOptions(options, search, label, customLabel) {
    return options.filter(option => includes(customLabel(option, label), search));
}

function stripGroups(options) {
    return options.filter(option => !option.$isLabel);
}

function flattenOptions(values, label) {
    return (options) =>
        options.reduce((prev, curr) => {
            if (curr[values] && curr[values].length) {
                prev.push({
                    $groupLabel: curr[label],
                    $isLabel: true,
                });
                return prev.concat(curr[values]);
            }
            return prev;
        }, []);
}

function filterGroups(search, label, values, groupLabel, customLabel) {
    return (groups) =>
        groups.map(group => {
            if (!group[values]) {
                console.warn(`Options passed to vue-r-select do not contain groups, despite the config.`);
                return [];
            }
            const groupOptions = filterOptions(group[values], search, label, customLabel);

            return groupOptions.length
                ? {
                    [groupLabel]: group[groupLabel],
                    [values]: groupOptions,
                }
                : [];
        });
}

const flow = (...fns) => x => fns.reduce((v, f) => f(v), x);

export default {
    data() {
        return {
            search: '',
            isOpen: false,
            preferredOpenDirection: 'below',
            optimizedHeight: this.maxHeight,
        };
    },
    props: {
        internalSearch: {
            type: Boolean,
            default: true,
        },
        options: {
            type: Array,
            required: true,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        value: {
            type: null,
            default() {
                return [];
            },
        },
        trackBy: {
            type: String,
        },
        propLabel: {
            type: String,
        },
        searchable: {
            type: Boolean,
            default: true,
        },
        clearOnSelect: {
            type: Boolean,
            default: true,
        },
        hideSelected: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: 'Select option',
        },
        allowEmpty: {
            type: Boolean,
            default: true,
        },
        resetAfter: {
            type: Boolean,
            default: false,
        },
        closeOnSelect: {
            type: Boolean,
            default: true,
        },
        customLabel: {
            type: Function,
            default(option, label) {
                if (isEmpty(option)) {
                    return '';
                }
                return label ? option[label] : option;
            },
        },
        taggable: {
            type: Boolean,
            default: false,
        },
        tagPlaceholder: {
            type: String,
            default: 'Press enter to create a tag',
        },
        tagPosition: {
            type: String,
            default: 'top',
        },
        max: {
            type: [Number, Boolean],
            default: false,
        },
        id: {
            type: String,
            default: () => shortid.generate(),
        },
        optionsLimit: {
            type: Number,
            default: 1000,
        },
        groupValues: {
            type: String,
        },
        groupLabel: {
            type: String,
        },
        groupSelect: {
            type: Boolean,
            default: false,
        },
        blockKeys: {
            type: Array,
            default() {
                return [];
            },
        },
        preserveSearch: {
            type: Boolean,
            default: false,
        },
        preselectFirst: {
            type: Boolean,
            default: false,
        },
    },
    mounted() {
        if (!this.multiple && this.max) {
            console.warn('[Recomponents warn]: Max prop should not be used when prop Multiple equals false.');
        }
        if (
            this.preselectFirst &&
            !this.internalValue.length &&
            this.options.length
        ) {
            this.select(this.filteredOptions[0]);
        }
    },
    computed: {
        internalValue() {
            return this.value || this.value === 0
                ? Array.isArray(this.value) ? this.value : [this.value]
                : [];
        },
        filteredOptions() {
            const search = this.search || '';
            const normalizedSearch = search.toLowerCase().trim();

            let options = this.options.concat();

            if (this.internalSearch) {
                options = this.groupValues
                    ? this.filterAndFlat(options, normalizedSearch, this.label)
                    : filterOptions(options, normalizedSearch, this.label, this.customLabel);
            } else {
                options = this.groupValues ? flattenOptions(this.groupValues, this.groupLabel)(options) : options;
            }

            options = this.hideSelected
                ? options.filter(not(this.isSelected))
                : options;

            if (this.taggable && normalizedSearch.length && !this.isExistingOption(normalizedSearch)) {
                if (this.tagPosition === 'bottom') {
                    options.push({isTag: true, label: search});
                } else {
                    options.unshift({isTag: true, label: search});
                }
            }

            return options.slice(0, this.optionsLimit);
        },
        valueKeys() {
            if (this.trackBy) {
                return this.internalValue.map(element => element[this.trackBy]);
            } else {
                return this.internalValue;
            }
        },
        optionKeys() {
            const options = this.groupValues ? this.flatAndStrip(this.options) : this.options;
            return options.map(element => this.customLabel(element, this.label).toString().toLowerCase());
        },
        currentOptionLabel() {
            return this.multiple
                ? this.searchable ? '' : this.placeholder
                : this.internalValue.length
                    ? this.getOptionLabel(this.internalValue[0])
                    : this.searchable ? '' : this.placeholder;
        },
    },
    watch: {
        internalValue() {
            if (this.resetAfter && this.internalValue.length) {
                this.search = '';
                this.$emit('input', this.multiple ? [] : null);
            }
        },
        search() {
            this.$emit('search-change', this.search, this.id);
        },
    },
    methods: {
        /**
         * Returns the internalValue in a way it can be emited to the parent
         * @returns {Object||Array||String||Integer}
         */
        getValue() {
            return this.multiple
                ? this.internalValue
                : this.internalValue.length === 0
                    ? null
                    : this.internalValue[0];
        },
        /**
         * Filters and then flattens the options list
         * @param  {Array}
         * @returns {Array} returns a filtered and flat options list
         */
        filterAndFlat(options, search, label) {
            return flow(
                filterGroups(search, label, this.groupValues, this.groupLabel, this.customLabel),
                flattenOptions(this.groupValues, this.groupLabel),
            )(options);
        },
        /**
         * Flattens and then strips the group labels from the options list
         * @param  {Array}
         * @returns {Array} returns a flat options list without group labels
         */
        flatAndStrip(options) {
            return flow(
                flattenOptions(this.groupValues, this.groupLabel),
                stripGroups,
            )(options);
        },
        /**
         * Updates the search value
         * @param  {String}
         */
        updateSearch(query) {
            this.search = query;
        },
        /**
         * Finds out if the given query is already present
         * in the available options
         * @param  {String}
         * @returns {Boolean} returns true if element is available
         */
        isExistingOption(query) {
            return !this.options
                ? false
                : this.optionKeys.indexOf(query) > -1;
        },
        /**
         * Finds out if the given element is already present
         * in the result value
         * @param  {Object||String||Integer} option passed element to check
         * @returns {Boolean} returns true if element is selected
         */
        isSelected(option) {
            const opt = this.trackBy
                ? option[this.trackBy]
                : option;
            return this.valueKeys.indexOf(opt) > -1;
        },
        /**
         * Finds out if the given option is disabled
         * @param  {Object||String||Integer} option passed element to check
         * @returns {Boolean} returns true if element is disabled
         */
        isOptionDisabled(option) {
            return !!option.$isDisabled;
        },
        /**
         * Returns empty string when options is null/undefined
         * Returns tag query if option is tag.
         * Returns the customLabel() results and casts it to string.
         *
         * @param  {Object||String||Integer} Passed option
         * @returns {Object||String}
         */
        getOptionLabel(option) {
            if (isEmpty(option)) {
                return '';
            }
            if (option.isTag) {
                return option.label;
            }
            if (option.$isLabel) {
                return option.$groupLabel;
            }

            let label = this.customLabel(option, this.propLabel);

            if (isEmpty(label)) {
                return '';
            }
            return label;
        },
        /**
         * Add the given option to the list of selected options
         * or sets the option as the selected option.
         * If option is already selected -> remove it from the results.
         *
         * @param  {Object||String||Integer} option to select/deselect
         * @param  {Boolean} block removing
         */
        select(option, key) {
            console.log(option);
            if (option.$isLabel && this.groupSelect) {
                this.selectGroup(option);
                return;
            }
            if (this.blockKeys.indexOf(key) !== -1 ||
                this.disabled ||
                option.$isDisabled ||
                option.$isLabel
            ) {
                return;
            }
            if (this.max && this.multiple && this.internalValue.length === this.max) {
                return;
            }
            if (key === 'Tab' && !this.pointerDirty) {
                return;
            }
            if (option.isTag) {
                this.$emit('tag', option.label, this.id);
                this.search = '';
                if (this.closeOnSelect && !this.multiple) {
                    this.deactivate();
                }
            } else {
                const isSelected = this.isSelected(option);

                if (isSelected) {
                    if (key !== 'Tab') {
                        this.removeElement(option);
                    }
                    return;
                }

                this.$emit('select', option, this.id);

                if (this.multiple) {
                    this.$emit('input', this.internalValue.concat([option]), this.id);
                } else {
                    this.$emit('input', option, this.id);
                }

                if (this.clearOnSelect) {
                    this.search = '';
                }
            }
            if (this.closeOnSelect) {
                this.deactivate();
            }
        },
        /**
         * Add the given group options to the list of selected options
         * If all group optiona are already selected -> remove it from the results.
         *
         * @param  {Object||String||Integer} group to select/deselect
         */
        selectGroup(selectedGroup) {
            const group = this.options.find(option => {
                return option[this.groupLabel] === selectedGroup.$groupLabel;
            });

            if (!group) {
                return;
            }

            if (this.wholeGroupSelected(group)) {
                this.$emit('remove', group[this.groupValues], this.id);

                const newValue = this.internalValue.filter(
                    option => group[this.groupValues].indexOf(option) === -1,
                );

                this.$emit('input', newValue, this.id);
            } else {
                const optionsToAdd = group[this.groupValues].filter(
                    option => !(this.isOptionDisabled(option) || this.isSelected(option)),
                );

                this.$emit('select', optionsToAdd, this.id);
                this.$emit(
                    'input',
                    this.internalValue.concat(optionsToAdd),
                    this.id,
                );
            }
        },
        /**
         * Helper to identify if all values in a group are selected
         *
         * @param {Object} group to validated selected values against
         */
        wholeGroupSelected(group) {
            return group[this.groupValues].every(option => this.isSelected(option) || this.isOptionDisabled(option),
            );
        },
        /**
         * Helper to identify if all values in a group are disabled
         *
         * @param {Object} group to check for disabled values
         */
        wholeGroupDisabled(group) {
            return group[this.groupValues].every(this.isOptionDisabled);
        },
        /**
         * Removes the given option from the selected options.
         * Additionally checks this.allowEmpty prop if option can be removed when
         * it is the last selected option.
         *
         * @param  {type} option description
         * @returns {type}        description
         */
        removeElement(option, shouldClose = true) {
            if (this.disabled) {
                return;
            }
            if (option.$isDisabled) {
                return;
            }
            if (!this.allowEmpty && this.internalValue.length <= 1) {
                this.deactivate();
                return;
            }

            const index = typeof option === 'object'
                ? this.valueKeys.indexOf(option[this.trackBy])
                : this.valueKeys.indexOf(option);

            this.$emit('remove', option, this.id);
            if (this.multiple) {
                const newValue = this.internalValue.slice(0, index).concat(this.internalValue.slice(index + 1));
                this.$emit('input', newValue, this.id);
            } else {
                this.$emit('input', null, this.id);
            }

            if (this.closeOnSelect && shouldClose) {
                this.deactivate();
            }
        },
        /**
         * Calls this.removeElement() with the last element
         * from this.internalValue (selected element Array)
         *
         * @fires this#removeElement
         */
        removeLastElement() {
            if (this.blockKeys.indexOf('Delete') !== -1) {
                return;
            }
            if (this.search.length === 0 && Array.isArray(this.internalValue) && this.internalValue.length) {
                this.removeElement(this.internalValue[this.internalValue.length - 1], false);
            }
        },
        /**
         * Opens the r-select’s dropdown.
         * Sets this.isOpen to TRUE
         */
        activate() {
            if (this.isOpen || this.disabled) {
                return;
            }

            this.adjustPosition();
            if (this.groupValues && this.pointer === 0 && this.filteredOptions.length) {
                this.pointer = 1;
            }

            this.isOpen = true;
            if (this.searchable) {
                if (!this.preserveSearch) {
                    this.search = '';
                }
                this.$nextTick(() => this.$refs.search && this.$refs.search.focus());
            } else {
                this.$el.focus();
            }
            this.$emit('open', this.id);
        },
        /**
         * Closes the r-select’s dropdown.
         * Sets this.isOpen to FALSE
         */
        deactivate() {
            if (!this.isOpen) {
                return;
            }

            this.isOpen = false;
            if (this.searchable) {
                this.$refs.search && this.$refs.search.blur();
            } else {
                this.$el.blur();
            }
            if (!this.preserveSearch) {
                this.search = '';
            }
            this.$emit('close', this.getValue(), this.id);
        },
        /**
         * Call this.activate() or this.deactivate()
         * depending on this.isOpen value.
         *
         * @fires this#activate || this#deactivate
         * @property {Boolean} isOpen indicates if dropdown is open
         */
        toggle() {
            this.isOpen
                ? this.deactivate()
                : this.activate();
        },
        /**
         * Updates the hasEnoughSpace variable used for
         * detecting where to expand the dropdown
         */
        adjustPosition() {
            if (typeof window === 'undefined') {
                return;
            }

            const spaceAbove = this.$el.getBoundingClientRect().top;
            const spaceBelow = window.innerHeight - this.$el.getBoundingClientRect().bottom;
            const hasEnoughSpaceBelow = spaceBelow > this.maxHeight;

            if (hasEnoughSpaceBelow || spaceBelow > spaceAbove || this.openDirection === 'below' || this.openDirection === 'bottom') {
                this.preferredOpenDirection = 'below';
                this.optimizedHeight = Math.min(spaceBelow - 40, this.maxHeight);
            } else {
                this.preferredOpenDirection = 'above';
                this.optimizedHeight = Math.min(spaceAbove - 40, this.maxHeight);
            }
        },
    },
};