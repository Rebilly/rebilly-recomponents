<template>
    <div class="r-field" :class="classes" role="radio" :aria-checked="isChecked">
        <label class="r-field-label r-field-label-toggle" :class="labelClasses" :for="id">
            <template v-if="label">
                {{label}}
            </template>
            <slot v-else name="label"/>
        </label>
        <input type="radio" class="r-field-radio"
               :value="value"
               :checked="isChecked"
               :id="id"
               :name="name"
               :disabled="disabled" @change="$emit('change', value)"/>

        <span class="r-field-radio-style">
            <r-icon icon="radio-checkmark"></r-icon>
        </span>
        <span class="r-field-caption r-field-caption-toggle" v-if="caption">{{caption}}</span>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid/non-secure/index.cjs';
    import rIcon from '../r-icon/r-icon.vue';

    export default {
        name: 'RRadio',
        components: {rIcon},
        model: {
            prop: 'checked',
            event: 'change',
        },
        props: {
            /**
             * TBD
             */
            checked: {
                type: [String, Number, Boolean, Array],
                default: null,
            },
            /**
             * TBD
             */
            label: {
                type: String,
            },
            /**
             * TBD
             */
            id: {
                type: String,
                default: () => nanoid(),
            },
            /**
             * TBD
             */
            name: {
                type: String,
                default: () => nanoid(),
            },
            /**
             * TBD
             */
            caption: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            value: {
                type: [String, Number, Boolean, Array],
                required: true,
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
        },
        computed: {
            classes() {
                return {
                    'r-is-error': this.isInvalid,
                };
            },
            labelClasses() {
                return {
                    'r-is-disabled': this.disabled,
                    'r-is-checked': this.isChecked,
                };
            },
            isInvalid() {
                if (this.validate) {
                    return this.validate.$invalid && this.validate.$dirty;
                }
                return false;
            },
            isChecked() {
                if (this.value === null) {
                    return false;
                }
                return this.checked === this.value;
            },
        },
    };
</script>

<style lang="scss">
    @import './r-radio.scss';
    @import './r-toggle.scss';
</style>
