# Select component


### Props

| Name           | Type     | Default                                             |
|--              | --       |                                                   --|
| allowEmpty     | boolean  | `true`                                              |
| clearOnSelect  | boolean  | `true`                                              |
| closeOnSelect  | boolean  | `true`                                              |
| customLabel    | function | `(option, label) => label ? option[label] : option` |
| disabled       | boolean  | `true`                                              |
| helpText       | string   | `                                                   |
| hideSelected   | boolean  | `false`                                             |
| id             | string   | `() => shortid.generate()`                          |
| internalSearch | boolean  | `true`                                              |
| label          | string   |                                                     |
| limit          | number   | `99999`                                             |
| limitText | function | `(count) => and ${count} more"` |
| loading        | boolean                                   | `false`         |
| max            | [number, boolean]                         | `false`         |
| maxHeight      | number                                    | `300`           |
| multiple       | boolean                                   | `false`         |
| name           | string                                    | `"`             |
| openDirection  | string: `above`, `below`, `top`, `bottom` | `"`             |
| options        | array                                     |                 |
| optionHeight   | number                                    | `40`            |
| preselectFirst | boolean                                   | `false`         |
| preserveSearch | boolean                                   | `false`         |
| placeholder    | string                                    | `Select option` |
| propLabel      | string                                    |                 |
| resetAfter     | boolean                                   | `false`         |
| searchable     | boolean                                   | `true`          |
| showNoOptions  | boolean                                   | `true`          |
| showNoResults  | boolean                                   | `true`          |
| showPointer    | boolean                                   | `true`          |
| tabindex       | number                                    | `0`             |
| taggable       | boolean                                   | `false`         |
| tagPosition    | string: `top`, `bottom`                   | `top`           |
| trackBy        | string                                    |                 |
| value          | [string, array]                           | `[]`            |

### Slots

This component has several slots:
|-------------------|-------------------------------------------------------------------|
| `caret`           | select's caret                                                    |
| `clear`           | icon to clear the input                                           |
| `selection`       | template that shows the selected value(-s)                        |
| `tag`             | template that contains the selected value when multiple is true   |
| `limit`           | text for show how many values are selected when limit is set      |
| `loading`         | something that shows pending                                      |
| `singleLabel`     | template for single selected value                                |
| `placeholder`     | placeholder text                                                  |
| `beforeList`      | additional option on the top of list                              |
| `maxElements`     | text that appears when max quantity of values are selected        |
| `option`          | template for elements of the list                                 |
| `noResult`        | text when no results searched                                     |
| `noOption`        | text when there are no options in the list                        |
| `afterList`       | addition option after all loaded options                          |

### Usage

This component can be used in two modes

#### Webcomponent module

```html
<html>
    <head>
        <meta charset="utf-8">
        <script src="https://unpkg.com/vue"></script>
        <script src="./recomponents.js"></script>
        <link rel="stylesheet" href="./recomponents.css">
    </head>
    <body>
    </body>
    
</html>
```

#### CommonJS module

```html
<template>
    <r-select :options="[1,2,3]"></r-select>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
