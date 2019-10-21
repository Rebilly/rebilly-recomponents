# Date or Date time input

Based on vCalendar, but can choose hours/minutes.

### v-model

| prop  | event |
|--     |     --|
| value | input |

### Props

Try to understand these props fast in `Knobs` tab   

| prop           | type    | default value | note                             |
|--              | --      | --            |                                --|
| availableDates | object  | null          |                                  |
| label          | string  | null          |                                  |
| disabled       | boolean | false         |                                  |
| placeholder    | string  | null          |                                  |
| helpText       | string  | null          |                                  |
| stack          | string  | null          |                                  |
| type           | string  | 'date'        | also can be `datetime' or 'time' |
| value          | object  |               |                                  |
| validate       | object  | null          |                                  |
| noFlex         | boolean | false         |                                  |

### Events

Possible events are `input`, watch it in `Actions` tab.  

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
        <recomponents-r-date-input .../>
    </body>
</html>

```

#### CommonJS module

```html
<template>
    <recomponents-r-date-input .../>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
