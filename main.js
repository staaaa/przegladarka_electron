const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Store = require("./store.js");
let mainWindow = null;

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: "user-preferences",
  defaults: {
    test: "test",
    windowBounds: { width: 800, height: 600 },
  },
});

const createWindow = () => {
  let { width, height } = store.get("windowBounds");
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      webviewTag: true,
    },
  });
  //PROD - DELETE
  mainWindow.webContents.openDevTools();

  mainWindow.on("resize", () => {
    let { width, height } = mainWindow.getBounds();
    store.set("windowBounds", { width, height });
  });
  mainWindow.loadFile("index.html");
  ipcMain.on("save-data", (event, data) => {
    store.set("workspace", data);
  });
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", async (event) => {
  const innerText = await mainWindow.webContents.executeJavaScript(
    `document.querySelector('li').innerText`
  );
  ipcMain.emit("save-data", innerText);
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
