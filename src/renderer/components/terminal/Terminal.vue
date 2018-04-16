<template>
  <div class="term"></div>
</template>

<script>  

  import 'xterm/dist/xterm.css'
  import { Terminal } from 'xterm';
  import * as fit from 'xterm/dist/addons/fit'
  Terminal.applyAddon(fit)

  export default {

    props: {
      directory: {
        default: '~'
      }
    },

    data() {
      return {
        shellOpts: {
          cols: 42,
          rows: 7,
          screenKeys: true,
          cursorBlink: true,
          focusKeys: false,
          noEvents: false,
          useStyle: false,
          name: 'xterm-color',
          cwd: this.directory
        }
      }
    },

    watch: {
      directory(value) { 
        this.$emit('directoryChange', value)
      }
    },
    
    mounted() {
      let pty = require('node-pty');
      let el = this.$el;
      let term = new Terminal(this.shellOpts)
      let cmd = '';
      let shell = pty.spawn(process.env.SHELL || 'bash', [], this.shellOpts);

      term = new Terminal(this.shellOpts);
      term.open(el);

      this.$on('directoryChange', (value) => {
        this.shellOpts.cwd = value;
        term.send('cd ' + value +'\x1b[m\r')
      })

      shell.on('data', (data) => {
        if (data === ':') {
          cmd += data;
          return
        }
        term.write(data);
      });

      shell.on('close', () => {
        window.close();
      });

      term.on('data', function(data) {
        shell.write(data);
      });

    }
  }
</script>

<style lang="scss">
.terminal {
  position: relative;
  width: 100%; 
  height: 100%;
  padding: 5px;
  border-top: 1px solid #5a5a5a;
}
.xterm .xterm-screen {
  width: 100% !important;
}
.xterm .xterm-viewport {
  overflow-y: hidden !important;
}
</style>