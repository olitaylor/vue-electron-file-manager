<template>
 <div>
    <Menu class="menu"></Menu>
    <Pane class="pane"></Pane>
    <Pane class="pane"></Pane>
 </div>
</template>

<script>
  export default {
    components: {
      'Pane' : require('@/components/Pane').default,
      'Menu' : require('@/components/Menu').default
    }
  }
</script>

<style scoped lang="scss">
  .pane {
    width: 42.5%;
    float: left;
    border-right: 1px solid #5a5a5a;
    padding: 0px;

    &:last-of-type {
     border-right: 0px 
    }
  }
  .menu {
      width: 15%;
      float: left;
  }
</style>