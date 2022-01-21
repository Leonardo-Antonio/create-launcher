import { ipcMain } from "electron";
import { ILauncher } from "../interfaces/launcher.interface";
import { exec } from "child_process";
import { createFile } from "./createFile.proc";
import { createDirApps } from "./createDirApps.proc";

ipcMain.on("create-launcher__app", (e, args: ILauncher) => {
  const pathMain = `${process.env.HOME}/.lauchers`;
  exec(`mkdir -p ${pathMain}`, (err, stdout) => {
    if (err) {
      console.log(err);
    }
    console.log("creado");
  });

  const pathApp = `${pathMain}/${args.name.replace(" ", "-")}`;
  exec(`mkdir -p ${pathApp}`, (err, stdout) => {
    if (err) {
      console.log(err);
    }
    exec(
      `cp ${args.icon} ${pathApp} && cp ${args.app} ${pathApp}`,
      (err, stdout) => {
        if (err) {
          console.log(err);
        }

        const IsExitsDirApps = createDirApps();
        if (!IsExitsDirApps) {
          console.log("error al crear capeta de apps");
        }

        const isCreatedFile = createFile(args);

        if (!isCreatedFile) {
          console.log("error al crear el archivo .desktop");
        }

        e.reply("created", { message: "creado con exito", isCorrect: true });
      }
    );
  });
});
