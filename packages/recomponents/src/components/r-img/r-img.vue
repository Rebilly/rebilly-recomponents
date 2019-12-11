<template>
    <figure class="r-component r-img" :style="{minHeight: height + 'px', minWidth: width + 'px'}" role="img">
        <template v-if="lazy">
            <img v-lazy :data-url="src" :alt="alt"/>
        </template>
        <template v-else>
            <img :src="src" :alt="alt"/>
        </template>
    </figure>
</template>

<script>
    import '../../directives/r-lazy';

    export default {
        name: 'RImg',

        props: {
            /**
             * TBD
             */
            src: {
                type: String,
                required: true,
            },
            /**
             * TBD
             */
            alt: {
                type: String,
                default: 'Recomponents image',
            },
            /**
             * TBD
             */
            lazy: {
                type: Boolean,
                default: false,
            },
            /**
             * TBD
             */
            width: {
                type: Number,
                default: 0,
            },
            /**
             * TBD
             */
            height: {
                type: Number,
                default: 0,
            },
        },

        methods: {
            onload() {
                this.$emit('onload');
            },
            onerror() {
                this.$emit('error');
            },
        },
    };
</script>

<style lang="scss">
    @import './r-img.scss';
</style>
