<template>
    <div class="r-popper" :class="{'r-popper-fluid': fluid}" v-click-outside="autoHidePopover" @keydown.esc="escapePopper">
        <slot name="trigger" :popper="popper"/>
        <div class="r-popper-content-wrapper" ref="popper-content-ref">
            <transition :name="slideFrom" v-if="isPopperVisible">
                <slot name="content" :popper="popper"/>
            </transition>
        </div>
    </div>
</template>

<script>
    import shortId from 'shortid';
    import '../../directives/r-click-outside';

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
        name: 'RDropdown',
        props: {
            state: {
                type: Boolean,
                default: null,
            },
            escToHide: {
                type: Boolean,
                default: true,
            },
            autoHide: {
                type: Boolean,
                default: true,
            },
            globalAutoHide: {
                type: Boolean,
                default: true,
            },
            closeFunction: {
                type: Function,
                default: null,
            },
            openOnMount: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            fluid: {
                type: Boolean,
                default: false,
            },
            offset: {
                type: Number,
                default: 4, // px
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator: direction => ['horizontal', 'vertical'].includes(direction),
            },
            position: {
                type: String,
                default: 'bottomStart',
                validator: position => ['bottomStart', 'bottomEnd', 'topStart', 'topEnd'].includes(position),
            },
            slideFrom: {
                type: String,
                default: 'fade',
                validator: slide => ['fade', 'top', 'bottom', 'left', 'right'].includes(slide),
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
                return !!this.$scopedSlots.trigger;
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
                if (this.contentEl && this.contentEl.hasChildNodes()) {
                    if (this.contentEl.firstChild.classList) {
                        if (visible) {
                            this.contentEl.firstChild.classList.add('is-visible');
                            this.positionContent();
                        } else {
                            this.contentEl.firstChild.classList.remove('is-visible');
                        }
                    }
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
                return {top: contentTop, left: contentLeft};
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
                    top: this.convertPixelsToNumber(styles.marginTop),
                    left: this.convertPixelsToNumber(styles.marginLeft),
                    right: this.convertPixelsToNumber(styles.marginRight),
                    bottom: this.convertPixelsToNumber(styles.marginBottom),
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
            togglePopper({delay = null} = {}) {
                if (delay) {
                    setTimeout(() => {
                        this.setPopperVisible(!this.isPopperVisible);
                    }, delay);
                } else {
                    this.setPopperVisible(!this.isPopperVisible);
                }
            },
            async closePopper({delay = null} = {}) {
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
            openPopper({delay = null} = {}) {
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
        beforeDestroy() {
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
    @import './r-dropdown.scss';
</style>
