<template>
    <div class="r-component r-tile">
        <div class="r-tile__title" v-if="$slots.title">
            <slot name="title"/>
        </div>
        <div class="r-tile__content r-tile__content--primary" v-if="$slots.primary">
            <slot name="primary"/>
        </div>
        <div class="r-tile__content r-tile__content--secondary" v-if="$slots.secondary">
            <slot name="secondary"/>
        </div>
        <div class="r-tile__actions" v-if="$slots.actions">
            <slot name="actions"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'r-tile',
    };
</script>

<style lang="scss">
    .r-tile {
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0 0 0 1px var(--muted-color), 0 1px 2px 0 var(--muted-color), 0 4px 4px 0 var(--muted-color);
        border-radius: $border-radius;
    }

    .r-tile__title {
        display: flex;
        @include rem(padding, $space-default $space-default 0 $space-default);

        & h1, & h2, & h3, & h4, & h5 {
            @include rem(padding-right, $space-default);
            margin: 0;
        }

        &:first-child {
            border-top: none;
            border-radius: $border-radius $border-radius 0 0;
        }
    }

    .r-tile__subtitle {
        display: flex;
        @include rem(padding-bottom, $space-default);
    }

    .r-tile__title > *,
    .r-tile__subtitle > * {
        margin: 0;
        flex: 1 0 50%;
        min-width: 0;
    }

    .r-tile__content {
        @include rem(padding, $space-default);
        border-bottom: 1px solid $faint-gray;

        & p, & ul, & ol, & pre, & table, & blockquote, & h1, & h2, & h3, & h4, & h5, & h6 {
            margin: 0;

            & + * {
                margin-top: 1rem;
            }
        }

        &:last-child {
            border: none;
            border-radius: 0 0 $border-radius $border-radius;
        }
    }

    .r-tile__content--secondary {
        background: $light-background;
        box-shadow: 0 0 0 .5px var(--muted-color) inset;
    }

    .r-tile__actions {
        @include rem(padding, $space-default);
        text-align: right;

        & > * {
            margin-left: 1rem;
        }
    }
</style>
