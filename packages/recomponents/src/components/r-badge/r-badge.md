# Badge component

Small count and labeling component to highlight any information to a user. Could contain text or numbers.

### Props

This component has 

* `type` component's background color, could be `default`, `positive`, `negative`, `warning`, `info`,

### Slots

This component has 1 **required** slot that can accept any text:

* `default` component's content

### Usage

This component can be used in two modes:

#### UMD module

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/rebilly-recomponents/rebilly-recomponents.umd.min.js"></script>

<rebilly-recomponents-r-badge :type="warning">Badge</rebilly-recomponents-r-badge>

```

#### CommonJS module

```javascript
// TBD
```