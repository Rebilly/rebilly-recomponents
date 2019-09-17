# Image


### Props

| prop | type                                | default value        |
|--    | --                                  |                    --|
| src  | string                              |                      |
| alt  | string                              | 'Recomponents image' |
| lazy | boolean                             | false                |


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
        <recomponents-r-img src="https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png" alt="Recomponents image"/>
      />
    </body>
</html>
```

#### CommonJS module

```html
<template>
    <r-img src="https://www.rebilly.com/wp-content/uploads/2019/01/new_features@2x-319x150.png" alt="Recomponents image"/>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
