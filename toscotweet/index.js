import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";
import Database from "./db.js";

const db = new Database();
db.createTable();

const tweets = []; // CHANGE TO DB SQL AFTER TESTING
const app = express();
const port = 3000;

class Tweet {
  constructor(text) {
    this.text = text;
    this.id = crypto.randomUUID();
  }

  getTitle(numberOfChars = 30) {
    return this.text.slice(0, numberOfChars);
  }

  storeTweet() {
    db.insertData(this.id, this.getTitle(), this.text);
  }
}
app.use(express.static("public"));

// HOMEPAGE ---------------------------
app.get("/", async (req, res) => {
  const ids = await db.selectDataColumn("public_id");

  const titles = await db.selectDataColumn("title");

  res.render("./index.ejs", {
    tweets_title: titles.map((entry) => entry.title),
    tweets_ids: ids.map((entry) => entry.public_id),
  });
});

// TWEET SENT -------------------------
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", async (req, res) => {
  const userEntry = new Tweet(req.body.tweet);
  userEntry.storeTweet();

  const ids = await db.selectDataColumn("public_id");

  const titles = await db.selectDataColumn("title");

  res.render("./index.ejs", {
    tweets_title: titles.map((entry) => entry.title),
    tweets_ids: ids.map((entry) => entry.public_id),
  });
});

app.get("/showTweet/:id", async (req, res) => {
  let tweetId = req.params.id;

  const dataRow = await db.filterSingleRow("public_id", tweetId);

  const ids = await db.selectDataColumn("public_id");

  const titles = await db.selectDataColumn("title");

  const renderTweet = dataRow[0];

  res.render("./index.ejs", {
    tweets_title: titles.map((entry) => entry.title),
    tweets_ids: ids.map((entry) => entry.public_id),
    tweet_text: renderTweet.tweet,
    tweet_id: renderTweet.public_id,
  });
});

app.get("/edit/:id", async (req, res) => {
  let tweetId = req.params.id;

  const dataRow = await db.filterSingleRow("public_id", tweetId);

  const ids = await db.selectDataColumn("public_id");

  const titles = await db.selectDataColumn("title");

  const renderTweet = dataRow[0];

  res.render("./index.ejs", {
    tweets_title: titles.map((entry) => entry.title),
    tweets_ids: ids.map((entry) => entry.public_id),
    tweet_text: renderTweet.tweet,
    tweet_id: renderTweet.public_id,
    edit: true,
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/edit_tweet/:id", async (req, res) => {
  let tweetId = req.params.id;
  let newTweet = req.body.edited_tweet;
  let newTweetTitle = newTweet.slice(0, 30);

  db.editDataRow("public_id", tweetId, newTweet, newTweetTitle);
  console.log(await db.filterSingleRow("public_id", tweetId));
  const ids = await db.selectDataColumn("public_id");

  const titles = await db.selectDataColumn("title");

  res.render("./index.ejs", {
    tweets_title: titles.map((entry) => entry.title),
    tweets_ids: ids.map((entry) => entry.public_id),
    tweet_text: newTweet,
    tweet_id: tweetId,
  });
});

app.get("/delete/:id", async (req, res) => {
  let tweetId = req.params.id;

  db.deleteDataFilter("public_id", tweetId);

  const ids = await db.selectDataColumn("public_id");

  const titles = await db.selectDataColumn("title");

  res.render("./index.ejs", {
    tweets_title: titles.map((entry) => entry.title),
    tweets_ids: ids.map((entry) => entry.public_id),
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
