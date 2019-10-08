# Webcomponent provider

Directive provider for webcomponent mode.
In story above we have Recomponents that are running not from local storybook, but from external CDN and in Webcomponent mode.
This component is not part of main bundle and available only via any npm CDN like unpkg.

### Props

This component has no props

### Slots

This component has 1 default slot 

### Usage

This component can be used in only in Webcomponent mode, as regular module it's usage doesn't make any sence:

#### Webcomponent module

```html
<html>
    <head>
        <meta charset="utf-8">
        <script src="https://unpkg.com/vue"></script>
        <script src="https://unpkg.com/@rebilly/recomponents/dist/recomponents.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@rebilly/recomponents/dist/recomponents.css">
    </head>
    <body>
    	<recomponents-r-webcomponent>
        	<recomponents-r-button>Click me</recomponents-r-button>
    	</recomponents-r-webcomponent>
    </body>
</html>
```