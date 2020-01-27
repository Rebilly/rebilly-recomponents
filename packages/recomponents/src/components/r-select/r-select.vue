<template>
    <div :class="classes" v-fs-block>
        <label v-if="hasLabel"
               @click="activate"
               class="r-field-label">{{label}}
        </label>
        <div :tabindex="searchable ? -1 : tabindex"
             :class="{ 'r-select-is-active': isOpen,
                       'r-select-is-disabled': disabled,
                       'r-select-is-above': isAbove,
                       'r-select-is-allow-empty': allowEmpty}"
             @focus="activate()"
             @blur="searchable ? false : deactivate()"
             @keydown.self.down.prevent="pointerForward()"
             @keydown.self.up.prevent="pointerBackward()"
             @keypress.enter.tab.stop.self="addPointerElement($event)"
             @keyup.esc="deactivate()"
             class="r-select r-field"
             role="combobox"
             :aria-owns="'listbox-'+id">
            <!-- @slot Override default caret component -->
            <slot name="caret" :toggle="toggle">
                <r-icon icon="caret-down" class="r-select-caret" @mousedown.prevent.stop="toggle()"/>
            </slot>
            <!-- @slot Add an icon to clear the input -->
            <slot name="clear" :search="search"></slot>
            <div ref="tags" class="r-select-tags">
                <!-- @slot Override default selection component -->
                <slot name="selection"
                      v-if="!loading"
                      :search="search"
                      :remove="removeElement"
                      :values="computedValue"
                      :is-open="isOpen">
                    <div class="r-select-tags-wrap"
                         v-show="visibleValues.length > 0"
                         @mousedown.prevent>
                        <template v-for="(option, index) of computedValue"
                                  @mousedown.prevent>
                            <!-- @slot Override default tag component -->
                            <slot name="tag"
                                  :option="option"
                                  :search="search"
                                  :remove="removeElement">
                                <template>
                                    <r-badge class="r-select-tag"
                                             type="tag"
                                             :close="true"
                                             @close="removeElement(option)">
                                        <template>
                                            <span class="r-select-tag-text"
                                                  @mousedown.prevent="toggle()">
                                                {{ getOptionLabel(option) }}
                                            </span>
                                        </template>
                                    </r-badge>
                                </template>
                            </slot>
                        </template>
                    </div>
                    <template v-if="internalValue && internalValue.length > limit">
                        <!-- @slot Override default limit message component -->
                        <slot name="limit">
                            <strong class="r-select-limit"
                                    v-text="limitText(internalValue.length - limit)"/>
                        </slot>
                    </template>
                </slot>
                <transition name="r-select-loading">
                    <!-- @slot Override default loading spinner component -->
                    <slot name="loading">
                        <div v-show="loading" class="r-select-loading-spinner"/>
                    </slot>
                </transition>
                <input ref="search"
                       v-if="searchable"
                       :name="name"
                       :id="id"
                       type="text"
                       autocomplete="off"
                       spellcheck="false"
                       :placeholder="placeholder"
                       :style="inputStyle"
                       :value="search"
                       :disabled="disabled"
                       :tabindex="tabindex"
                       @input="updateSearch($event.target.value)"
                       @focus.prevent="activate()"
                       @blur.prevent="deactivate()"
                       @keyup.esc="deactivate()"
                       @keydown.down.prevent="pointerForward()"
                       @keydown.up.prevent="pointerBackward()"
                       @keypress.enter.prevent.stop.self="addPointerElement($event)"
                       @keydown.delete.stop="removeLastElement()"
                       class="r-select-input"
                       :aria-controls="'listbox-'+id"
                />
                <span v-if="isSingleLabelVisible && !loading"
                      class="r-select-single"
                      @mousedown.prevent="toggle">
                    <!-- @slot Override default single value component -->
                    <slot name="singleLabel" :option="singleValue">
                        <template>{{ currentOptionLabel }}</template>
                    </slot>
                </span>
                <span v-if="isPlaceholderVisible || loading"
                      class="r-select-placeholder"
                      @mousedown.prevent="toggle">
                    <!-- @slot Override default placeholder component -->
                    <slot name="placeholder">
                        {{ placeholder }}
                    </slot>
                </span>
            </div>
            <transition name="r-select">
                <div class="r-select-content-wrapper"
                     v-show="isOpen && hasContent"
                     @focus="activate"
                     tabindex="-1"
                     @mousedown.prevent
                     :style="{ maxHeight: optimizedHeight + 'px' }"
                     ref="list">
                    <ul class="r-select-content"
                        :style="contentStyle"
                        role="listbox"
                        :id="'listbox-'+id">
                        <!-- @slot Override default before list option component -->
                        <slot name="beforeList">
                            <template v-if="computedIsLoading">
                                <span class="r-select-content-element-option">
                                    {{ messages['loading'] }}
                                </span>
                            </template>
                            <template v-if="computedAsyncHasPrevOptions">
                                <li class="r-select-content-element-option r-align-center r-select-content-element-option-load r-select-content-element-option-load-prev">
                                    <r-icon-button
                                            type="default"
                                            size="small"
                                            @click="handleAsyncLoadPrev"
                                            :disabled="computedIsLoading"
                                            fluid>
                                        Get prev
                                        <r-icon icon="caret-up"/>
                                    </r-icon-button>
                                </li>
                            </template>
                        </slot>
                        <li v-if="multiple && max === internalValue.length">
                            <span class="r-select-content-element-option">
                                <!-- @slot Override default max elements message component -->
                                <slot name="maxElements">
                                    {{ messages.max(max) }}
                                </slot>
                            </span>
                        </li>
                        <li class="r-select-content-element"
                            v-for="(option, index) of filteredOptions"
                            :key="index"
                            v-bind:id="id + '-' + index"
                            v-bind:role="option">
                            <span :class="optionHighlight(index, option)"
                                  @click.stop="select(option)"
                                  @mouseenter.self="pointerSet(index)"
                                  class="r-select-content-element-option">
                                <!-- @slot Override default option component -->
                                <slot name="option"
                                      :option="option"
                                      :search="search">
                                    <span>{{ getOptionLabel(option) }}</span>
                                </slot>
                            </span>
                        </li>
                        <li class="r-select-content-element"
                            v-show="showNoResults && (filteredOptions.length === 0 && search && !loading)">
                            <span class="r-select-content-element-option">
                                <!-- @slot Override default no result component -->
                                <slot name="noResult"
                                      :search="search">{{messages['noResult']}}
                                </slot>
                            </span>
                        </li>
                        <li class="r-select-content-element"
                            v-show="showNoOptions && (computedOptions.length === 0 && !search && !loading)">
                            <span class="r-select-content-element-option">
                                <!-- @slot Override default no options component -->
                                <slot name="noOptions">{{messages['noOptions']}}</slot>
                            </span>
                        </li>
                        <!-- @slot Override default after list component -->
                        <slot name="afterList">
                            <template v-if="computedAsyncHasNextOptions">
                                <li class="r-select-content-element-option r-align-center r-select-content-element-option-load r-select-content-element-option-load-next">
                                    <r-icon-button
                                            type="default"
                                            size="small"
                                            @click="handleAsyncLoadNext"
                                            :disabled="computedIsLoading"
                                            fluid>
                                        Load more...
                                        <r-icon icon="caret-down"/>
                                    </r-icon-button>
                                </li>
                            </template>
                        </slot>
                    </ul>
                </div>
            </transition>
        </div>
        <span v-if="helpText" class="r-field-caption">{{helpText}}</span>
    </div>
