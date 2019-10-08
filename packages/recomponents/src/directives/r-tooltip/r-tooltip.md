# Button

Tooltip directive useful for displaying any text when user hovers over an element.

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
        <recomponents-r-button>Click me</recomponents-r-button>
    </body>
</html>

```

#### CommonJS module

```html
<template>
    <r-button>Click me</r-button>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```

If only need to import a single component, not globally

```html
<script>
    import {RButton} from '@rebilly/recomponents'
</script>
```
