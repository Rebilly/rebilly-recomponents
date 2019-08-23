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
</style>
