<p align="center">
    <img alt="Recomponents" src="https://media.giphy.com/media/Up1Otz0EISNQcDGmlc/giphy.gif">
</p>

## Installation

Recomponents is compatible with both yarn and npm:

```bash
npm install rebilly-recomponents --save
yarn add rebilly-recomponents
```

## Usage

Recomponents can be imported directly via CDN (check [JSFiddle](https://jsfiddle.net/kjz0h3pb/)):

```html
<html>
    <head>
        <meta charset="utf-8">
        <script src="https://unpkg.com/vue"></script>
        <script src="https://unpkg.com/@rebilly/recomponents/dist/recomponents.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@rebilly/recomponents/dist/recomponents.css">
    </head>
    <body>
        <recomponents-r-button>Click me</recomponents-r-button>
    </body>
</html>
```

Or bundled with webpack:

```html
<template>
    <main>
        <r-button>Click me</r-button>
    </main>
</template>

<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)

    export default {}
</script>
```

## Documentation

We prefer [Storybook](https://storybook.js.org/) to plain-old documentation. [Check it out](https://recomponents.rebilly.com/) to see all of our components on display, with a comprehensive description and the ability to tweak properties and slots.

## Licence

Recomponents are open source and released under the MIT Licence.

Copyright © 2019 Rebilly
