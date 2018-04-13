<template>
  <div class="navigation">
    <button :disabled="value == '/' || value == null" class="button" @click="goTo(previousFolder), calcVisiblePath(true)">&#x2190;</button>
    <ul class="path">
    <li class="folder path-nav" v-if="hidden > 0">
      <a @click="goTo(previousFolder)">../</a>
    </li><!-- Don't remove, this is fixing inline-block
   --><li class="folder">
        <a @click="goTo('/'), calcVisiblePath(true)">~/</a>
      </li><!-- Don't remove, this is fixing inline-block
   --><li class="folder" v-for="(path, index) in folders" v-if="folders.length > 0">
        <a nohref @click="goTo(path, index), calcVisiblePath(true)">{{ cleanPath(path) }}/</a>
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
        previousFolder: null,
        hidden: 0
      }
    },
    watch: {
      value(directory, oldDirectory) {
        this.folders = [];
        let paths = directory.split('/').filter(item => item !== '');
        paths = paths[paths.length-1] === "" ? paths.slice(0, paths.length-1): paths;
        paths = paths[1] === "" ? paths.slice(1) : paths;
        
        let breadcrumb = paths.map((path, index) => {
            let url = '/' + paths.slice(0, index+1).join('/');
            this.folders.push(url)
        });

        this.previousFolder = this.folders[this.folders.length-2] || '/';

        this.$nextTick(() => {
          this.calcVisiblePath();
        })

      }
    },
    methods: {
      cleanPath(path) {
        return path.split('/').pop();
      },
      goTo(path) {
        this.$emit('navigation', path)
      },
      calcVisiblePath(backwards = false) {
        let path = this.$el.getElementsByClassName('path')[0];
        let folders = Array.from(path.children).filter(folder => !folder.className.includes('path-nav'));
        let pathLength = 0;

        folders.forEach(f => pathLength += f.clientWidth);

        while((pathLength + 15) > path.clientWidth  && !backwards) {
          pathLength -= folders[this.hidden].clientWidth;
          folders[this.hidden].style.display = 'none';
          this.hidden++;
        }

        while(pathLength < path.clientWidth && this.hidden > 0 && backwards) {
          folders[this.hidden].style.display = 'inline-block';
          pathLength += folders[this.hidden].clientWidth;
          this.hidden--;
        }

      }
    }
  }
</script>

<style scoped lang="scss">
.navigation {
  text-align: left;
  font-size: 20px;
  display: flex;
  background-color: #ffffff;

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
    color: #000000;
    line-height: 30px;
    padding: 0 5px;
    display: inline-block;
    width: 100%;

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