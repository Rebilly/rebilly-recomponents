<template>
    <div>
        <label
                v-if="hasLabel"
                @click="activate"
                class="r-field-label">{{label}}</label>
        <div
                :tabindex="searchable ? -1 : tabindex"
                :class="{ 'r-select--active': isOpen, 'r-select--disabled': disabled, 'r-select--above': isAbove }"
                @focus="activate()"
                @blur="searchable ? false : deactivate()"
                @keydown.self.down.prevent="pointerForward()"
                @keydown.self.up.prevent="pointerBackward()"
                @keypress.enter.tab.stop.self="addPointerElement($event)"
                @keyup.esc="deactivate()"
                class="r-select"
                role="combobox"
                :aria-owns="'listbox-'+id">
            <slot name="caret" :toggle="toggle">
                <div @mousedown.prevent.stop="toggle()" class="r-select__select"></div>
            </slot>
            <slot name="clear" :search="search"></slot>
            <div ref="tags" class="r-select__tags">
                <slot
                        name="selection"
                        :search="search"
                        :remove="removeElement"
                        :values="visibleValues"
                        :is-open="isOpen"
                >
                    <div class="r-select__tags-wrap" v-show="visibleValues.length > 0">
                        <template v-for="(option, index) of visibleValues" @mousedown.prevent>
                            <slot name="tag" :option="option" :search="search" :remove="removeElement">
                                <template v-if="requiresTagSlot" slot-scope="tagProps">
                                    <slot name="custom-tag" v-bind="tagProps"/>
                                </template>
                                <template v-else="requiresTagSlot">
                                                    <span class="r-select__tag" :key="index">
                                                          <span v-text="getOptionLabel(option)"></span>
                                                          <i aria-hidden="true" tabindex="1"
                                                             @keypress.enter.prevent="removeElement(option)"
                                                             @mousedown.prevent="removeElement(option)"
                                                             class="r-select__tag-icon"></i>
                                                    </span>
                                </template>

                            </slot>
                        </template>
                    </div>
                    <template v-if="internalValue && internalValue.length > limit">
                        <slot name="limit">
                            <strong class="r-select__strong" v-text="limitText(internalValue.length - limit)"/>
                        </slot>
                    </template>
                </slot>
                <transition name="r-select__loading">
                    <slot name="loading">
                        <div v-show="loading" class="r-select__spinner"/>
                    </slot>
                </transition>
                <input
                        ref="search"
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
                <span
                        v-if="isSingleLabelVisible"
                        class="r-select__single"
                        @mousedown.prevent="toggle"
                >
          <slot name="singleLabel" :option="singleValue">
            <template>{{ currentOptionLabel }}</template>
          </slot>
        </span>
                <span
                        v-if="isPlaceholderVisible"
                        class="r-select__placeholder"
                        @mousedown.prevent="toggle"
                >
          <slot name="placeholder">
            {{ placeholder }}
          </slot>
        </span>
            </div>
            <transition name="r-select">
                <div
                        class="r-select__content-wrapper"
                        v-show="isOpen"
                        @focus="activate"
                        tabindex="-1"
                        @mousedown.prevent
                        :style="{ maxHeight: optimizedHeight + 'px' }"
                        ref="list"
                >
                    <ul class="r-select__content" :style="contentStyle" role="listbox" :id="'listbox-'+id">
                        <slot name="beforeList">
                            <template v-if="computedIsLoading">
                                <span class="r-select__option">Looking for matching results...</span>
                            </template>
                            <template v-if="computedAsyncHasPrevOptions">
                                <!-- TODO fix css -->
                                <li class="r-select__option align-center r-select__option-load r-select__option-load-prev">
                                    <v-icon-button
                                            type="basic"
                                            size="small"
                                            @click="handleAsyncLoadPrev"
                                            :disabled="computedIsLoading"
                                            fluid>
                                        Get prev
                                        <v-icon icon="caret-up"/>
                                    </v-icon-button>
                                </li>
                            </template>
                        </slot>

                        <li v-if="multiple && max === internalValue.length">
              <span class="r-select__option">
                <slot name="maxElements">Maximum of {{ max }} options selected. First remove a selected option to select another.</slot>
              </span>
                        </li>
                        <template v-if="!max || internalValue.length < max">
                            <li class="r-select__element"
                                v-for="(option, index) of filteredOptions"
                                :key="index"
                                v-bind:id="id + '-' + index"
                                v-bind:role="!(option && (option.$isLabel || option.$isDisabled)) ? 'option' : null">
                <span
                        v-if="!(option && (option.$isLabel || option.$isDisabled))"
                        :class="optionHighlight(index, option)"
                        @click.stop="select(option)"
                        @mouseenter.self="pointerSet(index)"
                        class="r-select__option">
                    <slot name="option" :option="option" :search="search">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
                                <span
                                        v-if="option && (option.$isLabel || option.$isDisabled)"
                                        :class="groupHighlight(index, option)"
                                        @mouseenter.self="groupSelect && pointerSet(index)"
                                        @mousedown.prevent="selectGroup(option)"
                                        class="r-select__option">
                    <slot name="option" :option="option" :search="search">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
                            </li>
                        </template>
                        <li v-show="showNoResults && (filteredOptions.length === 0 && search && !loading)">
              <span class="r-select__option">
                <slot name="noResult" :search="search">No elements found. Consider changing the search query.</slot>
              </span>
                        </li>
                        <li v-show="showNoOptions && (options.length === 0 && !search && !loading)">
              <span class="r-select__option">
                <slot name="noOptions">List is empty.</slot>
              </span>
                        </li>
                        <slot name="afterList">
                            <template v-if="computedAsyncHasNextOptions">
                                <!-- TODO fix css -->
                                <li class="r-select__option align-center r-select__option-load r-select__option-load-next">
                                    <v-icon-button
                                            type="basic"
                                            size="small"
                                            @click="handleAsyncLoadNext"
                                            :disabled="computedIsLoading"
                                            fluid>
                                        Load more...
                                        <v-icon icon="caret-down"/>
                                    </v-icon-button>
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
    import multiSelectMixin from './multiselectMixin';
    import pointerMixin from './pointerMixin';
    import AsyncInputMixin from '../../mixins/async-input-mixin';

    export default {
        name: 'r-select',
        mixins: [multiSelectMixin, pointerMixin, new AsyncInputMixin().getMixin()],
        props: {
            name: {
                type: String,
                default: '',
            },
            limit: {
                type: Number,
                default: 99999,
            },
            maxHeight: {
                type: Number,
                default: 300,
            },
            limitText: {
                type: Function,
                default: count => `and ${count} more`,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            openDirection: {
                type: String,
                default: '',
            },
            showNoOptions: {
                type: Boolean,
                default: true,
            },
            showNoResults: {
                type: Boolean,
                default: true,
            },
            tabindex: {
                type: Number,
                default: 0,
            },
            label: {
                type: String,
            },
            helpText: {
                type: String,
            },
        },
        computed: {
            isSingleLabelVisible() {
                return (
                    (this.singleValue || this.singleValue === 0) &&
                    (!this.isOpen || !this.searchable) &&
                    !this.visibleValues.length
                );
            },
            isPlaceholderVisible() {
                return !this.internalValue.length && (!this.searchable || !this.isOpen);
            },
            visibleValues() {
                return this.multiple ? this.internalValue.slice(0, this.limit) : [];
            },
            singleValue() {
                return this.internalValue[0];
            },
            inputStyle() {
                if (
                    this.searchable ||
                    (this.multiple && this.value && this.value.length)
                ) {
                    // Hide input by setting the width to 0 allowing it to receive focus
                    return this.isOpen
                        ? {width: '100%'}
                        : {width: '0', position: 'absolute', padding: '0'};
                }
            },
            contentStyle() {
                return this.options.length
                    ? {display: 'inline-block'}
                    : {display: 'block'};
            },
            isAbove() {
                if (this.openDirection === 'above' || this.openDirection === 'top') {
                    return true;
                } else if (
                    this.openDirection === 'below' ||
                    this.openDirection === 'bottom'
                ) {
                    return false;
                } else {
                    return this.preferredOpenDirection === 'above';
                }
            },
            showSearchInput() {
                return (
                    this.searchable &&
                    (this.hasSingleSelectedSlot &&
                    (this.visibleSingleValue || this.visibleSingleValue === 0)
                        ? this.isOpen
                        : true)
                );
            },
            hasLabel() {
                return (this.label || '').trim() !== '';
            },
            requiresTagSlot() {
                return this.$slots['custom-tag'] !== undefined;
            },
        },
    };
</script>

<style lang="scss">
    @import './r-select.scss';
</style>

