<template>
    <svg class="icon icon-20" @click="bubbleClick">
        <use :xlink:href="iconName" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
    </svg>
</template>

<script>
    export default {
        name: 'r-icon',
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
