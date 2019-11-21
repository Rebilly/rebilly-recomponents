<template>
    <svg class="r-icon r-icon-20" @click="bubbleClick" :class="classes">
        <use :xlink:href="iconName" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
    </svg>
</template>

<script>
    import RIconSprites from './r-icon-sprites';

    export default {
        name: 'RIcon',
        props: {
            icon: {
                type: String,
                default: null,
            },
            color: {
                type: String,
                default: null,
                validator: val => [
                    'brand',
                    'text',
                    'muted',
                    'gray',
                    'light-gray',
                    'faint-gray',
                    'blue',
                    'light-blue',
                    'yellow',
                    'light-yellow',
                    'red',
                    'light-red',
                    'green',
                    'light-green',
                    'accent',
                    'background',
                    'light-background',
                    'dark-background',
                ].includes(val),
            },
            stopPropagation: {
                type: Boolean,
                default: false,
            },
        },
        mounted() {
            if (!document.getElementById('icon-heart')) {
                const spritesDiv = document.createElement('div');
                spritesDiv.style.display = 'none';
                spritesDiv.innerHTML = RIconSprites;
                document.body.appendChild(spritesDiv);
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.icon}`;
            },
            classes() {
                return {
                    [`r-icon-${this.color}`]: !!this.color,
                };
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
