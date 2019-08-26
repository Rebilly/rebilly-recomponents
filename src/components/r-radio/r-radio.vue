<template>
    <div class="r-field" :class="styles">
        <label class="r-field-label r-field-label-toggle" :class="labelStyles" :for="id">
            <template v-if="label">
                {{label}}
            </template>
            <slot v-else name="label"/>
        </label>
        <input type="radio" class="r-field-radio"
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
    import './r-toggle.scss';
    import shortid from 'shortid';
    import rIcon from '../r-icon/r-icon.vue';

    export default {
        name: 'RRadio',
        components: {rIcon},
        model: {
            prop: 'checked',
            event: 'change',
        },
        props: {
            checked: {
                type: [String, Number],
                required: true,
            },
            label: {
                type: String,
            },
            id: {
                type: String,
                default: () => shortid.generate(),
            },
            name: {
                type: String,
                default: 'default',
            },
            caption: {
                type: String,
                default: null,
            },
            value: {
                type: [String, Number],
                required: true,
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
        computed: {
            styles() {
                return {
                    'is-error': this.isInvalid,
                };
            },
            labelStyles() {
                return {
                    'is-disabled': this.disabled,
                    'is-checked': this.isChecked,
                };
            },
            isInvalid() {
                if (this.validate) {
                    return this.validate.$invalid && this.validate.$dirty;
                }
                return false;
            },
            isChecked() {
                return this.checked === this.value;
            },
        },
    };
</script>
