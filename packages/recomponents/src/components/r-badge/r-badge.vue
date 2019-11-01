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
            type: {
                type: String,
                default: 'default',
                validator: val => [
                    'default',
                    'positive',
                    'negative',
                    'warning',
                    'info',
                    'tag',
                    'tag-secondary',
                ].includes(val),
            },
            close: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            classes() {
                return {
                    'has-icon-close': !!this.close,
                    [`r-badge-${this.type}`]: !!this.type,
                };
            },
        },
    };
</script>

<style lang="scss">
    @import './r-badge.scss';
</style>
