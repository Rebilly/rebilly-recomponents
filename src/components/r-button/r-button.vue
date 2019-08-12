<template>
    <button
        class="r-button"
        :class="classes"
        :disabled="disabled"
        :title="title"
        @click="click"
        @focus="focus"
        @blur="blur"
    >
        <slot>Apply</slot>
    </button>
</template>

<script>
export default {
  name: 'RButton',
  props: {
    size: {
      type: String,
      default: 'regular',
      validator: val => ['small', 'regular', 'large'].includes(val),
    },
    type: {
      type: String,
      default: 'default',
      validator: val => ['default', 'primary', 'warning', 'danger'].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        [`r-button--size-${this.size}`]: !!this.size,
        [`r-button--type-${this.type}`]: !!this.type,
      };
    },
    title() {
      if (this.disabled) {
        return this.$t('disabled');
      } if (this.loading) {
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
  methods: {
    click($event) {
      this.$emit('click', $event);
    },
    focus($event) {
      this.$emit('focus', $event);
    },
    blur($event) {
      this.$emit('blur', $event);
    },
  },
};
</script>

<style lang="scss">
    .r-button {
        display: inline-block;
        height: auto;
        box-sizing: border-box;
        text-transform: capitalize;
        text-align: center;
        vertical-align: baseline;
        user-select: none;
        appearance: none;
        font-family: var(--primary-font-stack);
        font-weight: $regular;
        font-size: 1.4rem;
        line-height: 2rem;
        border-radius: $border-radius;
        border: none;
        cursor: pointer;
        outline: none;
        transition: box-shadow .15s ease;

        &--size-small {
            padding: 0.4rem 1.6rem;
        }

        &--size-regular {
            padding: 0.8rem 1.6rem;
        }

        &--size-large {
            padding: 1.6rem 3.2rem;
        }

        &--type-default {
            background: linear-gradient(180deg,#fff 0,var(--background-color));
            color: var(--text-color);
            box-shadow: 0 0 0 1px $light-gray inset, 0 1px 2px 0 rgba($gray, 0.3);

            &:hover {
                background: var(--background-color);
            }

            &:focus {
                box-shadow: 0 0 0 1px var(--primary-color) inset, 0 0 0 1px var(--primary-color);
            }

            &:active {
                background: var(--background-color);
                box-shadow: 0 0 0 1px $light-gray inset, 0 1px 3px 1px $light-gray inset;
            }

            &[disabled] {
                opacity: 0.5;
                cursor: auto;

                &:hover {
                    background: linear-gradient(to bottom, #FFFFFF 0%, var(--background-color) 100%);
                }

                &:active {
                    box-shadow: 0 0 0 1px $light-gray inset, 0 1px 2px 0 rgba($gray, 0.3);
                }
            }
        }

        &--type-primary {
            background: linear-gradient(to bottom, var(--primary-color) 0%, var(--primary-color-light) 100%);
            color: #FFFFFF;
            box-shadow: 0 1px 2px 0 rgba($gray, 0.8);

            &:hover {
                background: var(--primary-color-light);
            }

            &:focus {
                box-shadow: 0 0 0 1px var(--primary-color-dark) inset, 0 0 0 1px var(--primary-color-dark);
            }

            &:active {
                background: #3000D7;
                box-shadow: 0 1px 3px 1px darken($blue, 10) inset;
            }

            &[disabled] {
                opacity: 0.5;
                cursor: auto;

                &:hover,
                &:active {
                    background: linear-gradient(to bottom, var(--primary-color) 0%, var(--primary-color-light) 100%);
                }
            }
        }

        &--type-warning {
            background: linear-gradient(to bottom, saturate($yellow, 50) 0%, var(--warning-color) 100%);
            color: #FFFFFF;
            box-shadow: 0 1px 2px 0 rgba($gray, 0.8);

            &:hover {
                background: darken($yellow, 5);
            }

            &:focus {
                box-shadow: 0 0 0 1px darken($yellow, 20) inset, 0 0 0 1px darken($yellow, 20);
            }

            &:active {
                background: darken($yellow, 10);
                box-shadow: 0 1px 3px 1px darken($yellow, 20) inset;
            }

            &[disabled] {
                opacity: 0.5;
                cursor: auto;

                &:hover,
                &:active {
                    background: linear-gradient(to bottom, saturate($yellow, 50) 0%, var(--warning-color) 100%);
                }
            }
        }

        &--type-danger {
            background: linear-gradient(to bottom, saturate($red, 50) 0%, $red 100%);
            color: #FFFFFF;
            box-shadow: 0 1px 2px 0 rgba($gray, 0.8);

            &:hover {
                background: darken($red, 5);
            }

            &:focus {
                box-shadow: 0 0 0 1px darken($red, 20) inset, 0 0 0 1px darken($red, 20);
            }

            &:active {
                background: darken($red, 10);
                box-shadow: 0 1px 3px 1px darken($red, 20) inset;
            }

            &[disabled] {
                opacity: 0.5;
                cursor: auto;

                &:hover,
                &:active {
                    background: linear-gradient(to bottom, saturate($red, 50) 0%, $red 100%);
                }
            }
        }
    }
</style>
