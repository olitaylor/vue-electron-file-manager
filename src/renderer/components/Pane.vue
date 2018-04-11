<template>
<div @mouseover="hoverPane(paneIndex)">
  <Navigation v-model="directory" @navigation="navigationChange"></Navigation>
  <p class="permission" v-if="permissionDenied">Access Denied</p>
  <ul class="file-list">
    <li
      v-for="(file, index) in filtered" 
      :class="file.type" :tabindex="index">
        <a @click="clickItem(file)">{{ file.file }}</a>
    </li>
  </ul>
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
        paths: []
      }
    },

    props: ['paneIndex'],

    mounted() {
      this.directoryFiles = [];
      this.readDirectory(this.directory);
    },

    computed: {
      filtered() {
        if(this.showHidden) {
          return this.directoryFiles;
        }

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

      navigationChange(data) {
        this.readDirectory(data, true);
      },

      clickItem(file) {
        file.type === 'directory' ? this.readDirectory(file.id) : this.openFile(file.id)
      },

      openFile(path) {
        shell.openItem(path);
      },

      hoverPane(index) {
        this.$emit('hoveredPane', index)
      }

    },
    components: {
      'Navigation' : require('@/components/Navigation').default
    }
  }
</script>

<style scoped lang="scss">
.permission {
  color: #c7444a;
  text-align: center;
  margin-top: 20px;
}
.file-list {
  padding: 5px 10px;
  margin: 0;
  height: calc(100vh - 60px);

  li {
    line-height: 1.4;
    
    &.directory a {
      color: #A6E22E;
    }
    &.file a {
      color: #6089b4;
    }
  }
}
</style>