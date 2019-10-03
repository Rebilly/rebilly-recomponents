## Popper

| prop           | type                                                                | default value   |
|--              | --                                                                  |               --|
| escToHide      | boolean                                                             | true            |
| autoHide       | boolean                                                             | true            |
| globalAutoHide | boolean                                                             | true            |
| openOnMount    | boolean                                                             | false           |
| disabled       | boolean                                                             | false           |
| offset         | number                                                              | 4               |
| direction      | string: `'horizontal'` , `'vertical'`                               | `'horizontal'`  |
| position       | string: `'bottomStart'` , `'bottomEnd'` , `'topStart'` , `'topEnd'` | `'bottomStart'` |
| slideFrom      | string: `'fade'` , `'top'` , `'bottom'` , `'left'` , `'right'`      | `'fade'`        |
  
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
        <recomponents-r-popper>
            <div slot="trigger">
                <recomponents-r-button type="primary">
                    Click me
                </recomponents-r-button>
            </div>
            <div slot="content">
                <p>Tile primary content</p>
            </div>
        </recomponents-r-popper>
    </body>
</html>

```

#### CommonJS module

```html
<template>
    <r-popper>
        <template #trigger="{popper}">
            <r-button type="primary" @click="popper.toggle">
                Click me
            </r-button>
        </template>
        <div slot="content">
            <p>Tile primary content</p>
        </div>
    </r-popper>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```