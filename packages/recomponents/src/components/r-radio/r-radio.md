# Radio

With radio, you can choose ONLY one of the options in a group

### Radio value and v-model

The `v-model` binds to the `checked` prop, you must set the `v-model` value to the radio's value. 

The types should be `string`, `number`.

### Props

| prop     | type    | required | default value | Description                          |
|--        | --      | --       | --            |                                    --|
| name     | string  | no       | `'default'`   | if the same then they are in a group |
| label    | string  | no       |               | try it in `Knobs` tab                |
| caption  | string  | no       |               | try it in `Knobs` tab                |
| disabled | boolean | no       |               | try it in `Knobs` tab                |
