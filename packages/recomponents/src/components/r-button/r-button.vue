<template>
    <a v-if="isLink"
       role="button"
       class="r-button"
       :class="classes"
       :href="link"
       :disabled="disabled || loading"
       :target="$attrs.href ? '_target' : $attrs.target || ''"
    >
        <!-- @slot Text content inside button  -->
        <div class="capitalize-the-first-letter">
            <slot>Link</slot>
        </div>
    </a>
    <button v-else
            role="button"
            class="r-button"
            :class="classes"
            :disabled="disabled || loading"
            v-on="$listeners"
            :title="title"
    >
        <r-icon v-if="loading" icon="loading" class="r-is-spinning r-icon-light-gray r-inline-s"/>
        <div class="capitalize-the-first-letter">
            <slot>Apply</slot>
        </div>
    </button>
</template>

<script>
    import RIcon from '../r-icon/r-icon.vue';

    // TODO: button type link disabled property doesn't work (hide target, hide link, fix css)
    // TODO prefixes icon classes "r-is-spinning icon-light-gray r-inline-s"
    export default {
        name: 'RButton',
        components: {RIcon},
        props: {
            /**
             * Specify button size
             */
            size: {
                type: String,
                default: 'regular',
                validator: val => ['small', 'regular', 'large'].includes(val),
            },
            /**
             * Specify button type according to your theme colors
             */
            type: {
                type: String,
                default: 'default',
                validator: val => ['default', 'primary', 'danger', 'link'].includes(val),
            },
            /**
             * Disabled state just like for regular html button
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Active state just like for regular button
             */
            active: {
                type: Boolean,
                default: false,
            },
            /**
             * Make button full width
             */
            fluid: {
                type: Boolean,
                default: false,
            },
            /**
             * Append loading spinner to button
             */
            loading: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            isLink() {
                return !!this.$attrs.href && this.type === 'link';
            },
            classes() {
                return {
                    [`r-button-size-${this.size}`]: !!this.size,
                    [`r-button-type-${this.type}`]: !!this.type,
                    'r-button-fluid': !!this.fluid,
                    'r-is-active': !!this.active,
                };
            },
            title() {
                if (this.disabled) {
                    return this.messages.disabled;
                }
                if (this.loading) {
                    return this.messages.loading;
                }
                return '';
            },
        },
        data() {
            return {
                messages: {
                    loading: 'Waiting for response',
                    disabled: 'Action is disabled',
                },
            };
        },
        methods: {},
    };
</script>

<style lang="scss">
    @import './r-button.scss';
</style>
