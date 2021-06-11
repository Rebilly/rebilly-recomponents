<template>
    <div class="r-component r-tile">
        <div class="r-tile-title" v-if="$slots.title">
            <slot name="title"/>
            <div class="r-tile-title--actions r-no-flex" v-if="$slots.titleActions">
                <slot name="titleActions"/>
            </div>
        </div>
        <div class="r-tile-content" v-if="$slots.contents">
            <slot name="contents"/>
        </div>
        <div class="r-tile-content r-tile-content-is-primary" v-if="$slots.primary">
            <slot name="primary"/>
        </div>
        <div class="r-tile-content r-tile-content-is-secondary" v-if="$slots.secondary">
            <slot name="secondary"/>
        </div>
        <div class="r-tile-actions" v-if="$slots.actions">
            <slot name="actions"/>
        </div>
    </div>
</template>

<script>
import '../../directives/r-content/r-content';

export default {
  name: 'RTile',
};
</script>

<style lang="scss">
    @import './r-tile.scss';
</style>
