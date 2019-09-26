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
|---------------|
| `caret`       |
| `clear`       |
| `selection`   |
| `tag`         |
| `custom-tag`  |
| `limit`       |
| `loading`     |
| `singleLabel` |
| `placeholder` |
| `beforeList`  |
| `maxElements` |
| `option`      |
| `noResult`    |
| `noOption`    |
| `afterList`   |

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
