<template>
    <transition name="r-modal" @appear="appear" @enter="enter" @leave="leave">
        <div @mousedown="close"
             tabindex="0"
             ref="container"
             @keyup.esc="close"
             @keyup.enter="submit"
             role="dialog"
             :style="transitionDuration"
             :aria-label="title">
            <div v-if="$slots.content || $slots.contents"
                 class="r-modal-overlay"
                 :class="{'r-is-scrollable': scroll}">
                <div class="r-modal-control"
                     :style="transitionDuration"
                     :class="classes"
                     @mousedown="$event.stopPropagation()">
                    <div v-if="title" class="r-modal-header">
                        <h2 class="r-inline-s">
                            {{title}}
                        </h2>
                        <div
                            v-if="$slots['header-actions']"
                            class="r-ml-auto r-inline-s">
                            <slot name="header-actions"/>
                        </div>
                        <r-button
                            type="link"
                            class="r-modal-btn-close"
                            @click="$emit('close')"
                            aria-label="close">
                            <r-icon icon="close"/>
                        </r-button>
                    </div>
                    <slot name="contents">
                        <div class="r-modal-content" :class="{'r-is-scrollable': scrollContent}">
                            <slot name="content"/>
                        </div>
                    </slot>
                    <div class="r-modal-actions">
                        <div v-if="$slots['left-actions']">
                            <slot name="left-actions"/>
                        </div>
                        <div class="r-modal-actions--right equal-widths-elements-mobile">
                            <slot name="right-actions">
                                <r-button
                                        :class="{'r-inline-s': $slots['actions']}"
                                        @click="close" aria-label="close">
                                    {{cancelLabel}}
                                </r-button>
                                <slot name="actions"/>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="r-modal-overlay">
                <r-loader class="r-modal-loader r-is-loading" :show="true" :loading="true"/>
            </div>
        </div>
    </transition>
</template>

<script>
import RIconButton from '../r-icon-button/r-icon-button.vue';
import RIcon from '../r-icon/r-icon.vue';
import RButton from '../r-button/r-button.vue';
import RLoader from '../r-loader/r-loader.vue';

// TODO: class prefix equal-widths-elements-mobile, r-is-loading
export default {
  name: 'r-modal',
  components: {
    RLoader,
    RButton,
    RIcon,
    RIconButton,
  },
  props: {
    /**
             * TBD
             */
    title: {
      type: String,
      default: null,
    },
    /**
             * TBD
             */
    cancelLabel: {
      type: String,
      default: 'Cancel',
    },
    /**
             * TBD
             */
    size: {
      type: String,
      default: null,
    },
    /**
             * TBD
             */
    scroll: {
      type: Boolean,
      default: false,
    },
    /**
             * TBD
             */
    scrollContent: {
      type: Boolean,
      default: false,
    },
    /**
             * transition duration
             */
    duration: {
      type: Number,
      default: 0.2,
    },
  },
  computed: {
    transitionDuration() {
      return {
        'transition-duration': `${this.duration}s`,
      };
    },
    classes() {
      const style = {};
      if (this.size) {
        let key;
        if (this.size === 'large') {
          key = 'l';
        } else if (this.size === 'extra-large') {
          key = 'xl';
        } else if (this.size === 'fluid') {
          key = 'fluid';
        }
        if (key) {
          style[`r-modal-control-${key}`] = true;
        }
      }
      return style;
    },
  },
  methods: {
    submit() {
      this.$emit('submit');
    },
    close() {
      this.$emit('close');
    },
    /**
             * Assures that the modal container is focused Or at least
             * an element inside it. So key events can be captured.
             * The focus works on the DIV because tabindex attribute see:
             * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
             */
    focus() {
      const elContainer = this.$refs.container;
      const currentElFocus = document.activeElement;

      // TODO styles no-scroll
      if (elContainer.style.display !== 'none') {
        document.body.classList.add('r-no-scroll');
      }

      if (elContainer !== currentElFocus
                    && !elContainer.contains(currentElFocus)) {
        elContainer.focus({
          preventScroll: true,
        });
      }
    },
    enter() {
      this.focus();
      this.$emit('enter');
    },
    appear() {
      this.focus();
      this.$emit('appear');
    },
    leave() {
      // TODO styles no-scroll
      document.body.classList.remove('r-no-scroll');
      this.$emit('leave');
    },
  },
  beforeUnmount() {
    this.leave();
  },
};
</script>

<style lang="scss">
    @import "./r-modal.scss";
</style>
