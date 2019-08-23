<template>
    <div class="r-field" :class="styles">
        <label class="r-field-label r-field-label-toggle" :class="labelStyles" :for="name">
            <template v-if="label">
                {{label}}
            </template>
            <slot v-else name="label"/>
        </label>
        <input type="radio" class="r-field-radio"
               :id="name"
               :name="group"
               :value="value"
               :checked="isChecked"
               :disabled="disabled" @change="update"/>

        <span class="r-field-radio-style">
            <r-icon icon="radio-checkmark"></r-icon>
        </span>
        <span class="r-field-caption r-field-caption-toggle" v-if="caption">{{caption}}</span>
    </div>
</template>

<script>
    import '../../style/r-radio.css';
    import shortid from 'shortid';
    import rIcon from '../r-icon/r-icon.vue';

    export default {
        name: 'r-radio',
        components: {rIcon},
        props: {
            label: {
                type: String,
            },
            group: {
                type: String,
                default: shortid.generate(),
            },
            name: {
                type: String,
                default: () => shortid.generate(),
            },
            caption: {
                type: String,
                default: null,
            },
            type: {
                type: String,
                default: null,
            },
            model: {
                type: [String, Number, Boolean, Array],
                default: null,
            },
            value: {
                type: [String, Number, Boolean, Array],
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
                    [`is-${this.type}`]: !!this.type,
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
                if (this.value === null) {
                    return false;
                }
                return this.model === this.value;
            },
        },
        methods: {
            update() {
                this.$emit('update', this.value);
            },
        },
    };
</script>
