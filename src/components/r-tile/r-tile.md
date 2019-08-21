# Tile component

Content container that looks simular to boostrap [cards](https://getbootstrap.com/docs/4.3/components/card/)

### Props

This component has no props, all logic is passed via slots

### Slots

This component has 4 **optional** slots that can be filled with any html markup or vue components

* `title` can accept tags from h1 to h6 tag
* `primary` will display content with white background
* `secondary` will display content with gray background
* `actions` for any buttons if you want to use tile as form

### Usage

This component can be used in two modes:

#### UMD module

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/rebilly-recomponents/rebilly-recomponents.umd.min.js"></script>

<rebilly-recomponents-r-tile>
    <template v-slot:title>
        <h2>Title title</h2>
    </template>
    <template v-slot:primary >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
    </template>
</rebilly-recomponents-r-tile>

```

#### CommonJS module

```javascript
// TBD
```
