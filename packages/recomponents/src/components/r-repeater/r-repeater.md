# Repeater

This is an abstract component to help you render tabular data. It is notably used by `r-grid` under the hood.

### Usage

#### CommonJS module

```html
<template>
    <r-repeater :provider="provider">
        <template #headers>
            <th>ID</th>
            <th>Name</th>
        </template>
        <template #default="{ item }">
            <tr>
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
            </tr>
        </template>
    </r-repeater>
</template>
<script>
    import Vue from 'vue'
    import '@rebilly/recomponents/dist/recomponents.css'
    import Recomponents from '@rebilly/recomponents'

    Vue.use(Recomponents)
</script>
```
