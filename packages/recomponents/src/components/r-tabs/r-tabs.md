# Tabs component

There are 2 component: `r-tabs` and `r-tab`.

## Tabs 

### Props
| prop         | type        | default value |
|--------------|-------------|---------------|
| divided      | boolean     | `false`       |
| menuClass    | string      |               |
| contentClass | string      |               |
| tabHeaderMode | boolean    | `false`       |

### Slots

This component has 1 **required** slot that can be filled by any quantity of `r-tab` components.

## Tab 

### Props
| prop       | type                | default value |
|------------| --------------------|---------------|
| name       | string (required)   |               |
| value      | string              |               |
| panelId    | string (optional)   |               |
| active     | boolean             | `false`       |
| to         | [object, undefined] |               |

### Slots

This component has 1 **required** slot that can be filled with any html markup or vue components - the content of tab

### Modes  
*Standard*  

In this mode we have a contentful header of tabs, where each `tab` in the header has a corresponding `tabpanel`.  
  
```html  
<r-tabs>  
    <r-tab v-for="(tab, tabIndex) in tabs"  
            :key="tabIndex"  
            :name="tab.name">  
            {{tab.content}}  
    </r-tab>  
</r-tabs>  
```  

*Header only mode*  

In this mode we have a contentless header of `tabs` that is independent of `tabpanels`.
Ideally, when using this mode, we do not want there to be any content in `<r-tab></r-tab>` in order to avoid creating unnecessary DOM elements.

```html
<r-tabs tabHeaderMode="true">
    <r-tab v-for="(tab, tabIndex) in tabs" :name="tab.name"></r-tab>
</r-tabs>
```


### Usage

This component can be used in two different ways:

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
