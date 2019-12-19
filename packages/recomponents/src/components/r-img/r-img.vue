<template>
    <figure class="r-component r-img" :style="wrapperStyle" role="img">
        <template v-if="lazy">
            <img v-lazy :data-url="src" :alt="alt" :style="imgStyle" @load="onload" @error="onerror"/>
        </template>
        <template v-else>
            <img :src="src" :alt="alt" :style="imgStyle" @load="onload" @error="onerror"/>
        </template>
        <slot name="loading">
            <div v-show="loading" class="r-img-loading-spinner"/>
        </slot>
    </figure>
</template>

<script>
    import '../../directives/r-lazy';

    export default {
        name: 'RImg',
        data() {
            return {
                loading: true,
            };
        },
        props: {
            /**
             * Input the source URL
             */
            src: {
                type: String,
                required: true,
            },
            /**
             * Input the alternative text for the image
             */
            alt: {
                type: String,
                default: 'Image',
            },
            /**
             * Make the image lazy loaded
             */
            lazy: {
                type: Boolean,
                default: false,
            },
            /**
             * Specify image width
             */
            width: {
                type: String,
            },
            /**
             * Specify image height
             */
            height: {
                type: String,
            },
            /**
             * Specify image aspect ratio (e.g. '9/16')
             */
            aspectRatio: {
                type: String,
            },
        },
        computed: {
            imgStyle() {
                return {height: this.height, width: this.width};
            },
            wrapperStyle() {
                if (this.aspectRatio) {
                    return {
                        '--img-aspect-ratio': `calc(${this.aspectRatio} * 100%)`,
                    };
                }

                return {height: this.height, width: this.width};
            },
        },
        methods: {
            onload() {
                this.loading = false;
                this.$emit('onload');
            },
            onerror() {
                this.loading = false;
                this.$emit('onerror');
            },
        },
    };
</script>

<style lang="scss">
    @import './r-img.scss';
</style>
