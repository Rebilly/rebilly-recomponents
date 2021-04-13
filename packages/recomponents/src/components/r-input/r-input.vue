<template>
    <div class="r-field" :class="{'r-is-error': isInvalid}">
        <label v-if="label" :for="name" class="r-field-label">{{label}}</label>
        <template v-if="!isGroupedInput">
            <input
                    ref="input"
                    :id="name"
                    v-if="!multiline"
                    class="r-field-input"
                    v-fs-block
                    :value="value"
                    @input="update"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :type="type"
                    @keyup.enter="keySubmit"
                    @keyup="keyPress"
                    @keydown="keyDown"
                    @focus="focus"
                    @blur="$emit('blur')"
                    @click="click"
                    v-on="inputEvents"
                    :name="name"
                    :maxlength="maxLength"
                    :autocomplete="autocompleteFlag"
                    v-bind="$attrs"
            />
            <textarea
                    ref="textarea"
                    :id="name"
                    v-else-if="multiline && submitOnEnter"
                    class="r-field-input"
                    v-fs-block
                    :value="value"
                    @input="update"
                    @keydown.enter.exact.prevent="keySubmit"
                    @keyup="keyPress"
                    @keydown="keyDown"
                    v-on="inputEvents"
                    :maxlength="maxLength"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :rows="rows"
                    :name="name"
                    v-bind="$attrs"
            >
            </textarea>
            <textarea
                    ref="textarea"
                    :id="name"
                    v-else="multiline && !submitOnEnter"
                    class="r-field-input"
                    v-fs-block
                    :value="value"
                    @input="update"
                    @keydown.enter="keySubmit"
                    @keyup="keyPress"
                    @keydown="keyDown"
                    :maxlength="maxLength"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :rows="rows"
                    :name="name"
                    v-bind="$attrs"
            >
            </textarea>
        </template>
        <div class="r-field-group" v-if="isGroupedInput">
            <div class="r-field-addon r-no-flex r-text-muted" v-if="leftLabel">{{leftLabel}}</div>
            <div class="r-field-control" :class="fieldStyles">
                <r-icon
                        v-if="leftIcon"
                        :icon="leftIcon"
                        :class="{'r-cursor-pointer': leftIconClickPointer, 'r-is-spinning': leftIconSpinning}"
                        @click.stop="$emit('left-icon-click')"></r-icon>
                <input
                        ref="input"
                        :id="name"
                        class="r-field-input"
                        v-fs-block
                        :value="value"
                        @input="update"
                        :placeholder="placeholder"
                        :disabled="disabled"
                        :type="type"
                        @keyup.enter="keySubmit"
                        @keyup="keyPress"
                        @keydown="keyDown"
                        @focus="focus"
                        @blur="$emit('blur')"
                        @click="click"
                        v-on="inputEvents"
                        :name="name"
                        :maxlength="maxLength"
                        :autocomplete="autocompleteFlag"
                        v-bind="$attrs"
                />
                <r-icon
                        v-if="rightIcon"
                        :icon="rightIcon"
                        :class="{'r-cursor-pointer': rightIconClickPointer, 'r-is-spinning': rightIconSpinning}"
                        @click.stop="$emit('right-icon-click')"></r-icon>
            </div>
            <slot name="right-button"/>
            <div class="r-field-addon r-no-flex r-text-muted" v-if="rightLabel">{{rightLabel}}</div>
        </div>
        <span class="r-field-caption" v-if="helpText || maxLength">{{helpText}} <span v-if="maxLength">{{charactersLeft}}</span></span>
    </div>
</template>

<script>
    import shortid from 'shortid';
    import rIcon from '../r-icon/r-icon.vue';
    import '../../directives/r-fs-block';
    // TODO classes prefix r-is-error, r-no-flex, etc.
    export default {
        name: 'RInput',
        inheritAttrs: false,
        components: {rIcon},
        props: {
            /**
             * TBD
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            value: {
                type: [String, Number, Boolean],
                default: null,
            },
            /**
             * TBD
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            validate: {
                type: Object,
                default: null,
            },
            /**
             * TBD
             */
            placeholder: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            helpText: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            multiline: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            submitOnEnter: {
                type: Boolean,
                default: false,
            },
            /**
             * Define input events
             */
            inputEvents: {
                type: Object,
                default: () => ({}),
            },
            /**
             * TBD
             */
            leftIcon: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            leftIconClickPointer: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            rightIcon: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            rightIconClickPointer: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            leftIconSpinning: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            rightIconSpinning: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            leftLabel: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            rightLabel: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            password: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            numeric: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            name: {
                type: String,
                default: () => shortid.generate(),
            },
            /**
             * TBD
             */
            rows: {
                type: [String, Number],
                default: '1',
            },
            /**
             * TBD
             */
            autoFocus: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            autoHighlight: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            autoHighlightOnFocus: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            maxLength: {
                type: Number,
            },
            /**
             * TBD
             */
            autoResize: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            autoComplete: String,
        },
        computed: {
            isInvalid() {
                if (this.validate) {
                    return this.validate.$invalid && this.validate.$dirty;
                }
                return false;
            },
            isGroupedInput() {
                return !this.multiline
                    && (this.leftIcon
                        || this.rightIcon
                        || this.leftLabel
                        || this.rightLabel
                        || this.$slots['right-button']);
            },
            fieldStyles() {
                const style = {};
                if (this.leftIcon) {
                    style['r-has-icon-left'] = true;
                }
                if (this.rightIcon) {
                    style['r-has-icon-right'] = true;
                }
                return style;
            },
            type() {
                if (this.password) {
                    return 'password';
                }
                if (this.numeric) {
                    return 'number';
                }
                return 'text';
            },
            autocompleteFlag() {
                return this.autoComplete || `new-${this.name}`;
            },
            charactersLeft() {
                return `(${this.value ? Number.parseInt(this.maxLength, 10) - this.value.length : this.maxLength} characters left.)`;
            },
        },
        methods: {
            update({target: {value}}) {
                if (this.autoResize && this.$refs.textarea) {
                    this.autoResizeTextArea(this.$refs.textarea);
                }
                this.$emit('input', value);
            },
            keySubmit() {
                this.$emit('key-submit');
            },
            keyPress(event) {
                this.$emit('key-press', event);
            },
            keyDown(event) {
                this.$emit('key-down', event);
            },
            getFocus() {
                const e = this.$refs.input || this.$refs.textarea;
                if (e) {
                    e.focus();
                }
            },
            blur() {
                const e = this.$refs.input || this.$refs.textarea;
                if (e) {
                    e.blur();
                }
                this.$emit('blur');
            },
            focus() {
                if (this.autoHighlightOnFocus) {
                    this.highlight();
                }
                this.$emit('focus');
            },
            click() {
                this.$emit('click');
            },
            autoResizeTextArea(element) {
                element.style.height = 'auto';
                element.style.height = `${element.scrollHeight}px`;
            },
            highlight() {
                this.$nextTick(() => {
                    this.$refs.input.select();
                });
            },
        },
        mounted() {
            if (this.autoFocus) {
                this.getFocus();
            }
            if (this.autoHighlight) {
                this.highlight();
            }
            if (this.autoResize && this.$refs.textarea) {
                this.autoResizeTextArea(this.$refs.textarea);
            }
        },
    };
</script>

<style lang="scss">
    @import './r-input.scss';

    .r-field textarea {
        resize: none;
        overflow-x: hidden;
        overflow-y: auto;
        min-height: 36px;
        max-height: 150px;
    }
</style>
