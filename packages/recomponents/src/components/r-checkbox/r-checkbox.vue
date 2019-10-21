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
            selected: { // this is the actual model for the component
                type: [Array, String, Number, Boolean],
            },
            value: {
                type: [String, Boolean],
                default: 'on',
            },
            fuzzy: {
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
                if (this.fuzzy) {
                    return true;
                }
                if (this.selected === null) {
                    return false;
                }
                if (Array.isArray(this.selected)) {
                    return this.selected.includes(this.value);
                }
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
            getModelValue() {
                if (!Array.isArray(this.selected)) {
                    return !this.isChecked;
                }

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
                this.$emit('input', this.getModelValue());
            },
        },
    };
</script>

<style lang="scss">
    @import './r-checkbox.scss';
</style>
