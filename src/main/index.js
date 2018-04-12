import { app, BrowserWindow, Menu } from 'electron';
const electron = require('electron')
const ipcMain = electron.ipcMain;

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

/* Send event from menu to renderer **/
function sendToRender(event, arg) {
  mainWindow.webContents.send(event , arg);
}

/** Context menu */
require('electron-context-menu')({
	prepend: (params, browserWindow) => [{
    label: 'Remove Browser',
    click(params) {
       sendToRender('RemoveBrowser')
    }
	}]
});

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 500,
    useContentSize: true,
    width: 760,
    // titleBarStyle: 'hidden',
    // transparent: true, frame: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
  const template = [
    {
      label: 'Vinder',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        {
          label: 'Test',
          click: () => { console.log('plop') }
        },
        {
          label: 'Learn more',
          click: () => { shell.openExternal('https://url') }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'New Local Tab',
          click () { sendToRender('NewLocalBrowser') }
        },
        {
          label: 'New SSH Tab',
          click () { sendToRender('NewSSHBrowser') }
        },
        {
          label: 'Remove Tab',
          click () { sendToRender('RemoveBrowser') }
        },
        { role: 'reload' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'close' },
        { role: 'minimize' },
        { type: 'separator' },
        { role: 'front' }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})