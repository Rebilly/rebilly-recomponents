# Time Picker

### v-model

| prop  | event |
|--     |     --|
| value | input |
            
###Props
Try to understand these props fast in `Knobs` tab   

| prop          | type    | default value |
|--             | --      |             --|
| label         | string  |               |
| disabled      | boolean | false         |
| placeholder   | string  |               |
| helpText      | string  |               |
| validate      | object  |               |

### Events

Possible events are  `input`, and all actions of `RSelect` component , watch them in `Actions` tab.  


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
        <recomponents-r-time-picker placeholder="Choose"
                                    value="2019-07-28T00:58:33+00:00"/>
    </body>
</html>
```

#### CommonJS module

```html
<template>
    <r-time-picker value="2019-07-28T00:58:33+00:00"/>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```

### Examples

#### Time Range Picker

```html
 <div class="r-time-range">
           <r-time-picker :label="startLabel"
                          :disabled="disabled"
                          :placeholder="placeholder"
                          :helpText="startHelpText"
                          v-model="time.start"
                          @input="input"></r-time-picker>
           <r-time-picker :label="endLabel"
                          :disabled="disabled"
                          :placeholder="placeholder"
                          :helpText="endHelpText"
                          v-model="time.end"
                          @input="input"></r-time-picker>
        </div>
```