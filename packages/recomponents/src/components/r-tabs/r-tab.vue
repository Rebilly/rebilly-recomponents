<template>
    <div :id="computedPanelId"
         role="tabpanel"
         :aria-labelledby="computedTabId"
         v-if="$slots.default"
         v-show="isActive"
    >
        <slot></slot>
    </div>
</template>

<script>
    /* eslint-disable no-underscore-dangle */
    import {generateTabId, generatePanelId} from './id-helpers';

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
            computedAccessibilityId() {
                return this.panelId || this._uid;
            },
            computedPanelId() {
                return generatePanelId(this.computedAccessibilityId);
            },
            computedTabId() {
                return generateTabId(this.computedAccessibilityId);
            },
        },
    };
</script>

<style>
</style>
