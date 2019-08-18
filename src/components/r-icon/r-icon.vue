<template>
    <svg class="icon icon-20" @click="bubbleClick">
        <r-icon-sprites/>
        <use :xlink:href="iconName" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
    </svg>
</template>

<script>
    import rIconSprites from './r-icon-sprites.vue';

    export default {
        name: 'r-icon',
        components: {rIconSprites},
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
            isIconSpritesLoaded() {
                return document.getElementsByClassName('svg-sprites').length > 0;
            },
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
