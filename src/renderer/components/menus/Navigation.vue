<template>
  <div class="navigation">
    <button :disabled="value == '/' || value == null" class="button" @click="goTo(previousFolder)">&#x2190;</button>
    <ul class="path">
      <li><a class="location" @click="goTo('/')">Root/</a></li>
      <li v-for="(path, index) in folders" v-if="folders.length > 0"
          class="location"><a nohref @click="goTo(path, index)">{{ cleanPath(path) }}/</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        default: '/'
      }
    },
    data() {
      return {
        folders: [],
        previousFolder: null
      }
    },
    watch: {
      value(directory) {
        this.folders = [];
        let paths = directory.split('/').filter(item => item !== '');
        paths = paths[paths.length-1] === "" ? paths.slice(0, paths.length-1): paths;
        paths = paths[1] === "" ? paths.slice(1) : paths;
        
        let breadcrumb = paths.map((path, index) => {
            let url = '/' + paths.slice(0, index+1).join('/');
            this.folders.push(url)
        });

        this.previousFolder = this.folders[this.folders.length-2] || '/'
      }
    },
    methods: {
      cleanPath(path) {
        return path.split('/').pop();
      },
      goTo(path) {
        this.$emit('navigation', path)
      }
    }
  }
</script>

<style scoped lang="scss">
.navigation {
    text-align: left;
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
        border-right: 1px solid #dbdbdb;
    }
    .path {
        background-color: #ffffff;
        width: 80%;
        float: left;
        color: #000000;
        line-height: 30px;
        padding: 0 5px;

        li {
          display: inline-block;
          a {
            color: #000000;
            text-transform: lowercase;
            font-size: 13px;
            line-height: 13px;
          }
        }
    }
}
</style>