<template>
    <div :id="computedPanelId"
         role="tabpanel"
         :aria-labelledby="computedControlId"
         v-if="$slots.default"
         v-show="isActive"
    >
        <slot></slot>
    </div>
</template>

<script>
import { generateControlId, generatePanelId } from './id-helpers';

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
                return this.panelId || generatePanelId(this._uid);
            },
            computedControlId() {
                return generateControlId(this.computedPanelId);
            },
        },
    };
</script>

<style>
</style>
