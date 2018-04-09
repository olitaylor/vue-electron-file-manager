<template>
  <div class="footer-options">
  <label for="showHidden">Hidden 
    <input type="checkbox" v-model="hidden">
  </label>
  </div>
</template>

<script>
  export default {
    props: ['showHidden'],
    data() {
      return {
        hidden: false
      }
    },
    watch: {
      hidden() {
        this.$emit('input', this.hidden)
      }
    },
    mounted() {
      this.hidden = this.showHidden;
    }
  }
</script>

<style scoped lang="scss">
.footer-options {
    position: absolute;
    bottom: 0;
}
</style>