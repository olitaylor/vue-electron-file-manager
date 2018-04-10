<template>
 <div class="side-menu">
    <ul>
        <li v-for="item in menu">
           > {{ item }}
        </li>
    </ul>
 </div>
</template>

<script>
  export default {
    data() {
        return {
            menu: ['Documents', 'Development']
        }
    }
  }
</script>

<style scoped lang="scss">
.side-menu {
    background-color: #353535;
    display: block;
    height: 100vh;
    padding: 10px;
    color: #cccccc;
}
</style>