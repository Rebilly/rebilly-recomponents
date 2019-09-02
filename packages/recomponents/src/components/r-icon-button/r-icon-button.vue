<template>
    <button
        v-on="$listeners"
        class="r-button"
        :class="styles"
        :disabled="disabled"
        v-tooltip="{text: tooltip}">
        <slot name="left-icon"></slot>
        <slot/>
        <slot name="right-icon"></slot>
    </button>
</template>

<script>
    import '../../directives/r-tooltip';

    export default {
        name: 'RIconButton',
        props: {
            type: {
                type: String,
                default: 'default',
            },
            size: {
                type: String,
                default: null,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            fluid: {
                type: Boolean,
                default: false,
            },
            tooltip: {
                type: String,
                default: null,
            },
            fitted: {
                type: Boolean,
                default: false,
            },
            tooltipRightEdge: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            styles() {
                const style = {};
                style[`r-button--type-${this.type}`] = !!this.type;
                style[`r-button--size-${this.size}`] = !!this.size;
                style['r-button--fluid'] = !!this.fluid;
                style['r-button-fitted'] = !!this.fitted;
                // check if the slot is present to add the class
                // it requires
                if (this.$slots['left-icon']) {
                    style['has-icon-left'] = true;
                } else if (this.$slots['right-icon']) {
                    style['has-icon-right'] = true;
                } else {
                    style['has-icon'] = true;
                }
                return style;
            },
        },
    };
</script>

<style lang="scss">
    @import '../r-button/r-button.scss';
    @import '../../directives/r-tooltip.scss';
</style>
