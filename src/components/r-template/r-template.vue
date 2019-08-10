<template>
    <div class="alert alert-primary" role="alert" v-if="show">
        <p>{{ $t("message") }}</p>
        <p>{{text}}</p>
        <button @click="close">
            close
        </button>
    </div>
</template>

<script>
export default {
  name: 'RTemplate',
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    text: {
      type: String,
      default: '',
    },
  },
  i18n: {
    messages: {
      en: { message: 'Here is translated message' },
      ja: { message: 'ここに翻訳されたメッセージがあります' },
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
    .alert {
        margin: 1rem;
        padding: 1rem;
        background: #bce8f1;

        &--success {
            background: #dff0d8;
            border-color: #d6e9c6;
        }

        &--danger {
            background: #fcf8e3;
            border-color: #ebccd1;
        }

        &--warning {
            background: #fcf8e3;
            border-color: #faebcc;
        }
    }
</style>
