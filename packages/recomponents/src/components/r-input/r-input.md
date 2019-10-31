# Input

Enhancement for basic input, with style, label and so on.

### v-model

| prop  | event |
|--     |     --|
| value | input |

### Props

Try to understand these props fast in `Knobs` tab   

| prop                  | type    | default value |
|--                     | --      |             --|
| label                 | string  |               |
| disabled              | boolean | false         |
| placeholder           | string  |               |
| helpText              | string  |               |
| multiline             | boolean | false         |
| submitOnEnter         | boolean | false         |
| leftIcon              | string  |               |
| leftIconClickPointer  | boolean | false         |
| rightIcon             | string  |               |
| rightIconClickPointer | boolean | false         |
| leftLabel             | string  |               |
| rightLabel            | string  |               |
| password              | string  |               |
| numeric               | string  |               |
| rows                  | string  | '1'           |
| autoFocus             | string  |               |
| autoHighlight         | boolean | false         |
| maxLength             | string  |               |
| autoResize            | string  |               |
| autoComplete          | string  |               |

### Events

Possible events are `focus`, `click`, `input`, `keySubmit`, `keyPress`, `keyDown`, watch them in `Actions` tab.  

### Usage

This component can be used in two modes:

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
        <recomponents-r-input placeholder="Type here" value="Value"/>
    </body>
</html>
```

#### CommonJS module

```html
<template>
    <r-input placeholder="Type here" value="Value"/>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
