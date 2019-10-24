# Button Group

A group of buttons

### Usage

In general, <r-button-group/> works with <r-button/> together, change to `Knobs` tab to see its behaviour.

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
        <recomponents-r-button-group>
            <recomponents-r-button>one</recomponents-r-button>
            <recomponents-r-button>two</recomponents-r-button>
            <recomponents-r-button>three</recomponents-r-button>
        </recomponents-r-button-group>
    </body>
</html>

```

#### CommonJS module

```html
<template>
    <r-button-group>
        <r-button>one</r-button>
        <r-button>two</r-button>
        <r-button>three</r-button>
    </r-button-group>
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
    import {RButtonGroup} from '@rebilly/recomponents'
</script>
```
