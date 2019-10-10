# Modal component

### Props

| prop          | type                                    | default value |
|---------------|-----------------------------------------|---------------|
| title         | string                                  |               |
| cancelLabel   | string                                  | 'Cancel'      |
| size          | string: `large`, `extra-large`, `fluid` |               |
| scroll        | boolean                                 | false         |
| scrollContent | boolean                                 | false         |


### Slots
|       slot        |         description                          |
|------------------ | ---------------------------------------------|
| `contents`        | content of modal                             |
| `content`         | content with some predefined styles          |
| `left-actions`    | left action buttons                          |
| `right-actions`   | right action buttons                         |
| `actions`         | action buttons after default cancel button   |


### Events

Possible events are `enter`, `leave`, `submit`, `close`, watch them in `Actions` tab.  

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
        <recomponents-r-modal title="Modal">
            <template v-slot:content>
                <p></p>
            </template>
        </recomponents-r-modal>            
    </body>
</html>

```
#### CommonJS module

```html
<template>
    <r-modal :title="title">
        <template v-slot:content>
            <p></p>
        </template>
    </r-modal>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```