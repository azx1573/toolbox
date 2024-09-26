import fs from "fs-extra";

fs.readdir("./src/toolbox").then((fileList) => {
  if (Array.isArray(fileList)) {
    let exportStr = "";
    if (fileList?.length) {
      fileList.forEach((file) => {
        let fileName = file.split(".")[0];
        if (file.endsWith(".js") || file.endsWith(".ts")) {
          exportStr += `export { default as ${fileName}} from './toolbox/${fileName}';\n`;
        } else {
          exportStr += `export { default as ${fileName}} from './toolbox/${fileName}/index';\n`;
        }
      });

      fs.writeFile("./src/index.js", exportStr, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Exported successfully");
        }
      });
    } else console.log('😭No files found in "src/toolbox"');
  }
});
