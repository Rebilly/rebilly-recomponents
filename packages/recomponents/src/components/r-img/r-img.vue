<template>
    <figure class="r-component r-img" :style="wrapperStyle" role="img">
        <template v-if="lazy">
            <img v-lazy :data-url="src" :alt="alt" :style="imgStyle" @load="onload" @error="onerror"/>
        </template>
        <template v-else>
            <img :src="src" :alt="alt" :style="imgStyle" @load="onload" @error="onerror"/>
        </template>
        <slot name="loading">
            <div v-show="loading" class="r-img-spinner"/>
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
                type: String,
                default: 'auto',
            },
            /**
             * TBD
             */
            height: {
                type: String,
                default: 'auto',
            },
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
