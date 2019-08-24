<template>
    <div>
        <div class="field" :class="{'is-error': isInvalid}">
            <label class="field-label field-label-toggle" :class="{'is-disabled': disabled}" :for="name">
                <slot name="label">{{ label || $t('label') }}</slot>
            </label>
            <input type="checkbox"
                   class="field-checkbox"
                   :disabled="disabled"
                   :id="name"
                   :value="value"
                   :checked="isChecked" @change="change"/>
            <span class="field-checkbox-style">
            <r-icon :icon="checkIcon"></r-icon>
        </span>
            <span class="field-caption field-caption-toggle" v-if="caption">{{caption}}</span>
        </div>
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
            name: {
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
    input.field-checkbox[type=checkbox] {
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
        position: absolute;
        left: 0;
        top: 0;
        height: 20px;
        width: 20px;
        box-sizing: border-box;
        z-index: 10;
        cursor: pointer;
    }

    input.field-checkbox[type=checkbox]:checked ~ .field-checkbox-style, input.field-checkbox[type=checkbox]:focus ~ .field-checkbox-style {
        box-shadow: 0 0 0 1px #0044D4 inset, 0 0 0 0 rgba(161, 178, 193, 0.5) inset, 0 0 0 1px #0044D4;
    }

    input.field-checkbox[type=checkbox]:checked ~ .field-checkbox-style .icon {
        fill: #0044D4;
        opacity: 1;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
        filter: alpha(opacity=100);
    }

    input.field-checkbox[type=checkbox][disabled] ~ .field-checkbox-style {
        background: #F6F8F9;
    }

    .field-checkbox-style {
        cursor: pointer;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 2px;
        box-shadow: 0 0 0 1px #C4CED8 inset, 0 1px 2px 0 rgba(161, 178, 193, 0.5) inset, 0 0 0 0 #0044D4;
        -webkit-transition: box-shadow 0.1s ease;
        -moz-transition: box-shadow 0.1s ease;
        -ms-transition: box-shadow 0.1s ease;
        -o-transition: box-shadow 0.1s ease;
        transition: box-shadow 0.1s ease;
    }

    .field-checkbox-style .icon {
        position: absolute;
        top: -2px;
        right: -2px;
        opacity: 0;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: alpha(opacity=0);
    }
</style>
