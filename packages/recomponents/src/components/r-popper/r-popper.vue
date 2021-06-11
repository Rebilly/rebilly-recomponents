<template>
    <div class="r-popper"
         :class="{'r-popper-fluid': fluid}"
         v-click-outside="autoHidePopover"
         @keydown.esc="escapePopper">
        <slot name="trigger" :popper="popper"/>
        <div class="r-popper-content-wrapper" ref="popper-content-ref">
            <transition :name="slideFrom">
                <slot name="content" v-if="isPopperVisible" :popper="popper"/>
            </transition>
        </div>
    </div>
</template>

<script>
import shortId from 'shortid';
import '../../directives/r-click-outside/r-click-outside';

const directions = {
  horizontal: {
    bottomStart: [1, 0, 0, 0],
    bottomEnd: [1, 0, 1, -1],
    topStart: [0, -1, 0, 0],
    topEnd: [0, -1, 1, -1],
  },
  vertical: {
    bottomStart: [1, -1, 0, -1],
    bottomEnd: [1, -1, 1, 0],
    topStart: [0, 0, 0, -1],
    topEnd: [0, 0, 1, 0],
  },
};

export default {
  name: 'RPopper',
  props: {
    /**
             * TBD
             */
    state: {
      type: Boolean,
      default: null,
    },
    /**
             * TBD
             */
    escToHide: {
      type: Boolean,
      default: true,
    },
    /**
             * TBD
             */
    autoHide: {
      type: Boolean,
      default: true,
    },
    /**
             * TBD
             */
    globalAutoHide: {
      type: Boolean,
      default: true,
    },
    /**
             * TBD
             */
    closeFunction: {
      type: Function,
      default: null,
    },
    /**
             * TBD
             */
    openOnMount: {
      type: Boolean,
      default: false,
    },
    /**
             * TBD
             */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
             * TBD
             */
    fluid: {
      type: Boolean,
      default: false,
    },
    /**
             * TBD
             */
    offset: {
      type: Number,
      default: 4, // px
    },
    /**
             * Additional offset ignoring popper direction
             */
    margin: {
      type: Array,
      default: () => [0, 0, 0, 0],
    },
    /**
             * TBD
             */
    direction: {
      type: String,
      default: 'horizontal',
      validator: (direction) => ['horizontal', 'vertical'].includes(direction),
    },
    /**
             * TBD
             */
    position: {
      type: String,
      default: 'bottomStart',
      validator: (position) => ['bottomStart', 'bottomEnd', 'topStart', 'topEnd'].includes(position),
    },
    /**
             * transition options:  'fade', 'top', 'bottom', 'left', 'right'
             */
    slideFrom: {
      type: String,
      default: 'fade',
      validator: (slide) => ['fade', 'top', 'bottom', 'left', 'right'].includes(slide),
    },
    /**
             * transition duration
             */
    duration: {
      type: Number,
      default: 0.2,
    },
  },
  watch: {
    state: {
      immediate: true,
      handler(newState) {
        if (newState !== null) {
          this.setPopperVisible(newState);
        }
      },
    },
    activePopper: {
      immediate: true,
      handler(newActivePopper) {
        if (newActivePopper !== null) {
          if (newActivePopper !== this.id && this.globalAutoHide) {
            this.globalAutoHidePopover();
          }
        }
      },
    },
  },
  computed: {
    triggerEl() {
      return this.$el;
    },
    contentEl() {
      return this.$refs['popper-content-ref'];
    },
    /**
             * The actions and properties available to the parent component.
             * @returns {{}} Object of functions and properties
             */
    popper() {
      return {
        isVisible: this.isPopperVisible,
        open: this.openPopper,
        close: this.closePopper,
        toggle: this.togglePopper,
      };
    },
    hideTriggerHeight() {
      return !!this.$slots.trigger;
    },
  },
  data() {
    return {
      id: shortId.generate(),
      hideTimer: null,
      hideDelayMs: 200,
      isPopperVisible: false,
      activePopper: null,
    };
  },
  methods: {
    setActivePopper(value) {
      this.activePopper = value;
      this.$emit('setActivePopper', value);
    },
    async setPopperVisible(visible) {
      if (this.disabled) {
        // disable popper
        return;
      }
      this.isPopperVisible = visible;
      await this.$nextTick(); // await for contentEl to be visible before trying to access it
      if (this.contentEl && this.contentEl.hasChildNodes() && this.contentEl.firstChild.classList) {
        this.contentEl.firstChild.style.transitionDuration = `${this.duration}s`;
        this.positionContent();
      }
      this.$emit('toggle', visible !== this.isPopperVisible);
      this.$emit(visible ? 'toggle-on' : 'toggle-off');
    },
    calculateContentPosition() {
      const triggerRect = this.triggerEl.getBoundingClientRect();
      const contentRect = this.contentEl.childNodes[0].getBoundingClientRect();
      const margins = this.getTriggerMargins();
      const flags = directions[this.direction][this.position];
      let contentTop = (contentRect.height * flags[1]) + (triggerRect.height * flags[0]) - (margins.bottom * flags[0]) - (margins.top * flags[1]);
      let contentLeft = (contentRect.width * flags[3]) + (triggerRect.width * flags[2]) + margins.left;
      if (['bottomEnd', 'topEnd'].includes(this.position)) {
        contentLeft -= margins.right * 2;
      }
      if (this.direction === 'horizontal') {
        contentTop += this.offset;
      } else {
        contentLeft += this.offset;
      }
      return { top: contentTop, left: contentLeft };
    },
    positionContent() {
      const contentPosition = this.calculateContentPosition();
      this.contentEl.childNodes[0].style.top = `${contentPosition.top}px`;
      this.contentEl.childNodes[0].style.left = `${contentPosition.left}px`;
    },
    getTriggerMargins() {
      const trigger = this.triggerEl.childNodes[0];
      const styles = window.getComputedStyle(trigger);
      return {
        top: this.convertPixelsToNumber(styles.marginTop) + this.margin[0],
        right: this.convertPixelsToNumber(styles.marginRight) + this.margin[1],
        bottom: this.convertPixelsToNumber(styles.marginBottom) + this.margin[2],
        left: this.convertPixelsToNumber(styles.marginLeft) + this.margin[3],
      };
    },
    convertPixelsToNumber(value) {
      return parseInt(value.replace('px', ''), 10);
    },
    autoHidePopover() {
      if (this.autoHide && this.isPopperVisible) {
        this.closePopper();
      }
    },
    globalAutoHidePopover() {
      if (this.globalAutoHide && this.isPopperVisible) {
        this.closePopper();
      }
    },
    escapePopper() {
      if (this.escToHide) {
        this.closePopper();
      }
    },
    togglePopper({ delay = null } = {}) {
      if (delay) {
        setTimeout(() => {
          this.setPopperVisible(!this.isPopperVisible);
        }, delay);
      } else {
        this.setPopperVisible(!this.isPopperVisible);
      }
    },
    async closePopper({ delay = null } = {}) {
      if (this.closeFunction !== null) {
        await this.closeFunction();
      }
      if (delay) {
        setTimeout(() => {
          this.setPopperVisible(false);
        }, delay);
      } else {
        this.setPopperVisible(false);
      }
    },
    openPopper({ delay = null } = {}) {
      if (delay) {
        setTimeout(() => {
          this.setPopperVisible(true);
          this.setActivePopper(this.id);
        }, delay);
      } else {
        this.setPopperVisible(true);
        this.setActivePopper(this.id);
      }
    },
    mountPopup() {
      if (this.openOnMount) {
        this.openPopper();
      }
    },
  },
  mounted() {
    this.mountPopup();
  },
  beforeUnmount() {
    if (this.hideTimer) {
      clearInterval(this.hideTimer);
    }

    if (this.activePopper === this.id) {
      this.setActivePopper(null);
    }
  },
};
</script>

<style lang="scss">
    @import '../../styles/animate.scss';
    @import './r-popper.scss';
</style>
