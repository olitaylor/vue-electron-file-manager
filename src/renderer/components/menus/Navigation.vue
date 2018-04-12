<template>
  <div class="navigation">
    <button :disabled="value == '/' || value == null" class="button" @click="goTo(previousFolder)">&#x2190;</button>
    <ul class="path">
      <li>
        <a @click="goTo('/')">Root/</a>
      </li><!-- Don't remove, this is fixing inline-block
   --><li v-for="(path, index) in folders" v-if="folders.length > 0">
        <a nohref @click="goTo(path, index)">{{ cleanPath(path) }}/</a>
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
    display: flex;

    button {
      width: 50px;
      line-height: 30px;
      padding: 0;
      border-radius: 0;
      height: initial;
      font-size: 20px;
      border: none;
      background-color: #dcdcdc;

      &:focus {
        box-shadow: none;
      }
    }
    .path {
        background-color: #ffffff;
        color: #000000;
        line-height: 30px;
        padding: 0 5px;
        display: inline-block;
        flex-grow: 1;

        li {
          display: inline-block;
          a {
            color: #000000;
            text-transform: lowercase;
            font-size: 13px;

            &:hover {
              color: #0000ff;
            }
          }
        }
    }
}
</style>