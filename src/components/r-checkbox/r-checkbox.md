# Checkbox component

Wrapper on native checkbox input with `v-model` usage

### Props

* TBD

### Slots

This component has 1 **optional** slot

* `label` for label text

### Usage

This component can be used in two modes:

#### UMD module

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/rebilly-recomponents/rebilly-recomponents.umd.min.js"></script>

<script>
  let checkboxModel = false;
</script>

<rebilly-recomponents-r-checkbox
  caption="Caption"
  label="Checkbox"
  v-model="checkboxModel"/>
```

#### CommonJS module

```javascript
// TBD
```
