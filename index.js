const { app, BrowserWindow } = require("electron");
const path = require("path");
const nconf = require('nconf');

const loadMainWindow = () => {
    /*Neues 1200x800 Window*/
    const mainWindow = new BrowserWindow({
        width : 1200,
        height: 800,
        icon: __dirname + '/favicon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    /*Lädt HTMl File*/
    mainWindow.loadFile(path.join(__dirname, "index.html"));

    /*Enfernt dummes Menü in der oberen Leiste*/
    //mainWindow.removeMenu();

/* Sorgt dafür dass sich das die App beim letzten Window schliesst */
    mainWindow.on('close', function(e) {
            e.preventDefault();
            mainWindow.destroy();
        });
}
app.on("ready", loadMainWindow);

/* Sorgt dafür dass sich das die App beim letzten Window schliesst */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});

nconf.file({ file: 'config.json' });

function getConf(input){
  return nconf.get(input);
}

app.on('open-file', (event, path) =>
{
    event.preventDefault();
    console.log(path);
});
