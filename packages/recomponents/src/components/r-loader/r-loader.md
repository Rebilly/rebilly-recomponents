# Loader component

Indicate the loading state of a component or page with brand's logo spinner.
Rendered only with basic HTML and CSS as a Vue component.

### Props

This component has 3 properties to control it's appearence and animataion

* `show` boolean value to show or hide component
* `loading` flag to start / stop animation
* `fullscreen` fill parent component or entire application

### Slots

This component has not slots

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
        <recomponents-r-loader loading="true" show="true"/>            
    </body>
</html>

```
#### CommonJS module

```html
<template>
    <r-loader :loading="true" :show="true"/>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```