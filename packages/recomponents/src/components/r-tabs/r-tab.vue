<template>
    <div v-show='isActive'>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'r-tab',
        props: {
            name: {
                required: true,
            },
            value: String,
            active: {
                type: Boolean,
                default: false,
            },
            to: {
                type: [Object, undefined],
                required: false,
                default: undefined,
            },
        },
        data() {
            return {
                isActive: this.active,
            };
        },
    };
</script>

<style>
</style>
