<template>
 <div class="browser-holder">
  <div class="browser" v-for="(i, index) in browsers" :key="i.name">
    <Browser :browser="i" @hoveredBrowser="hovered"></Browser>
  </div>
 </div>
</template>

<script>
  const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;
 
  export default {

    data() {
      return {
        browsers: [
          {
            name: 'browser_'  + Math.random().toString(36).substr(2, 9),
            type: 'local',
           },
           {
             name: 'browser_' + Math.random().toString(36).substr(2, 9),
             type: 'local'
           }
          ],
        selectedBrowser: ''
      }
    },

    mounted() {
      ipcRenderer.on('NewLocalBrowser', (event, message) => {
        this.addBrowser('local');
      });
      ipcRenderer.on('NewSSHBrowser', (event, message) => {
        // SHOW SETTINGS WINDOW, ADD OR USE EXISTING SSH CONFIG
        this.addBrowser('ssh');
      });
      ipcRenderer.on('RemoveBrowser', (event, message) => {
        this.removeBrowser();
      });

    },
    methods: {
      
      addBrowser(type) {
        this.browsers.length < 4 && this.browsers.push({
          name: 'browser_' + Math.random().toString(36).substr(2, 9),
          type: type
        });
      },

      removeBrowser() {
        this.browsers = this.browsers.filter( ( browser ) => {
            return browser.name !== this.selectedBrowser;
        });
      },

      hovered(data) {
        this.selectedBrowser = data;
      }

    },

    components: {
      'Browser' : require('@/components/browsers/Browser').default
    }
    
  }
</script>

<style scoped lang="scss">
  .browser-holder {
    display: flex;

    .browser {
      flex-grow: 1;
      border-right: 1px solid #5a5a5a;
      padding: 0;
      flex: 1 0 0px;

      &:last-of-type {
        border-right: 0; 
      }
    }
    .menu {
      flex-grow: 1;
    }
  }
</style>