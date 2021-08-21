`RToast` component is used to show quick messages to user.  Appears temporarily in the top right zone of the screen.
To manage multiple toasters at the same time using RToasterManager plugin that is installed by default with Recomponents bundle.

Default Recomponents [installation](../../../../#usage) provide `RToastManager` plugin that is available in Vue scope, so you can display any possible toast with $toast

```js
this.$toast.positive('Something positive in your code');
```

You can override default closable settings by providing special option:

```js
this.$toast.info('Closable toast', {allowClose: true});
this.$toast.info('Non-closable toast', {allowClose: true});
```
