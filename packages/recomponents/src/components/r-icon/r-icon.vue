<template>
    <svg class="r-icon r-icon-20" @click="bubbleClick">
        <use :xlink:href="iconName" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
    </svg>
</template>

<script>
    import Vue from 'vue';
    import RIconSprites from './r-icon-sprites';

    Vue.use(RIconSprites().install);
    export default {
        name: 'RIcon',
        props: {
            icon: {
                type: String,
                default: null,
            },
            stopPropagation: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            iconName() {
                return `#icon-${this.icon}`;
            },
        },
        methods: {
            bubbleClick(evt) {
                if (this.stopPropagation) {
                    evt.stopPropagation();
                }
                this.$emit('click', evt);
            },
        },
    };
</script>

<style lang="scss">
    @import './r-icon.scss';
</style>
