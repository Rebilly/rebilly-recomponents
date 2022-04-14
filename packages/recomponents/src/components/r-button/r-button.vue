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
        <div v-if="capitalizeFirstLetter" class="r-capitalize-first-letter" role="button">
            <slot>Link</slot>
        </div>
        <slot v-else>Apply</slot>
    </a>
    <button v-else
            class="r-button"
            :class="classes"
            :disabled="disabled || loading"
            v-on="$listeners"
            :title="title"
    >
        <r-icon v-if="loading" icon="loading" class="r-is-spinning r-icon-light-gray r-inline-s"/>
        <div v-if="capitalizeFirstLetter" class="r-capitalize-first-letter" :role="divRole">
            <slot>Apply</slot>
        </div>
        <slot v-else>Apply</slot>
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
                validator: val => ['default', 'primary', 'danger', 'positive', 'link'].includes(val),
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
            /**
             * Capitalize the first letter
             */
            capitalizeFirstLetter: {
                type: Boolean,
                default: true,
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
            divRole() {
                // Only add role=button when the container <button> has an explicit label
                // (explicit title or explicit aria-label)
                // avoiding issues with accessibility and testing library
                return (this.title || this.$attrs['aria-label']) ? 'button' : '';
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
    @import "./r-button.scss";
</style>
