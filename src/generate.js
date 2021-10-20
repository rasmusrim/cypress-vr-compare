const fs = require("fs");
const path = require("path");
const getColors = require("get-image-colors");


start();

async function start() {

  const snapshotDir = __dirname + "/../../snapshots/";
  const result = [];

  const files = getAllFiles(snapshotDir + "base/vr/");

  for (const file of files) {

    if (/Zone\.Identifier$/.test(file)) {
      continue;
    }


    const root = file.replace("-base.png", "");
    const actualFilename =
      (root + "-actual.png").replace("/base/", "/actual/");
    const baseFilename =
      (root + "-base.png");
    const diffFilename =
      (root + "-diff.png").replace("/base/", "/diff/");

    let hasDiff = false;

    if(fs.existsSync(diffFilename)) {
      const colors = await getColors(diffFilename);
      const red = colors.filter(color => (color._rgb[0] - (color._rgb[1] + color._rgb[2]) / 2) > 100)
      if(red.length > 0) {
        hasDiff = true;
      }
    }


    result.push({
      actual: fs.existsSync(actualFilename) ? base64_encode(actualFilename) : null,
      base: base64_encode(baseFilename),
      diff: fs.existsSync(diffFilename) ? base64_encode(diffFilename) : null,
      hasDiff,
      filename: root
    });


  };


  fs.writeFileSync(__dirname + "/images.json", JSON.stringify(result));
}

function base64_encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {

      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};