<p align="center">
    <img alt="Recomponents" src="https://media.giphy.com/media/Up1Otz0EISNQcDGmlc/giphy.gif">
</p>

## Installation

Recomponents is compatible with both yarn and npm:

```bash
npm install @rebilly/recomponents --save
yarn add @rebilly/recomponents
```

## Usage

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

During installation you can specify some options that could ovverride default behaviour of some components.

<details>
  <summary>List of available options</summary>

  * `ErrorHandler` - [Handler](src/common/helpers/default-error-handler.js) to convert any server / client error into user-friendly message that can be displayed via RToast
  * `allowToastCloseButton` - Add ability to close all RToast messages by default
</details>

## Documentation

We prefer [Storybook](https://storybook.js.org/) to plain-old documentation. [Check it out](https://recomponents.rebilly.com/) to see all of our components on display, with a comprehensive description and the ability to tweak properties and slots.

## Building storybook
Building (will generate bundled version in ../../docs folder):

```bash
npm run build-storybook
yarn build-storybook
```

⚠️ If you encounter errors when building, it might be the node version(like v16) is too high, we recommend using [nvm](https://github.com/nvm-sh/nvm) to downgrade the node version to v14.

### Serving built storybook (from docs folder)

If you want to serve the built version you can install [http-server](https://www.npmjs.com/package/http-server):

```bash
    yarn global add http-server
    npm install http-server -g
```

and run: 
```bash
    yarn serve-built-storybook
    npm run serve-built-storybook
```
## Licence

Recomponents are open source and released under the MIT Licence.

Copyright © 2019 Rebilly
