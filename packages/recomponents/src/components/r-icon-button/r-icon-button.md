# Icon Button

Button with icon, icon is optional.

### Props

| prop             | type                                                         | default value |
|--                | --                                                           | --          --|
| type             | string: `'default'` , `'primary'` , `'warning'` , `'danger'` | `'default'`   |
| size             | string: `'small'` , `'regular'`, `'large'`                   | `'regular'`   |
| disabled         | boolean                                                      | false         |
| fluid            | boolean                                                      | false         |
| tooltip          | string                                                       | ''            |
| tooltipRightEdge | boolean                                                      | false         |
| fitted           | boolean                                                      | false         |
| globalAutoHide   | boolean                                                      | true          |

### Slots

| name       | description         | usage                         |
| --         | --                  | --                            |
| default    | component's content | see the source in `Story` tab |
| left-icon  | left icon           | see the source in `Story` tab |
| right-icon | right icon          | see the source in `Story` tab |

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
        <recomponents-r-icon-button>
            <recomponents-r-icon slot="left-icon" icon="heart"></recomponents-r-icon>
            Icon button
            <recomponents-r-icon slot="right-icon" icon="heart"></recomponents-r-icon>
        </recomponents-r-icon-button>
    </body>
</html>
```

#### CommonJS module

```html
<template>
    <r-icon-button>
        <r-icon slot="left-icon" icon="heart"></r-icon>
        Icon button
        <r-icon slot="right-icon" icon="heart"></r-icon>
    </r-icon-button>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
