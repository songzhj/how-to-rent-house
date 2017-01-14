let app = require("../app.js");
let startPage = 1;
let minEnd = Number.MAX_VALUE;
process.argv.forEach((val, index, array) => {
    if (val === "--start") {
        startPage = process.argv[index + 1];
    } else if(val === "--minEnd") {
        minEnd = process.argv[index + 1];
    }
});
app(startPage, minEnd);