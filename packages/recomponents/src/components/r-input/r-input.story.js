import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {text, select, boolean} from '@storybook/addon-knobs';
import markdown from './r-input.md';

storiesOf('Components', module)
    .add('Input', () => ({
        template: `
            <r-input
                v-model="model"
                :label="label"
                :disabled="disabled"
                :placeholder="placeholder"
                :helpText="helpText"
                :multiline="multiline"
                :submitOnEnter="submitOnEnter"
                :validate="validate"
                :leftIcon="leftIcon"
                :leftIconClickPointer="leftIconClickPointer"
                :leftIconSpinning="leftIconSpinning"
                :rightIcon="rightIcon"
                :rightIconClickPointer="rightIconClickPointer"
                :rightIconSpinning="rightIconSpinning"
                :leftLabel="leftLabel"
                :rightLabel="rightLabel"
                :password="password"
                :numeric="numeric"
                :rows="rows"
                :autoFocus="autoFocus"
                :autoHighlight="autoHighlight"
                :maxLength="maxLength"
                :autoResize="autoResize"
                :autoComplete="autoComplete"
                @focus="focus"
                @click="click"
                @input="input"
                @key-submit="keySubmit"
                @key-press="keyPress"
                @key-down="keyDown"
                />
        `,
        methods: {
            focus: action('focus'),
            click: action('click'),
            input: action('input'),
            keySubmit: action('keySubmit'),
            keyPress: action('keyPress'),
            keyDown: action('keyDown'),
        },
        props: {
            label: {
                default: text('label', 'Label', 'Text'),
            },
            disabled: {
                default: boolean('disabled', false, 'State'),
            },
            validate: {
                default: select('validate', {
                    valid: {
                        $dirty: false,
                        $invalid: false,
                    },
                    dirty: {
                        $dirty: true,
                        $invalid: false,
                    },
                    invalid: {
                        $dirty: true,
                        $invalid: true,
                    },
                }, {
                    $dirty: false,
                    $invalid: false,
                }, 'State'),
            },
            placeholder: {
                default: text('placeholder', 'Please input value here', 'Text'),
            },
            helpText: {
                default: text('helpText', 'Help text here to explain something', 'Text'),
            },
            multiline: {
                default: boolean('multiline', false),
            },
            submitOnEnter: {
                default: boolean('submitOnEnter', false),
            },
            leftIcon: {
                default: select('leftIcon', ['', 'search', 'customers', 'lock', 'burger'], '', 'Icons'),
            },
            leftIconClickPointer: {
                default: boolean('leftIconClickPointer', false, 'Icons'),
            },
            leftIconSpinning: {
                default: boolean('leftIconSpinning', false, 'Icons'),
            },
            rightIcon: {
                default: select('rightIcon', ['', 'search', 'customers', 'lock', 'burger'], '', 'Icons'),
            },
            rightIconClickPointer: {
                default: boolean('rightIconClickPointer', false, 'Icons'),
            },
            rightIconSpinning: {
                default: boolean('rightIconSpinning', false, 'Icons'),
            },
            leftLabel: {
                default: select('leftLabel', ['', 'left label'], '', 'Icons'),
            },
            rightLabel: {
                default: select('rightLabel', ['', 'right label'], '', 'Icons'),
            },
            password: {
                default: boolean('password', false),
            },
            numeric: {
                default: boolean('numeric', false),
            },
            rows: {
                default: text('rows', '5'),
            },
            autoFocus: {
                default: boolean('autoFocus', false),
            },
            autoHighlight: {
                default: boolean('autoHighlight', false),
            },
            maxLength: {
                // TODO: bug? it could be saying: '(-4 characters left.)' if multiline is false
                default: select('maxLength', [null, 15, 50], null),
            },
            autoResize: {
                default: boolean('autoResize', false),
            },
            autoComplete: {
                default: text('autoComplete', ''),
            },
        },
        data: () => ({
            model: 'value here',
        }),
    }), {
        notes: {markdown},
    });
