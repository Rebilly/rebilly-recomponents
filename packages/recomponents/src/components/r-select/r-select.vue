<template>
    <div>
        <label v-if="hasLabel"
               @click="activate"
               class="r-field-label">{{label}}
        </label>
        <div :tabindex="searchable ? -1 : tabindex"
             :class="{ 'r-select--active': isOpen,
                       'r-select--disabled': disabled,
                       'r-select--above': isAbove,
                       'r-select--allow-empty': allowEmpty}"
             @focus="activate()"
             @blur="searchable ? false : deactivate()"
             @keydown.self.down.prevent="pointerForward()"
             @keydown.self.up.prevent="pointerBackward()"
             @keypress.enter.tab.stop.self="addPointerElement($event)"
             @keyup.esc="deactivate()"
             class="r-select r-field"
             role="combobox"
             :aria-owns="'listbox-'+id">
            <slot name="caret" :toggle="toggle">
                <div @mousedown.prevent.stop="toggle()" class="r-select__select"></div>
            </slot>
            <slot name="clear" :search="search"></slot>
            <div ref="tags" class="r-select__tags">
                <slot name="selection"
                      :search="search"
                      :remove="removeElement"
                      :values="visibleValues"
                      :is-open="isOpen">
                    <div class="r-select__tags-wrap"
                         v-show="visibleValues.length > 0">
                        <template v-for="(option, index) of visibleValues"
                                  @mousedown.prevent>
                            <slot name="tag"
                                  :option="option"
                                  :search="search"
                                  :remove="removeElement">
                                <template>
                                    <r-badge class="r-select__tag" type="tag" @close="removeElement(option)">
                                        <template v-slot:text>
                                            <span class="r-select__tag-text">
                                                {{ getOptionLabel(option) }}
                                            </span>
                                        </template>
                                    </r-badge>
                                </template>
                            </slot>
                        </template>
                    </div>
                    <template v-if="internalValue && internalValue.length > limit">
                        <slot name="limit">
                            <strong class="r-select__strong"
                                    v-text="limitText(internalValue.length - limit)"/>
                        </slot>
                    </template>
                </slot>
                <transition name="r-select__loading">
                    <slot name="loading">
                        <div v-show="loading" class="r-select__spinner"/>
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
                       class="r-select__input"
                       :aria-controls="'listbox-'+id"
                />
                <span v-if="isSingleLabelVisible"
                      class="r-select__single"
                      @mousedown.prevent="toggle">
                    <slot name="singleLabel" :option="singleValue">
                        <template>{{ currentOptionLabel }}</template>
                    </slot>
                </span>
                <span v-if="isPlaceholderVisible"
                      class="r-select__placeholder"
                      @mousedown.prevent="toggle">
                    <slot name="placeholder">
                        {{ placeholder }}
                    </slot>
                </span>
            </div>
            <transition name="r-select">
                <div class="r-select__content-wrapper"
                     v-show="isOpen"
                     @focus="activate"
                     tabindex="-1"
                     @mousedown.prevent
                     :style="{ maxHeight: optimizedHeight + 'px' }"
                     ref="list">
                    <ul class="r-select__content"
                        :style="contentStyle"
                        role="listbox"
                        :id="'listbox-'+id">
                        <slot name="beforeList">
                            <template v-if="computedIsLoading">
                                <span class="r-select__option">
                                    {{ $t('loading') }}
                                </span>
                            </template>
                            <template v-if="computedAsyncHasPrevOptions">
                                <li class="r-select__option align-center r-select__option-load r-select__option-load-prev">
                                    <r-icon-button
                                            type="basic"
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
                            <span class="r-select__option">
                                <slot name="maxElements">
                                    {{ $t('max', { max }) }}
                                </slot>
                            </span>
                        </li>
                        <!--<template v-if="!max || internalValue.length < max">-->
                        <li class="r-select__element"
                            v-for="(option, index) of filteredOptions"
                            :key="index"
                            v-bind:id="id + '-' + index"
                            v-bind:role="option">
                            <span :class="optionHighlight(index, option)"
                                  @click.stop="select(option)"
                                  @mouseenter.self="pointerSet(index)"
                                  class="r-select__option">
                                <slot name="option"
                                      :option="option"
                                      :search="search">
                                    <span>{{ getOptionLabel(option) }}</span>
                                </slot>
                            </span>
                        </li>
                        <!--</template>-->
                        <li v-show="showNoResults && (filteredOptions.length === 0 && search && !loading)">
                            <span class="r-select__option">
                                <slot name="noResult"
                                      :search="search">{{$t('noResult')}}
                                </slot>
                            </span>
                        </li>
                        <li v-show="showNoOptions && (options.length === 0 && !search && !loading)">
                            <span class="r-select__option">
                                <slot name="noOptions">{{$t('noOptions')}}</slot>
                            </span>
                        </li>
                        <slot name="afterList">
                            <template v-if="computedAsyncHasNextOptions">
                                <li class="r-select__option align-center r-select__option-load r-select__option-load-next">
                                    <r-icon-button
                                            type="basic"
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
        <span v-if="helpText" class="r-field-caption" v-html="helpText"></span>
    </div>
