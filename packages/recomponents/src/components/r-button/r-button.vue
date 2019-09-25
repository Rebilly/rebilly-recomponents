<template>
    <router-link
        v-if="!!push"
        class="r-component r-button"
        :class="classes"
        :to="disabled || loading ? '#' : push"
        :disabled="disabled"
        :target="$attrs.href ? '_target' : $attrs.target"
        :event="disabled || loading ? '' : 'click'">
        <slot>Link</slot>
    </router-link>
    <a v-else-if="!!$attrs.href"
       class="r-component r-button"
       :class="classes"
       :href="link"
       :disabled="disabled || loading"
       :target="$attrs.href ? '_target' : $attrs.target || ''"
    >
        <slot>Link</slot>
    </a>
    <button v-else
            class="r-component r-button"
            :class="classes"
            :disabled="disabled || loading"
            v-on="$listeners"
            :title="title"
    >
        <r-icon v-if="loading" icon="loading" class="is-spinning icon-light-gray inline-s"/>
        <slot>Apply</slot>
    </button>
</template>

<script>
    import RIcon from '../r-icon/r-icon.vue';

    export default {
        name: 'RButton',
        components: {RIcon},
        props: {
            size: {
                type: String,
                default: 'regular',
                validator: val => ['small', 'regular', 'large'].includes(val),
            },
            type: {
                type: String,
                default: 'default',
                validator: val => ['default', 'primary', 'danger', 'link'].includes(val),
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            fluid: {
                type: Boolean,
                default: false,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            push: {
                type: [Object, String],
                default: null,
            },
        },
        computed: {
            classes() {
                return {
                    [`r-button--size-${this.size}`]: !!this.size,
                    [`r-button--type-${this.type}`]: !!this.type,
                    'r-button--fluid': !!this.fluid,
                };
            },
            title() {
                if (this.disabled) {
                    return this.$t('disabled');
                }
                if (this.loading) {
                    return this.$t('loading');
                }
                return '';
            },
        },
        i18n: {
            messages: {
                en: {
                    loading: 'Waiting for response',
                    disabled: 'Action is disabled',
                },
                ja: {
                    loading: '応答待ち',
                    disabled: 'アクションは無効です',
                },
            },
        },
        methods: {},
    };
</script>

<style lang="scss">
    @import './r-button.scss';
</style>
