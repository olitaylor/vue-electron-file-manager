<template>
  <div class="navigation">
    <button :disabled="this.directoryProp == '/' || this.directoryProp == null" class="button" @click="goBack()">&#x2190;</button>
    <p class="path">Path: <span class="location">{{ directoryProp.replace("//", "/") }}</span></p>
  </div>
</template>

<script>
  export default {
    props: ['directoryProp'],
    computed: {
        directoryArray() {
           return this.directoryProp.split('/');

        }
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'nextFolder', 
          params: { directoryProp: this.directoryProp.substr(0, this.directoryProp .lastIndexOf("/")) } })
      }
    }
  }
</script>

<style scoped lang="scss">
.navigation {
    text-align: center;
    font-size: 20px;
    overflow: auto;

    button {
        width: 20%;
        float: left;
        line-height: 30px;
        padding: 0;
        border-radius: 0;
        height: initial;
        font-size: 20px;
        border: none;
    }
    .path {
        background-color: #404040;
        width: 80%;
        float: left;
        color: #c5c8c6;
        line-height: 30px;
    }
}
</style>