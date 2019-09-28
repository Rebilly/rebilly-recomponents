<template>
    <span class="r-component r-badge" :class="classes">
        <slot name="text">Badge</slot>
        <slot name="actions">
            <template v-if="type === 'tag'">
                <i aria-hidden="true"
                   tabindex="1"
                   @keypress.enter.prevent="$emit('close')"
                   @mousedown.prevent="$emit('close')"
                   class="r-badge--icon-close"></i>
            </template>
        </slot>
    </span>
</template>

<script>
    export default {
        name: 'RBadge',
        props: {
            type: {
                type: String,
                default: 'default',
                validator: val => ['default', 'positive', 'negative', 'warning', 'info', 'tag'].includes(val),
            },
        },
        computed: {
            classes() {
                return {
                    [`r-badge--type-${this.type}`]: !!this.type,
                };
            },
        },
    };
</script>

<style lang="scss">
    @import './r-badge.scss';
</style>
