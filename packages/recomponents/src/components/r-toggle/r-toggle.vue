<template>
    <div class="r-toggle" role="checkbox" :aria-checked="isChecked">
        <label class="r-toggle-body" :for="name">
            <input
                    class="r-toggle-switch"
                    type="checkbox"
                    :disabled="disabled"
                    :id="name"
                    :value="value"
                    :checked="isChecked"
                    @change="change"/>
            <span class="r-toggle-switch-handle"></span>
        </label>
        <label v-if="label" class="r-toggle-label" :for="name">{{label}}</label>
    </div>
</template>

<script>
    import {nanoid} from 'nanoid/non-secure/index.cjs';

    export default {
        name: 'RToggle',
        model: {
            prop: 'checked',
            event: 'change',
        },
        props: {
            /**
             * Append text label near checkbox
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * Native html input name for element
             */
            name: {
                type: String,
                default: () => nanoid(),
            },
            /**
             * Actual the actual model for the component
             */
            checked: {
                type: [Array, String, Number, Boolean],
            },
            /**
             * Used to decide if checkbox is selected
             */
            value: {
                type: [String, Boolean],
                default: 'on',
            },
            /**
             * Disabled state similar to navite html element
             */
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            isChecked() {
                if (this.checked === null) {
                    return false;
                }
                if (Array.isArray(this.checked)) {
                    return this.checked.includes(this.value);
                }
                return this.checked === this.value;
            },
        },
        methods: {
            getModelValue() {
                if (Array.isArray(this.checked)) {
                    // copy array to prevent mutation on property
                    const copiedModel = this.checked.slice();
                    if (this.isChecked) {
                        // uncheck
                        copiedModel.splice(this.checked.indexOf(this.value), 1);
                    } else {
                        // check
                        copiedModel.push(this.value);
                    }
                    return copiedModel;
                }
                return !this.isChecked;
            },
            change() {
                // we trigger the event (input) we declared in the `model`
                // block above to let the `v-model` directive know
                // the model property is to be mutated in the parent
                // component
                this.$emit('change', this.getModelValue());
            },
        },
    };
</script>

<style lang="scss">
    @import './r-toggle.scss';
</style>
