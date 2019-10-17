<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/payment">Payment</g-link>
        <g-link class="nav__link" to="/todo">Todo</g-link>
        <g-link class="nav__link" to="/lazy-loading">Lazy Loading</g-link>
        <g-link class="nav__link" to="/tabs">Tabs</g-link>
        <g-link class="nav__link" to="/multi-step-form">Multi-step Form</g-link>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<script>
import Vue from 'vue'
import '@rebilly/recomponents/dist/recomponents.css'
import Recomponents from '@rebilly/recomponents'

Vue.use(Recomponents)

export default {}
</script>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
