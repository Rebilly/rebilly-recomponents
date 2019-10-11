# Pagination

### Props


| Name         | Type             |
|--------------|------------------|
| provider*    | function         |
| total*       | number           |
| limit*       | number           |
| totalVisible | boolean / number |

`{Name}*` - required prop

### Events

`navigate` - emits when it is navigated to next, previous or another page.

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
        <recomponents-r-pagination :total="150" :limit="30" :provider="provider"></recomponents-r-pagination>
    </body>
</html>
```

#### CommonJS module

```html
<template>
    <r-pagination :total="150" :limit="30" :provider="provider"></r-pagination>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
