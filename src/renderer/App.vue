<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vinder'
  }
</script>

<style lang="scss"> 
@import '~@/assets/css/style.css';
html, body {
  background-color: #272822;
  overflow: hidden;
  height: 100%;
}
#app {
  height: 100%;
}
</style>