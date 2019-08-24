<template>
    <button
        v-on="$listeners"
        class="btn"
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
        name: 'r-icon-button',
        props: {
            type: {
                type: String,
                default: null,
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
                if (this.type) {
                    style[`btn-${this.type}`] = true;
                }
                if (this.size) {
                    let key;
                    if (this.size === 'small') {
                        key = 's';
                    } else if (this.size === 'large') {
                        key = 'l';
                    }
                    if (key) {
                        style[`btn-${key}`] = true;
                    }
                }
                if (this.fluid) {
                    style['btn-fluid'] = true;
                }
                if (this.fitted) {
                    style['btn-fitted'] = true;
                }
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
