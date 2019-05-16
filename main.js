// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const contextMenu = require('electron-context-menu');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow,
  loadingScreen,
  windowParams = {
    width: 1366,
    height: 768,
    show: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    webPreferences: {
      nodeIntegration: true,
      plugins: true
    }
  };

contextMenu({
  prepend: (defaultActions, params, browserWindow) => [{
    showSaveImageAs: true
  }]
});

function createWindow () {
  // Create the browser window.

  mainWindow = new BrowserWindow(windowParams);

  // and load of the app.
  mainWindow.loadURL('https://managerwebqa.mdapropsys.com/');

  mainWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      mainWindow.show();
      if (loadingScreen) {
        let loadingScreenBounds = loadingScreen.getBounds();
        mainWindow.setBounds(loadingScreenBounds);
        loadingScreen.close();
      }
    }, 4000);
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createLoadingScreen() {
  loadingScreen = new BrowserWindow(Object.assign(windowParams, { parent: mainWindow }));
  loadingScreen.loadURL('file://' + __dirname + '/loading.html');
  loadingScreen.on('closed', () => loadingScreen = null);
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createLoadingScreen();
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


