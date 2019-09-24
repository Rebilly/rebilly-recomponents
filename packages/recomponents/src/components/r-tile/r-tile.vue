<template>
    <div class="r-component r-tile">
        <div class="r-tile__title" v-if="$slots.title">
            <slot name="title"/>
            <div class="r-tile__title--actions no-flex" v-if="$slots.titleActions">
                <slot name="titleActions"/>
            </div>
        </div>
        <div class="r-tile__content" v-if="$slots.contents">
            <slot name="contents"/>
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
    import '../../directives/r-content';

    export default {
        name: 'RTile',
    };
</script>

<style lang="scss">
    @import './r-tile.scss';
</style>
