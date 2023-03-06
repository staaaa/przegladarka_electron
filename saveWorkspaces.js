const { ipcMain } = require("electron");
const Store = require("./store");

const store = new Store({
  configName: "workspaces",
  defaults: {},
});

ipcMain.on("save-data", (event, data) => {
  store.set("workspace", data);
});
