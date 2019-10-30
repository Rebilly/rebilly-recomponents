# Badge component

Small count and labeling component to highlight any information to a user. Could contain text or numbers.

### Props

| prop     | type    | required | default value | Description                          |
|--        | --      | --       | --            |                                    --|
| type     | string  | no       | `'default'`   | Changes background color             |
| close    | boolean | no       | `false`       | adds a close button to the component |

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
        <recomponents-r-badge type="warning">Warning</recomponents-r-badge>
    </body>
</html>
```

#### CommonJS module

```html
<template>
    <r-badge type="warning">Warning</r-badge>  
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
