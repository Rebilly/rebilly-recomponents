<template>
  <main>
    <nuxt />
  </main>
</template>

<script>
import Vue from 'vue'
import '@rebilly/recomponents/dist/recomponents.css'
import Recomponents from '@rebilly/recomponents'

Vue.use(Recomponents)

export default {}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

:root {
  --primary-color: #4400d4;
  --primary-color-dark: #23006e;
  --primary-color-light: #2600d4;
  --primary-color-medium: #3400a1;
}
</style>
