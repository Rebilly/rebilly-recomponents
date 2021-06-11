<template>
    <div v-if="isVisible"
         class="r-component r-toast"
         :class="classes"
         @mouseenter="disableAutoHide"
         @mouseleave="setupAutoHide">
        <div class="r-toast-title" v-if="!!title">
            <span>{{title}}</span>
        </div>
        <div class="r-toast-close">
            <r-icon v-if="allowClose"
                    @click="hide"
                    aria-hidden="true"
                    color="text"
                    icon="close-s"/>
        </div>
        <div class="r-toast-message" data-cy="Toast Message">
            <component v-if="markup" :is="markup"/>
            <span class="r-toast-message" data-cy="Toast Message" v-else-if="message">{{message}}</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'RToast',
  props: {
    /**
             * Specify toast type according to your theme colors
             */
    type: {
      type: String,
      default: 'positive',
    },
    /**
             * Change the toast title
             */
    title: {
      type: String,
    },
    /**
             * Change the toast message
             */
    message: {
      type: [String, Function],
    },
    /**
             * Specify if the user is allowed to close the toast
             */
    allowClose: {
      type: Boolean,
      default: false,
    },
    /**
             * Specify is the toast visible
             */
    visible: {
      type: Boolean,
      default: true,
    },
    /**
             * Specify does the toast hide
             */
    autoHide: {
      type: Boolean,
      default: true,
    },
    /**
             * Specify a hide delay time, ms
             */
    hideDelay: {
      type: Number,
      default: 5000,
    },
    container: {
      type: [Object, Function, HTMLElement],
      default: null,
    },
  },
  data() {
    return {
      isVisible: true,
      timerHandle: null,
      parent: null,
    };
  },
  beforeMount() {
    this.setupContainer();
  },
  mounted() {
    this.show();
  },
  watch: {
    visible(newValue) {
      this.isVisible = newValue;
    },
    allowHide() {
      this.setupAutoHide();
    },
  },
  computed: {
    classes() {
      return {
        'is-closable': this.allowClose,
        'is-visible': this.isVisible,
        [`r-toast-${this.type}`]: true,
      };
    },
    markup() {
      if (typeof this.message === 'function') {
        return {
          render: this.message,
          props: this.$options.props,
        };
      }

      return null;
    },
  },
  methods: {
    setupContainer() {
      this.parent = document.querySelector('.r-toast-container');
      // No need to create them, they already exists
      if (this.parent) {
        return;
      }
      this.parent = document.createElement('div');
      this.parent.className = 'r-toast-container';
      const container = this.container || document.body;
      container.appendChild(this.parent);
    },
    setupAutoHide() {
      if (this.autoHide) {
        this.timerHandle = setTimeout(() => this.hide(), this.hideDelay);
      } else {
        this.disableAutoHide();
      }
    },
    disableAutoHide() {
      if (!this.timerHandle) {
        return;
      }
      clearTimeout(this.timerHandle);
      this.timerHandle = null;
    },
    show() {
      this.parent.appendChild(this.$el);
      this.isVisible = true;
      this.setupAutoHide();
    },
    hide() {
      this.disableAutoHide();
      this.isVisible = false;
      this.$emit('hide');
    },
  },
};
</script>
<style lang="scss">
    @import './r-toast.scss';
</style>