</template>

<script>
    import shortid from 'shortid';
    import AsyncInputMixin from '../../mixins/async-input-mixin';
    import RIcon from '../r-icon/r-icon.vue';
    import RBadge from '../r-badge/r-badge.vue';
    import RIconButton from '../r-icon-button/r-icon-button.vue';

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
            };
        },
        i18n: {
            messages: {
                en: {
                    loading: 'Looking for matching results...',
                    more: 'and {count} more',
                    max: 'Maximum of {max} options selected. First remove a selected option to select another.',
                    noOptions: 'List is empty.',
                    noResult: 'No elements found. Consider changing the search query.',
                },
            },
        },
        mounted() {
            if (!this.multiple && this.max) {
                console.warn('[Recomponents warn]: Max prop should not be used when prop Multiple equals false.');
            }
        },
        mixins: [new AsyncInputMixin().getMixin()],
        components: {RIcon, RIconButton, RBadge},
        props: {
            allowEmpty: {
                type: Boolean,
                default: true,
            },
            blockKeys: {
                type: Array,
                default() {
                    return [];
                },
            },
            clearOnSelect: {
                type: Boolean,
                default: true,
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
            disabled: {
                type: Boolean,
                default: false,
            },
            helpText: {
                type: String,
            },
            hideSelected: {
                type: Boolean,
                default: false,
            },
            id: {
                type: String,
                default: () => shortid.generate(),
            },
            internalSearch: {
                type: Boolean,
                default: true,
            },
            label: {
                type: String,
            },
            limit: {
                type: Number,
                default: 99999,
            },
            limitText: {
                type: Function,
                default(count) {
                    return this.$t('more', {count});
                },
            },
            loading: {
                type: Boolean,
                default: false,
            },
            max: {
                type: [Number, Boolean],
                default: false,
            },
            maxHeight: {
                type: Number,
                default: 300,
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            name: {
                type: String,
                default: '',
            },
            openDirection: {
                type: String,
                default: '',
            },
            options: {
                type: Array,
                required: true,
            },
            optionHeight: {
                type: Number,
                default: 40,
            },
            optionsLimit: {
                type: Number,
                default: 1000,
            },
            preselectFirst: {
                type: Boolean,
                default: false,
            },
            preserveSearch: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
                default: 'Select option',
            },
            propLabel: {
                type: String,
            },
            resetAfter: {
                type: Boolean,
                default: false,
            },
            searchable: {
                type: Boolean,
                default: true,
            },
            showNoOptions: {
                type: Boolean,
                default: true,
            },
            showNoResults: {
                type: Boolean,
                default: true,
            },
            showPointer: {
                type: Boolean,
                default: true,
            },
            tabindex: {
                type: Number,
                default: 0,
            },
            taggable: {
                type: Boolean,
                default: false,
            },
            tagPosition: {
                type: String,
                default: 'top',
            },
            trackBy: {
                type: String,
            },
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
            options() {
                if (this.preselectFirst
                    && !this.internalValue.length
                    && this.options.length) {
                    this.select(this.filteredOptions[0]);
                }
            },
            pointer() {
                if (this.$refs.search) {
                    this.$refs.search.setAttribute('aria-activedescendant', `${this.id}-${this.pointer.toString()}`);
                }
            },
            search() {
                this.$emit('search-change', this.search, this.id);
            },

        },
        computed: {
            currentOptionLabel() {
                const placeholder = this.searchable ? '' : this.placeholder;
                const value = this.internalValue && this.internalValue.length
                    ? this.getOptionLabel(this.internalValue[0])
                    : placeholder;
                return this.multiple ? placeholder : value;
            },
            contentStyle() {
                return this.options.length
                    ? {display: 'inline-block'}
                    : {display: 'block'};
            },
            filteredOptions() {
                const search = this.search || '';
                const normalizedSearch = search.toLowerCase().trim();

                let options = this.options && this.options.concat();

                if (this.internalSearch) {
                    options = filterOptions(this.options, normalizedSearch, this.propLabel, this.customLabel);
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
            hasLabel() {
                return (this.label || '').trim() !== '';
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
                const value = Array.isArray(this.value) ? this.value : [this.value];
                return this.value || this.value === 0 ? value : [];
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
            isPlaceholderVisible() {
                return !this.internalValue.length && (!this.searchable || !this.isOpen);
            },
            isSingleLabelVisible() {
                return (
                    (this.singleValue || this.singleValue === 0)
                    && (!this.isOpen || !this.searchable)
                    && !this.visibleValues.length
                );
            },
            optionKeys() {
                const {options} = this;
                return options
                    .map(element => this.customLabel(element, this.propLabel)
                        .toString()
                        .toLowerCase());
            },
            pointerPosition() {
                return this.pointer * this.optionHeight;
            },
            singleValue() {
                return this.internalValue[0];
            },
            valueKeys() {
                if (this.trackBy) {
                    return this.internalValue.map(element => element[this.trackBy]);
                }
                return this.internalValue;
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
                this.$emit('close', this.getValue(), this.id);
            },
            getOptionLabel(option) {
                if (isEmpty(option)) {
                    return '';
                }

                if (option.isTag) {
                    return option.label;
                }

                const label = this.customLabel(option, this.propLabel);

                if (isEmpty(label)) {
                    return '';
                }
                return label;
            },
            getValue() {
                const value = this.internalValue.length === 0 ? null : this.internalValue[0];
                return this.multiple ? this.internalValue : value;
            },
            isExistingOption(query) {
                return !this.options
                    ? false
                    : this.optionKeys.indexOf(query) > -1;
            },
            isOptionDisabled(option) {
                return option && !!option.$isDisabled;
            },
            isSelected(option) {
                const opt = this.trackBy
                    ? option[this.trackBy]
                    : option;

                return this.valueKeys.indexOf(opt) > -1;
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
                    this.pointer = -1;
                    if (this.$refs.list.scrollTop >= this.pointerPosition) {
                        this.$refs.list.scrollTop = this.pointerPosition;
                    }
                }
                this.pointerDirty = true;
            },
            pointerForward() {
                if (this.pointer < this.filteredOptions.length - 1) {
                    this.pointer = +1;
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

                const index = typeof option === 'object' && this.trackBy
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
                    this.$emit('tag', option.label, this.id);
                    this.select(option.label);
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

                    if (this.max && this.multiple && this.internalValue.length === this.max) {
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
