const { app, BrowserWindow } = require('electron');
const path = require('path');

// Avvia il server Express interno (Socket.io incluso)
require('./server');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    icon: path.join(__dirname, 'icon.ico'),
    skipTaskbar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false // Sicurezza
    }
  });

  win.setMenu(null); // Nasconde il menu

  // Carica il file HTML locale
  win.loadFile(path.join(__dirname, 'public', 'index.html'));
  win.loadURL('https://neomla-perudo.onrender.com/');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
