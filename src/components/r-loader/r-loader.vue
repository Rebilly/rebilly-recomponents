<template>
    <div class="r-component r-loader" :class="classes" v-if="show">
        <div class="wrapper">
            <div class="mr-re"></div>
            <div class="mr-bil"></div>
            <div class="mr-ly"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'r-loader',

        props: {
            show: {
                type: Boolean,
                default: false,
            },
            loading: {
                type: Boolean,
                default: true,
            },
            fullscreen: {
                type: Boolean,
                default: false,
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
</style>
