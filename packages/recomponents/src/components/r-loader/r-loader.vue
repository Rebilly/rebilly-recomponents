<template>
    <div class="r-component r-loader" v-if="show" :class="classes">
        <div class="r-loader-wrapper">
            <div class="r-mr-re"></div>
            <div class="r-mr-bil"></div>
            <div class="r-mr-ly"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RLoader',

        props: {
            show: {
                type: Boolean,
                default: true,
            },
            loading: {
                type: Boolean,
                default: true,
            },
            fullscreen: {
                type: Boolean,
                default: true,
            },
        },

        computed: {
            classes() {
                return {
                    'r-loader--loading': !!this.loading,
                    'r-loader--fullscreen': !!this.fullscreen,
                };
            },
        },
    };
</script>

<style lang="scss">
    @import './r-loader.scss';
</style>
