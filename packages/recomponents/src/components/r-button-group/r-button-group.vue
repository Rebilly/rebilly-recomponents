<template>
    <div class="r-button-group" :class="classes" role="group">
        <slot>Apply</slot>
    </div>
</template>

<script>
    export default {
        name: 'RButtonGroup',
        props: {
            fluid: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            classes() {
                return {
                    'r-button-group-fluid': !!this.fluid,
                };
            },
        },
    };
</script>

<style lang="scss">
    @import './r-button-group.scss';
</style>
