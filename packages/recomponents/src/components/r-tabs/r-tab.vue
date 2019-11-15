<template>
    <div :id="computedPanelId"
         role="tabpanel"
         :aria-labelledby="computedPanelId + '-control'"
         v-if="$slots.default"
         v-show="isActive"
    >
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
            panelId: String,
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
        computed: {
            computedPanelId() {
                return this.panelId || `tab-${this._uid}`;
            }
        },
    };
</script>

<style>
</style>
