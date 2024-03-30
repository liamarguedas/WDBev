//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const password = "ILoveProgramming";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

function verifyAcess(UsrInput) {
  if (UsrInput === password) {
    return true;
  }
  return false;
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/check", (req, res) => {
  if (verifyAcess(req.body.password)) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.send("<h1> OPS </h1>");
  }
});

app.listen(port, () => {
  console.log(`Sever is running on port: ${port}`);
});
