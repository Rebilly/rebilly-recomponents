<template>
    <div class="r-checkbox" :class="{'is-error': isInvalid}" role="checkbox" :aria-checked="isChecked">
        <label class="r-field-label r-field-label-toggle" :class="{'is-disabled': disabled}" :for="id">
            <slot name="label">{{ label || $t('label') }}</slot>
        </label>
        <input type="checkbox"
                class="r-field-checkbox"
                :disabled="disabled"
                :id="id"
                :value="value"
                :checked="isChecked" @change="change"/>
        <span class="r-field-checkbox-style">
                <r-icon :icon="checkIcon"></r-icon>
        </span>
        <span class="r-field-caption r-field-caption-toggle" v-if="caption">{{caption}}</span>
    </div>
</template>

<script>
    import shortId from 'shortid';
    import RIcon from '../r-icon/r-icon.vue';

    // TODO: prefixes of simple classes `r-is-error, is-disabled`
    export default {
        name: 'RCheckbox',
        components: {RIcon},
        props: {
            label: {
                type: String,
                default: '',
            },
            id: {
                type: String,
                default: () => shortId.generate(),
            },
            caption: {
                type: String,
                default: null,
            },
            selected: { // this is the actual parent model for the component
                type: [Array, String, Number, Boolean],
            },
            value: { // might be used to decide if checkbox is selected
                type: [String, Boolean],
                default: 'on',
            },
            fuzzy: { // semi-selected (indeterminate)
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            validate: {
                type: Object,
                default: null,
            },
        },
        model: {
            prop: 'selected',
            event: 'input',
        },
        computed: {
            isInvalid() {
                if (this.validate) {
                    return this.validate.$invalid && this.validate.$dirty;
                }
                return false;
            },
            isChecked() {
                // parent decides if checkbox is indeterminate, which is just visual style - we mark it as always selected
                if (this.fuzzy) {
                    return true;
                }
                if (this.selected === null) {
                    return false;
                }
                if (Array.isArray(this.selected)) {
                    return this.selected.includes(this.value);
                }
                // selected is not empty - compare against value
                return this.selected === this.value;
            },
            checkIcon() {
                return this.fuzzy ? 'dash-l' : 'checkbox-checkmark';
            },
        },
        i18n: {
            messages: {
                en: {
                    label: 'Label',
                },
                ja: {
                    label: 'ラベル',
                },
            },
        },
        methods: {
            /**
             * Method used to calculate the modified internal state *after* user action.
             *
             * This method is (and must be) used *only* when the checkbox is clicked by the user (@see change).
             * Checkbox does not keep internal state - it calculates it based on the properties passed.
             * Therfore on update, it sends the opposite of the current state (as the user has just changed it).
             * It's up to the parent to update it's model and pass the new value as property, so the checkbox can update itself.
             */
            getNegateInternalState() {
                if (!Array.isArray(this.selected)) {
                    return !this.isChecked;
                }

                // selected is array -> add/remove value from the array (the opposite of the current state)

                // copy array to prevent mutation on property
                const copiedModel = this.selected.slice();

                if (this.isChecked) {
                    // uncheck
                    copiedModel.splice(this.selected.indexOf(this.value), 1);
                } else {
                    // check
                    copiedModel.push(this.value);
                }
                return copiedModel;
            },
            change() {
                // we trigger the event (input) we declared in the `model`
                // block above to let the `v-model` directive know
                // the model property is to be mutated in the parent
                // component
                this.$emit('input', this.getNegateInternalState());
            },
        },
    };
</script>

<style lang="scss">
    @import './r-checkbox.scss';
</style>
