<template>
    <span class="r-component r-badge" :class="classes">
        <slot>Badge</slot>
        <r-icon
            v-if="close"
            aria-hidden="true"
            class="r-icon-gray r-badge-icon"
            @click="$emit('close')"
            @keypress.enter.prevent="$emit('close')"
            @mousedown.prevent="$emit('close')"
            icon="close-s"/>
    </span>
</template>

<script>
    import rIcon from '../r-icon/r-icon.vue';

    export default {
        name: 'RBadge',
        components: {rIcon},
        props: {
            /**
             * Changes background color
             */
            type: {
                type: String,
                default: 'default',
            },
            /**
             * Show optional close button
             */
            close: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            classes() {
                const classes = {
                    'r-badge-has-icon-close': !!this.close,
                };
                if (this.type) {
                    classes[`r-badge-${this.type}`] = true;
                } else {
                    classes['r-badge-default'] = true;
                }
                return classes;
            },
        },
    };
</script>

<style lang="scss">
    @import './r-badge.scss';
</style>
