<template>
    <button
        v-on="$listeners"
        class="r-button"
        :class="classes"
        :disabled="disabled"
        v-tooltip="{text: tooltip}">
        <slot name="left-icon"></slot>
        <div class="capitalize-the-first-letter">
            <slot/>
        </div>
        <slot name="right-icon"></slot>
    </button>
</template>

<script>

    export default {
        name: 'RIconButton',
        props: {
            /**
             * TBD
             */
            type: {
                type: String,
                default: 'default',
                validator: val => ['default', 'primary', 'danger'].includes(val),
            },
            /**
             * TBD
             */
            size: {
                type: String,
                default: 'regular',
                validator: val => ['small', 'regular', 'large'].includes(val),
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
            fluid: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            tooltip: {
                type: String,
                default: null,
            },
            /**
             * TBD
             */
            fitted: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            tooltipRightEdge: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            classes() {
                const style = {};
                style[`r-button-type-${this.type}`] = !!this.type;
                style[`r-button-size-${this.size}`] = !!this.size;
                style['r-button-fluid'] = !!this.fluid;
                style['r-button-fitted'] = !!this.fitted;
                // check if the slot is present to add the class
                // it requires
                if (this.$slots['left-icon']) {
                    style['r-has-icon-left'] = true;
                }
                if (this.$slots['right-icon']) {
                    style['r-has-icon-right'] = true;
                }
                if (!this.$slots['right-icon'] && !this.$slots['left-icon']) {
                    style['r-has-icon'] = true;
                }
                return style;
            },
        },
    };
</script>

<style lang="scss">
    @import '../r-button/r-button.scss';
</style>
