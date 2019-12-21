<template>
    <div class="r-component r-toast"
         :class="classes"
         @mouseenter="disableAutoHide"
         @mouseleave="setupAutoHide">
        <h2 class="r-toast-title stack-m" v-if="!!title">{{title}}</h2>
        <r-icon v-if="allowClose"
                aria-hidden="true"
                class="r-icon-gray r-toast-close"
                @click="hide"
                icon="close-s"/>
        <span class="r-toast-message" data-cy="Toast Message" v-if="message">{{message}}</span>
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
                type: String,
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
                default: false,
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
        },
        data() {
            return {
                isVisible: false,
                timerHandle: null,
            };
        },
        created() {
            this.isVisible = this.visible;
            this.setupAutoHide();
        },
        watch: {
            visible(newValue) {
                this.isVisible = newValue;
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
        },
        methods: {
            setupAutoHide() {
                if (this.autoHide) {
                    this.timerHandle = setTimeout(() => this.hide(), this.hideDelay);
                }
            },
            disableAutoHide() {
                if (!this.timerHandle) {
                    return;
                }
                clearTimeout(this.timerHandle);
                this.timerHandle = null;
            },
            hide() {
                this.disableAutoHide();
                this.isVisible = false;
                this.$emit('hide');
            }
        },
    };
</script>
<style lang="scss">
    @import './r-toast.scss';
</style>
