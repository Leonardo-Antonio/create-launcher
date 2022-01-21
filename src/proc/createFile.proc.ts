import fs from "fs";
import { ILauncher } from "../interfaces/launcher.interface";

export const createFile = (data: ILauncher): boolean => {
  fs.writeFile(
    `${process.env.HOME}/.local/share/applications/${data.name.replace(
      " ",
      "-"
    )}.desktop`,
    `
        [Desktop Entry]
        Type=${data.type}
        Categories=${data.category}
        Name=${data.name}
        Icon=${data.icon}
        Exec=${data.app}
        `,
    (err) => {
      if (err) return false;
    }
  );
  return true;
};
