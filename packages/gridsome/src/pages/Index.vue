<template>
  <Layout>    
    <g-image alt="Example image" src="~/favicon.png" width="135" />
    
    <h1>Recomponents + Gridsome</h1>
   
    <p>
      Simple demonstration of Recomponents in conjunction with Gridsome using SSR.
    </p>

    <p class="home-links">
      <a href="https://gridsome.org/docs" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
