<template>
    <figure class="r-component r-img">
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
            src: {
                type: String,
                required: true,
            },
            alt: {
                type: String,
                default: 'Recomponents image',
            },
            lazy: {
                type: Boolean,
                default: false,
            },
            size: {
                type: String,
                default: 'small',
            },
        },

        methods: {
            onload() {
                this.$emit('onload');
            },
            onerrror() {
                this.$emit('error');
            },
        },
    };
</script>

<style lang="scss">
    @import './r-img.scss';
</style>
