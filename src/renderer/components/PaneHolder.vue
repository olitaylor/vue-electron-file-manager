<template>
 <div class="pane-holder">
  <div class="pane" v-for="(i, index) in panes" :key="i.name">
    <Pane :paneIndex="i.name" @hoveredPane="hoveredPane"></Pane>
  </div>
 </div>
</template>

<script>
  const electron = window.require('electron');
  const ipcRenderer = electron.ipcRenderer;
 
  export default {
    data() {
      return {
        panes: [
          {
            name: 'pane-1',
            type: 'local',
           },
           {
             name: 'pane-2',
             type: 'local'
           }
          ],
        selectedPane: 0
      }
    },
    mounted() {
      ipcRenderer.on('NewPane', (event, message) => {
        this.addPane();
      });
      ipcRenderer.on('RemovePane', (event, message) => {
        this.removePane();
      });

    },
    methods: {
      
      addPane() {
        this.panes.length < 4 && this.panes.push({
          name: 'pane-' + (this.panes.length + 1),
          type: 'local'
        });
      },

      removePane() {
        this.panes = this.panes.filter( ( pane ) => {
            return pane.name !== this.selectedPane;
        });
      },

      hoveredPane(data) {
        this.selectedPane = data;
      }

    },
    components: {
      'Pane' : require('@/components/Pane').default,
      'Menu' : require('@/components/Menu').default
    }
  }
</script>

<style scoped lang="scss">
  .pane-holder {
    display: flex;

    .pane {
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