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
  const userTweet = req.body.tweet;
  const userEntry = new Tweet(userTweet);

  console.log(userEntry.id);
  console.log(userEntry.text);
  console.log(userEntry.getTitle());

  userEntry.storeTweet();

  res.render("./index.ejs", {
    tweets_title: tweets.map((entry) => entry.title),
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
