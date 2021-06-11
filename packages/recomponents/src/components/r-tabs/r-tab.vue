<template>
    <div :id="tabPanelId"
         role="tabpanel"
         :aria-labelledby="tabId"
         v-if="$slots.default && isActive"
    >
        <slot></slot>
    </div>
</template>

<script>
import shortId from 'shortid';

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
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isActive: this.active,
    };
  },
  computed: {
    accessibilityId() {
      return this.panelId || shortId.generate();
    },
    tabPanelId() {
      return `tabpanel-${this.accessibilityId}`;
    },
    tabId() {
      return `tab-${this.accessibilityId}`;
    },
  },
};
</script>

<style>
</style>
