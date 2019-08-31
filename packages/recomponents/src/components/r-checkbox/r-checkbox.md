# Checkbox component

Wrapper on native checkbox input with `v-model` usage

### Props

* TBD

### Slots

This component has 1 **optional** slot

* `label` for label text

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
        <recomponents-r-checkbox label="Check me"/>
      />
    </body>
</html>
```

#### CommonJS module

```html
<template>
    <r-checkbox label="Check me"/>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
