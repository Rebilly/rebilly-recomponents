<template>
    <span class="r-component r-badge" :class="classes">
        <slot>Badge</slot>
    </span>
</template>

<script>
    import './r-badge.scss';

    export default {
        name: 'RBadge',
        props: {
            type: {
                type: String,
                default: 'default',
                validator: val => ['default', 'positive', 'negative', 'warning', 'info'].includes(val),
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
