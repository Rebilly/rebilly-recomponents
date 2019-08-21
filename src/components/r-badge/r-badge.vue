<template>
    <span class="r-component r-badge" :class="classes">
        <slot>Badge</slot>
    </span>
</template>

<script>
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

<style lang="scss">
    .r-badge {
        display: inline-block;
        height: auto;
        box-sizing: border-box;
        text-transform: none;
        text-align: center;
        vertical-align: baseline;
        color: var(--text-color);
        border-radius: $line-height;
        border: none;
        @include rem(padding, $space-xxs $space-s);
        font-family: var(--primary-font-stack);
        font-weight: $regular;
        @include rem(font-size, $paragraph);
        @include rem(line-height, $line-height);
        outline: none;
        white-space: nowrap;
        box-shadow: 0 0 0 2px #FFFFFF;

        &--type-default {
            background: var(--faint-gray-color);
        }

        &--type-positive {
            background: var(--light-green-color);
        }

        &--type-negative {
            background: var(--light-red-color);
        }

        &--type-warning {
            background: var(--light-yellow-color);
        }

        &--type-info {
            background: var(--light-blue-color);
        }
    }
</style>
