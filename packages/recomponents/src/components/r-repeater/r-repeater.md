# Repeater

This is an abstract component to help you render tabular data. It is notably used by `r-grid` under the hood.

### Props


| prop         | type             | default value | description                                                  |
|--------------|------------------|---------------|--------------------------------------------------------------|
| provider*    | function         |               | Returns some data to be rendered by the default scopped slot |

### Slots

This component has 4 optional slots and a required default slot:

* `default` **required** for content that belongs in a `<tr>`
* `colgroup` **optional** for colgroups - see HTML `<colgroup>`
* `thead` **optional** for thead - see HTML `<thead>`
* `headers` **optional** to just specify the `<th>`s of your table, rather than the whole `thead`
* `empty` **optional** for empty states (if the provider function returns no data)

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
