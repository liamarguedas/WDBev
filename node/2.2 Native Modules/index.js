const fs = require("node:fs");

let content = fs.readFileSync("./message.txt");

console.log(content.toString());
