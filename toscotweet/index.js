import express from "express";
import bodyParser from "body-parser";

const tweets = []; // CHANGE TO DB SQL AFTER TESTING
const app = express();
const port = 3000;

class Tweet {
  constructor(text) {
    this.text = text;
    this.id = tweets.length + 1;
  }

  getTitle(numberOfChars = 30) {
    return this.text.slice(0, numberOfChars);
  }

  storeTweet() {
    tweets.push({ id: this.id, title: this.getTitle(), tweet: this.text });
  }
}

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("./index.ejs");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
  const userEntry = new Tweet(req.body.tweet);
  userEntry.storeTweet();
  res.render("./index.ejs", {
    tweets_title: tweets.map((entry) => entry.title),
    tweets_ids: tweets.map((entry) => entry.id),
  });
});

app.get("/showTweet/:id", (req, res) => {
  let tweetId = parseInt(req.params.id);
  let renderTweet = tweets.filter((entry) => entry.id === tweetId)[0].tweet;
  res.render("./index.ejs", {
    tweets_title: tweets.map((entry) => entry.title),
    tweets_ids: tweets.map((entry) => entry.id),
    tweet: renderTweet,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
