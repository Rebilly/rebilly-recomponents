<p align="center">
    <img alt="Recomponents" src="https://media.giphy.com/media/Up1Otz0EISNQcDGmlc/giphy.gif">
</p>

## Installation

Recomponents are compatible both with yarn and npm:

```bash
npm install rebilly-recomponents --save
yarn add rebilly-recomponents
```

## Usage

Recomponents can be used as web components:

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@rebilly/recomponents"></script>
<r-button>Click me</r-template>
```

Or they can be bundled by webpack:

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

We adore [Storybook](https://storybook.js.org/) and for Recomponents instead of boring documentation we used it to demonstrate all components we have.
Each component has comprehensive description, you can play with any customizable property and slot. 

## Licence

Recomponents are open source and released under the MIT Licence.

Copyright © 2019 Rebilly