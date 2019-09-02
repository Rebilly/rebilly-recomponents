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

Recomponents can be imported directly via CDN:

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@rebilly/recomponents"></script>
<r-button>Click me</r-button>
```

Or bundled with webpack:

```html
<template>
    <main>
        <r-loader/>
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
