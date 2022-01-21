import { exec } from "child_process";

export const createDirApps = (): boolean => {
  exec(
    `mkdir ${process.env.HOME}/.local/share/applications -p`,
    (err, stdout) => {
      if (err) {
        return false;
      }
    }
  );

  return true;
};
