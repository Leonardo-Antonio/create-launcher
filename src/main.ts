import { app, BrowserWindow } from "electron";
import "./proc/launcher.process"

class App {
  public win: BrowserWindow | null = null;
  public createWindow(): void {
    this.win = new BrowserWindow({
      width: 420,
      height: 660,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      resizable: false,
      autoHideMenuBar: true
    });

    this.win.loadFile("./src/ui/pages/index.html");
  }
}

app.whenReady().then(() => new App().createWindow());
