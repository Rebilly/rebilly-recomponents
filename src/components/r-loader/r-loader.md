# Loader component

Indicate the loading state of a component or page with brand's logo spinner.
Rendered only with basic HTML and CSS as a Vue component.

### Props

This component has 3 properties to control it's appearence and animataion

* `show` boolean value to show or hide component
* `loading` flag to start / stop animation
* `fullscreen` fill parent component or entire application

### Slots

This component has not slots

### Usage

This component can be used in two modes

#### UMD module

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/rebilly-recomponents/rebilly-recomponents.umd.min.js"></script>

<rebilly-recomponents-r-loader :show="true"/>

```
#### CommonJS module

```javascript
// TBD
```