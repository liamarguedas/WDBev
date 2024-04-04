import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

function getLen(word) {
  return word.length;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => d });

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  res.render("./index.ejs", { letters: getLen(req.body.fName) });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
