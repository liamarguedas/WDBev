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

app.get("/", async (req, res) => {
  await db.query("SELECT * FROM items", (err, res) => {
    if (err) {
      console.log("Error executing query");
    } else {
      items = res.rows;
    }
  });

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

app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  const query = "UPDATE items SET title = ($1) WHERE id = $2";
  const dbRes = await db.query(query, [item, parseInt(id)]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  const query = "DELETE FROM items WHERE id = $1";
  const dbRes = await db.query(query, [parseInt(id)]);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
