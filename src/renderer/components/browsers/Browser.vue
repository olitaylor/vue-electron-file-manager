<template>
<div @mouseover="hoveredBrowser(browserIndex)" class="browser">
  <Navigation v-model="directory" @navigation="navigationChange"></Navigation>
  <p class="permission" v-if="permissionDenied">Access Denied</p>
  <ul class="file-list">
    <li
      v-for="(file, index) in filtered" 
      :class="file.type" :tabindex="index">
        <i class="icon" :class="{ 'icon-folder-open' : file.type == 'directory', 'icon-file-text2' : file.type == 'file'  }"></i>
        <a @click="clickItem(file)">{{ file.file }}</a>
    </li>
  </ul>
  <Terminal :directory="directory" ref="term"></Terminal>
</div>
</template>

<script>
  const fs = require('fs');
  const { shell } = require('electron');
  
  export default {

    data() {
      return {
        directory: '/',
        directoryFiles: [],
        showHidden: false,
        permissionDenied: false,
        paths: [],
        browserIndex: '',
        showTerminal: false
      }
    },

    props: ['browser', 'terminal'],

    mounted() {
      this.browserIndex = this.browser.name;
      this.directoryFiles = [];
      this.browser.type === 'local' ? this.readDirectory(this.directory) : this.loadSSH();
    },

    watch: {
      terminal(data) {
        if(data.browser === this.browserIndex) {
          this.showTerminal = !this.showTerminal;
        }
      }
    },

    computed: {
      filtered() {
        if(this.showHidden) {
          return this.directoryFiles;
        }

        /** Hide files if the name starts with a '.' */
        return this.directoryFiles.filter((item) => {
          return item.file[0] !== '.'
        })

      }
    },

    methods: {
      readDirectory(path, back = false) {

        this.directory = path;

        fs.readdir(path, (err, files) => {
          'use strict';

          if (err) {
            this.permissionDenied = true;
            this.directoryFiles = [];
            throw  err;
          } else {
            this.permissionDenied = false;
            back !== true && this.paths.push(path);
          }
          
          this.directoryFiles = []

          for (let file of files) {
            fs.stat(path + '/' +file, (err, stats) => {
              if(err) throw err;
              this.directoryFiles.push({
                id: path + '/' + file,
                path: path,
                file: file,
                type: stats.isDirectory() ? 'directory' : 'file',
                stats: stats
              })
            });
          }
          
        });

      },

      loadSSH() {
        
      },

      navigationChange(data) {
        this.readDirectory(data, true);
      },

      clickItem(file) {
        file.type === 'directory' ? this.readDirectory(file.id) : this.openFile(file.id)
      },

      openFile(path) {
        shell.openItem(path);
      },

      hoveredBrowser(index) {
        this.$emit('hoveredBrowser', index)
      }

    },
    components: {
      'Navigation' : require('@/components/menus/Navigation').default,
      'Terminal' : require('@/components/terminal/Terminal').default
    }
  }
</script>

<style scoped lang="scss">
.browser {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.permission {
  color: #c7444a;
  text-align: center;
  margin-top: 20px;
}

.file-list {
  padding: 5px 10px;
  margin: 0;
  overflow: auto;
  flex: 1;

  li {
    line-height: 1.4;
    font-size: 15px;
    
    &.directory a {
      color: #A6E22E;
    }

    &.file a {
      color: #6089b4;
    }

    &:focus {
      outline: 0;
    }

    a {
      &:focus {
        outline: 0;
        text-decoration: underline;
      }
    }

    i {
      color: #cccccc;

      &.icon-file-text2 {
        margin-right: 4px;
      }
    }

  }
}
</style>