<template>
  <router-link
    v-if="!!push"
    class="r-component r-btn"
    :to="push"
    v-on="$listeners"
    :class="classes"
    :disabled="disabled"
  >
    <slot>Link</slot>
  </router-link>
  <a
    v-else-if="$attrs.href"
    class="r-component r-btn"
    v-on="$listeners"
    :class="classes"
    :disabled="disabled"
    target="_target"
  >
    <slot>Link</slot>
  </a>
  <button
    v-else
    v-on="$listeners"
    class="r-component r-btn"
    :class="classes"
    :disabled="disabled"
    :title="title"
  >
    <r-icon v-if="loading" icon="loading" class="is-spinning icon-light-gray inline-s"/>
    <slot>Apply</slot>
  </button>
</template>

<script>
    import '../../style/r-button.css';
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
                default: '',
                validator: val => ['', 'primary', 'danger', 'transparent', 'link'].includes(val),
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
                type: Object,
                default: null,
            },
        },
        computed: {
            classes() {
                return {
                    [`r-btn-${this.size}`]: !!this.size,
                    [`r-btn-${this.type}`]: !!this.type,
                    'r-btn-fluid': !!this.fluid,
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