</template>

<script>
    import shortid from 'shortid';
    import AsyncInputMixin from '../../mixins/async-input-mixin';
    import RIcon from '../r-icon/r-icon.vue';
    import RBadge from '../r-badge/r-badge.vue';
    import RIconButton from '../r-icon-button/r-icon-button.vue';
    import '../../directives/r-fs-block';

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

    const getAllCachedAsyncValues = asyncCacheItems => asyncCacheItems
        .reduce((memo, item) => ([...memo, ...item.options]), []);

    export default {
        name: 'r-select',
        data() {
            return {
                isOpen: false,
                optimizedHeight: this.maxHeight,
                pointer: 0,
                pointerDirty: false,
                preferredOpenDirection: 'below',
                search: '',
                messages: {
                    loading: 'Looking for matching results...',
                    more: count => `and ${count} more`,
                    max: max => `Maximum of ${max} options selected. First remove a selected option to select another.`,
                    noOptions: 'List is empty.',
                    noResult: 'No elements found. Consider changing the search query.',
                },
            };
        },
        mounted() {
            if (!this.multiple && this.max) {
                console.warn('[Recomponents warn]: Max prop should not be used when prop Multiple equals false.');
            }
            this.preselect();
        },
        mixins: [new AsyncInputMixin().getMixin()],
        components: {RIcon, RIconButton, RBadge},
        props: {
            /**
             * Specify if no option can be selected
             */
            allowEmpty: {
                type: Boolean,
                default: true,
            },
            /**
             * List of keys where default behaviou will be ignored
             */
            blockKeys: {
                type: Array,
                default() {
                    return [];
                },
            },
            /**
             * Specify if on select the search input should be cleaned up
             */
            clearOnSelect: {
                type: Boolean,
                default: true,
            },
            /**
             * Specify if the popper should be closed after selection
             */
            closeOnSelect: {
                type: Boolean,
                default: true,
            },
            /**
             * If the option is an object specify what property should be used as a label, by default 'label'
             */
            customLabel: {
                type: Function,
                default(option, label) {
                    if (isEmpty(option)) {
                        return '';
                    }

                    return (option && option[label]) || option;
                },
            },
            /**
             * Specify how to validate the select field
             */
            validate: {
                type: Object,
                default: null,
            },
            /**
             * Disable the select field
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Change the help text
             */
            helpText: {
                type: String,
            },
            /**
             * Specify if selected options should be hidden
             */
            hideSelected: {
                type: Boolean,
                default: false,
            },
            /**
             * ID of select field
             */
            id: {
                type: String,
                default: () => shortid.generate(),
            },
            /**
             * Specify is the internal search enabled
             */
            internalSearch: {
                type: Boolean,
                default: true,
            },
            /**
             * Change the label of the select field
             */
            label: {
                type: String,
            },
            /**
             * Specify the limit quantity of shown selected options
             */
            limit: {
                type: Number,
                default: 99999,
            },
            /**
             * Set the text which is shown when there are not shown options by limit
             */
            limitText: {
                type: Function,
                default(count) {
                    return this.messages.more(count);
                },
            },
            /**
             * Set the loading state
             */
            loading: {
                type: Boolean,
                default: false,
            },
            /**
             * Specify maximum for selected options
             */
            max: {
                type: [Number, Boolean],
                default: false,
            },
            /**
             * Specify max height of the popper
             */
            maxHeight: {
                type: Number,
                default: 300,
            },
            /**
             * Specify is multiple mode is enabled
             */
            multiple: {
                type: Boolean,
                default: false,
            },
            /**
             * Change the name of select
             */
            name: {
                type: String,
                default: '',
            },
            /**
             * Specify direction of shown popper
             */
            openDirection: {
                type: String,
                default: '',
            },
            /**
             * Set the options of select field
             */
            options: {
                type: Array,
                default: () => [],
            },
            /**
             * Specify height of options in the popper
             */
            optionHeight: {
                type: Number,
                default: 40,
            },
            /**
             * If the option is an object specify what property should be used as a value, by default 'value'
             */
            optionKey: {
                type: String,
            },
            /**
             * If the option is an object specify what property should be used as a label, by default 'label'
             */
            optionLabel: {
                type: String,
            },
            /**
             * Set the limit of available shown options
             */
            optionsLimit: {
                type: Number,
                default: 1000,
            },
            /**
             * Specify if the first option should be preselected
             */
            preselectFirst: {
                type: Boolean,
                default: false,
            },
            /**
             * Specify if the search should be preserved
             */
            preserveSearch: {
                type: Boolean,
                default: false,
            },
            /**
             * Change the placeholder
             */
            placeholder: {
                type: String,
                default: 'Select option',
            },
            /**
             * Specify if the selection should be reset
             */
            resetAfter: {
                type: Boolean,
                default: false,
            },
            /**
             * Specify if the field searchable
             */
            searchable: {
                type: Boolean,
                default: true,
            },
            /**
             * Specify if the no option label should be shown
             */
            showNoOptions: {
                type: Boolean,
                default: true,
            },
            /**
             * Specify if the no results label should be shown
             */
            showNoResults: {
                type: Boolean,
                default: true,
            },
            /**
             * Specify should the pointer be shown
             */
            showPointer: {
                type: Boolean,
                default: true,
            },
            /**
             * Specify tab index
             */
            tabindex: {
                type: Number,
                default: 0,
            },
            /**
             * Specify should the user create his own options - tags
             */
            taggable: {
                type: Boolean,
                default: false,
            },
            /**
             * Specify tag position
             */
            tagPosition: {
                type: String,
                default: 'top',
            },
            /**
             * Specify how the tag is validating
             */
            tagValidator: {
                type: Function,
                default: () => true,
            },
            /**
             * The array of selected options
             */
            value: {
                type: null,
                default() {
                    return [];
                },
            },
        },
        watch: {
            filteredOptions() {
                this.pointerAdjust();
            },
            internalValue() {
                if (this.resetAfter && this.internalValue.length) {
                    this.search = '';
                    this.$emit('input', this.multiple ? [] : null);
                }
            },
            isOpen() {
                this.pointerDirty = false;
            },
            pointer() {
                if (this.$refs.search) {
                    this.$refs.search.setAttribute('aria-activedescendant', `${this.id}-${this.pointer.toString()}`);
                }
            },
            search() {
                /**
                 * Search text change
                 * @type {Event}
                 */
                this.$emit('search-change', this.search, this.id);
            },
            loading() {
                this.preselect();
            },
        },
        computed: {
            computedLabel() {
                return this.optionLabel || 'label';
            },
            computedOptions() {
                if (!this.computedIsAsync) {
                    return this.options;
                }
                return this.computedAsyncLastOptions || [];
            },
            computedTrackBy() {
                return this.optionKey || 'value';
            },
            computedValue() {
                const options = this.computedIsAsync
                    ? getAllCachedAsyncValues(this.async.getAllCacheItems())
                    : this.computedOptions;

                const value = this.primitiveValue;

                if (this.isComplexOptions && value !== null) {
                    if (!this.multiple) {
                        const option = options
                            .find(opt => this.getOptionValue(opt) === value);
                        if (option) {
                            return option;
                        }
                    } else if (value) {
                        return value.map((val) => {
                            const option = options
                                .find(opt => this.getOptionValue(opt) === val);
                            return option || {[this.computedTrackBy]: val, [this.computedLabel]: val};
                        });
                    }
                }
                return this.primitiveValue;
            },
            contentStyle() {
                return {
                    display: this.computedOptions && this.computedOptions.length ? 'inline-block' : 'block',
                    minWidth: '100%',
                };
            },
            currentOptionLabel() {
                const placeholder = this.searchable ? '' : this.placeholder;
                const activeOption = this.computedOptions
                    .find(option => this.getOptionValue(option) === this.internalValue[0]);

                const value = this.internalValue && this.internalValue.length
                    ? this.getOptionLabel(activeOption)
                    : placeholder;
                return this.multiple ? placeholder : value;
            },
            filteredOptions() {
                const search = this.search || '';
                const normalizedSearch = search.toLowerCase().trim();

                let options = this.computedOptions && this.computedOptions.concat();

                if (this.computedOptions && this.internalSearch) {
                    options = filterOptions(this.computedOptions, normalizedSearch, this.computedLabel, this.customLabel);
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
            hasContent() {
                return (this.options.length !== 0 || this.showNoOptions)
                    && (this.showNoResults || this.filteredOptions.length !== 0 || !this.search);
            },
            hasLabel() {
                return (this.label || '').trim() !== '';
            },
            classes() {
                return {
                    'r-is-error': this.isInvalid,
                };
            },
            isInvalid() {
                if (this.validate) {
                    return this.validate.$invalid && this.value.length !== 0;
                }
                return false;
            },
            inputStyle() {
                if (this.searchable
                    || (this.multiple && this.value && this.value.length)) {
                    // Hide input by setting the width to 0 allowing it to receive focus
                    return this.isOpen
                        ? {width: '100%'}
                        : {width: '0', position: 'absolute', padding: '0'};
                }

                return {};
            },
            internalValue() {
                const hasOptions = !!this.value
                    && (this.computedOptions
                        .find(opt => opt === this.value || opt[this.computedTrackBy] === this.value)
                    || this.taggable);
                const value = Array.isArray(this.value)
                    ? this.value
                    : ((hasOptions && [this.value]) || []);

                return this.value !== undefined ? value : [];
            },
            isAbove() {
                if (this.openDirection === 'above' || this.openDirection === 'top') {
                    return true;
                }
                if (
                    this.openDirection === 'below'
                    || this.openDirection === 'bottom'
                ) {
                    return false;
                }
                return this.preferredOpenDirection === 'above';
            },
            isComplexOptions() {
                if (this.computedOptions) {
                    const [firstOption] = this.computedOptions;
                    return typeof firstOption !== 'string';
                }
                return false;
            },
            isPlaceholderVisible() {
                return !this.internalValue.length && (!this.searchable || !this.isOpen);
            },
            isSingleLabelVisible() {
                return (
                    (this.singleValue || this.singleValue !== undefined)
                    && (!this.isOpen || !this.searchable)
                    && !this.visibleValues.length
                );
            },
            optionKeys() {
                const {options} = this;
                return options
                    .map(element => this.customLabel(element, this.computedLabel)
                        .toString()
                        .toLowerCase());
            },
            pointerPosition() {
                return this.pointer * this.optionHeight;
            },
            primitiveValue() {
                return this.getPrimitiveValueFromValue({
                    value: this.multiple ? this.internalValue : this.value,
                    multiple: this.multiple,
                    trackBy: this.computedTrackBy,
                });
            },
            singleValue() {
                return this.internalValue[0];
            },
            valueKeys() {
                return this.internalValue.map(option => this.getOptionValue(option));
            },
            visibleElements() {
                return this.optimizedHeight / this.optionHeight;
            },
            visibleValues() {
                return this.multiple ? this.internalValue.slice(0, this.limit) : [];
            },
        },
        methods: {
            activate() {
                if (this.isOpen || this.disabled) {
                    return;
                }

                this.adjustPosition();

                this.isOpen = true;
                if (this.searchable) {
                    if (!this.preserveSearch) {
                        this.search = '';
                    }
                    this.$nextTick(() => this.$refs.search && this.$refs.search.focus());
                } else {
                    this.$el.focus();
                }
                /**
                 * The select popper open
                 * @type {Event}
                 */
                this.$emit('open', this.id);
            },
            addPointerElement({key} = 'Enter') {
                if (this.filteredOptions.length > 0) {
                    this.select(this.filteredOptions[this.pointer], key);
                }
                this.pointerReset();
            },
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
            deactivate() {
                if (!this.isOpen) {
                    return;
                }

                this.isOpen = false;
                if (this.searchable && this.$refs.search) {
                    this.$refs.search.blur();
                } else {
                    this.$el.blur();
                }
                if (!this.preserveSearch) {
                    this.search = '';
                }
                /**
                 * The select popper close
                 * @type {Event}
                 */
                this.$emit('close', this.getValue(), this.id);
            },
            getOptionLabel(option) {
                if (isEmpty(option)) {
                    return '';
                }

                if (option.isTag) {
                    return option.label;
                }

                const label = this.customLabel(option, this.computedLabel);

                if (isEmpty(label)) {
                    return '';
                }
                return label;
            },
            getOptionValue(option) {
                const trackBy = this.computedTrackBy;
                return option && option[trackBy] !== undefined ? option[trackBy] : option;
            },
            getPrimitiveValueFromValue({value, trackBy, multiple}) {
                if (value === undefined || value === null) {
                    return value;
                }
                if (multiple) {
                    if (value) {
                        return value.map(item => this.getOptionValue(item));
                    }
                    return value;
                }
                return (typeof value === 'object' && value[trackBy]) || value;
            },
            getValue() {
                const value = this.internalValue.length === 0 ? null : this.internalValue[0];
                return this.multiple ? this.internalValue : value;
            },
            isExistingOption(query) {
                return !this.computedOptions
                    ? false
                    : this.optionKeys.indexOf(query) > -1;
            },
            isOptionDisabled(option) {
                return option && !!option.$isDisabled;
            },
            isSelected(option) {
                const opt = this.getOptionValue(option);
                return this.valueKeys.indexOf(opt) > -1;
            },
            optionHighlight(index, option) {
                return {
                    'r-select-option-is-highlight': index === this.pointer && this.showPointer,
                    'r-select-option-is-selected': this.isSelected(option),
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
                    this.pointer = this.pointer - 1;
                    if (this.$refs.list.scrollTop >= this.pointerPosition) {
                        this.$refs.list.scrollTop = this.pointerPosition;
                    }
                }
                this.pointerDirty = true;
            },
            pointerForward() {
                if (this.pointer < this.filteredOptions.length - 1) {
                    this.pointer = this.pointer + 1;
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
            prepareCacheValuePrefix(value) {
                if (typeof value === 'string') {
                    return value;
                }
                return String(this.getPrimitiveValueFromValue({
                    value,
                    multiple: this.multiple,
                    trackBy: this.computedTrackBy,
                }));
            },
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

                const index = typeof option === 'object' && this.computedTrackBy
                    ? this.valueKeys.indexOf(option[this.computedTrackBy])
                    : this.valueKeys.indexOf(option);


                /**
                 * The selected option remove
                 * @type {Event}
                 */
                this.$emit('remove', option, this.id);
                if (this.multiple) {
                    const newValue = this.primitiveValue.slice(0, index).concat(this.primitiveValue.slice(index + 1));
                    /**
                     * The option select
                     * @type {Event}
                     */
                    this.$emit('input', newValue, this.id);
                } else {
                    this.$emit('input', null, this.id);
                }

                if (this.closeOnSelect && shouldClose) {
                    this.deactivate();
                }
            },
            preselect() {
                if (this.preselectFirst
                    && !this.internalValue.length
                    && this.computedOptions.length) {
                    this.select(this.filteredOptions[0]);
                }
            },
            removeLastElement() {
                if (this.blockKeys.indexOf('Delete') !== -1) {
                    return;
                }
                if (this.search.length === 0 && Array.isArray(this.internalValue) && this.internalValue.length) {
                    this.removeElement(this.internalValue[this.internalValue.length - 1], false);
                }
            },
            select(option, key) {
                if (this.blockKeys.indexOf(key) !== -1
                    || this.disabled
                    || option.$isDisabled) {
                    return;
                }
                if (key === 'Tab' && !this.pointerDirty) {
                    return;
                }
                if (option.isTag) {
                    const tagIsValid = this.tagValidator(option);
                    if (tagIsValid) {
                        /**
                         * The option tag
                         * @type {Event}
                         */
                        this.$emit('tag', option.label, this.id);
                        this.select(option.label);
                        this.search = '';
                        if (this.closeOnSelect && !this.multiple) {
                            this.deactivate();
                        }
                    }
                } else {
                    const isSelected = this.isSelected(option);

                    if (isSelected && this.multiple) {
                        if (key !== 'Tab') {
                            this.removeElement(option);
                            this.$emit('remove', option);
                        }
                        return;
                    }

                    if (this.max && this.multiple && this.internalValue.length === this.max) {
                        return;
                    }
                    /**
                     * The option select
                     * @type {Event}
                     */
                    this.$emit('select', option, this.id);

                    if (this.multiple) {
                        this.$emit('input', this.primitiveValue.concat([this.getOptionValue(option)]), this.id);
                    } else {
                        this.$emit('input', this.getOptionValue(option), this.id);
                    }

                    if (this.clearOnSelect) {
                        this.search = '';
                    }
                }
                if (this.closeOnSelect) {
                    this.deactivate();
                }
            },
            toggle() {
                if (this.isOpen) {
                    this.deactivate();
                } else {
                    this.activate();
                }
            },
            updateSearch(query) {
                this.search = query;
            },
        },

    };
</script>
<style lang="scss">
    @import './r-select.scss';
</style>
