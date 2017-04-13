const fs = require("fs");

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8",(err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

function writeFile(filePath, rawData) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, rawData, "utf8", (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}
module.exports = {
    "readFile": readFile,
    "writeFile": writeFile
};