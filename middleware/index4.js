import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

function generateBandName(street, pet) {
  return street.toString() + pet.toString();
}

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  let name = generateBandName(req.body.street, req.body.pet);
  res.send(name);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
