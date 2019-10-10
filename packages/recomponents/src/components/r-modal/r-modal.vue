<template>
    <transition name="modal" @enter="enter" @leave="leave">
        <div @mousedown="close" tabindex="0" ref="container" @keyup.esc="close" @keyup.enter="submit">
            <div v-if="$slots.content || $slots.contents" class="modal-overlay" :class="{'is-scrollable': scroll}">
                <div class="modal-control" :class="styles" @mousedown="$event.stopPropagation()">
                    <div v-if="title" class="modal-header">
                        <h2>{{title}}</h2>
                        <r-button type="link" class="modal-btn-close" @click="$emit('close')">
                            <r-icon icon="close"/>
                        </r-button>
                    </div>
                    <slot name="contents">
                        <div class="modal-content" :class="{'is-scrollable': scrollContent}">
                            <slot name="content"/>
                        </div>
                    </slot>
                    <div class="modal-actions">
                        <div v-if="$slots['left-actions']">
                            <slot name="left-actions"/>
                        </div>
                        <div class="modal-actions--right equal-widths-elements-mobile">
                            <slot name="right-actions">
                                <r-button :class="{'inline-s': $slots['actions']}" @click="close">
                                    {{cancelLabel}}
                                </r-button>
                                <slot name="actions"/>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="modal-overlay">
                <r-loader class="modal-loader is-loading" :show="true" :loading="true"/>
            </div>
        </div>
    </transition>
</template>

<script>
    import RIconButton from '../r-icon-button/r-icon-button.vue';
    import RIcon from '../r-icon/r-icon.vue';
    import RButton from '../r-button/r-button.vue';
    import RLoader from '../r-loader/r-loader.vue';

    export default {
        name: 'r-modal',
        components: {
            RLoader,
            RButton,
            RIcon,
            RIconButton,
        },
        props: {
            title: {
                type: String,
                default: null,
            },
            cancelLabel: {
                type: String,
                default: 'Cancel',
            },
            size: {
                type: String,
                default: null,
            },
            scroll: {
                type: Boolean,
                default: false,
            },
            scrollContent: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            styles() {
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
                        style[`modal-control-${key}`] = true;
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
            enter() {
                const elContainer = this.$refs.container;
                const currentElFocus = document.activeElement;

                document.body.classList.add('no-scroll');

                if (elContainer !== currentElFocus
                    && !elContainer.contains(currentElFocus)) {
                    elContainer.focus({
                        preventScroll: true,
                    });
                }
                this.$emit('enter');
            },
            leave() {
                document.body.classList.remove('no-scroll');
                this.$emit('leave');
            },
        },
        beforeDestroy() {
            this.leave();
        },
    };
</script>

<style lang="scss">
    @import "./r-modal.scss";
</style>