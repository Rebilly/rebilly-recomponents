<template>
    <span class="r-component r-badge" :class="classes">
        <slot>Badge</slot>
    </span>
</template>

<script>
    import '../../style/r-badge.css';

    export default {
        name: 'RBadge',
        props: {
            type: {
                type: String,
                default: '',
                validator: val => ['', 'positive', 'negative', 'warning', 'info'].includes(val),
            },
        },
        computed: {
            classes() {
                return {
                    [`r-badge-${this.type}`]: !!this.type,
                };
            },
        },
    };
</script>
