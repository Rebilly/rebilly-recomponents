# Tabs component

There are 2 component: `r-tabs` and `r-tab`.

## Tabs 

### Props
| prop         | type        | default value |
|--------------|-------------|---------------|
| divided      | boolean     | `false`       |
| menuClass    | string      |               |
| contentClass | string      |               |
### Slots

This component has 1 **required** slot that can be filled by any quantity of `r-tab` components.

## Tab 

### Props
| prop       | type                | default value |
|------------| --------------------|---------------|
| name       | string (required)   |               |
| value      | string              |               |
| active     | boolean             | `false`       |
| to         | [object, undefined] |               |

### Slots

This component has 1 **required** slot that can be filled with any html markup or vue components - the content of tab


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
        <recomponents-r-tabs>
            <recomponents-r-tab v-for="(tab, tabIndex) in tabs"
                                :key="tabIndex"
                                :name="tab.name"></recomponents-r-tab>
        </recomponents-r-tabs>
    </body>
</html>
```

#### CommonJS module

```html
<template>
    <r-tabs>
        <r-tab v-for="(tab, tabIndex) in tabs"
               :key="tabIndex"
               :name="tab.name"></r-tab>      
    </r-tabs>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
