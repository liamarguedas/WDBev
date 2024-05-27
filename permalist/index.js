import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "1518",
  port: 5432,
});

db.connect();

let items = new Array();

db.query("SELECT * FROM items", (err, res) => {
  if (err) {
    console.log("Error executing query");
  } else {
    items = res.rows;
  }
});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;

  items.push({ title: item });
  res.redirect("/");
  const text = "INSERT INTO items(title) VALUES($1) RETURNING *";
  const posting = [item];
  const dbRes = await db.query(text, posting);
});

app.post("/edit", (req, res) => {
  const item = req.body.newItem;

  items.push({ title: item });
  res.redirect("/");

  const text =
    "UPDATE items WHERE SET INSERT INTO items(title) VALUES($1) RETURNING *";
  const posting = [item];
});

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function getItems(sql) {}
