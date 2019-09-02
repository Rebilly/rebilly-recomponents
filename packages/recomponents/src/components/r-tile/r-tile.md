# Tile component

Content container that looks simular to boostrap [cards](https://getbootstrap.com/docs/4.3/components/card/)

### Props

This component has no props, all logic is passed via slots

### Slots

This component has 4 **optional** slots that can be filled with any html markup or vue components

* `title` can accept tags from h1 to h6 tag
* `primary` will display content with white background
* `secondary` will display content with gray background
* `actions` for any buttons if you want to use tile as form

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
        <recomponents-r-tile>
            <div slot="title">
                <h1>Tile title</h1>
            </div>
            <div slot="primary">
                <p>Tile primary content</p>
            </div>
            <div slot="secondary">
                <p>Tile secondary content</p>
            </div>
        </recomponents-r-tile>
    </body>
</html>
```

#### CommonJS module

```html
<template>
    <r-tile>
        <template v-slot:title>
            <h2>Title title</h2>
        </template>
        <template v-slot:primary >
            <p>Primary content</p>
        </template>
        <template v-slot:secondary>
            <p>Secondary content</p>
        </template>
    </r-tile>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
