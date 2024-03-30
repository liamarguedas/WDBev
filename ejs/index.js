import express from "express";

function dayAction() {
  let today = new Date().getDay();
  if (today === 0 || today === 6) {
    return "Hey! It's the weekend, it's time to have fun!";
  } else {
    return "Hey! It's a weekday, it's time to work hard!";
  }
}

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`<h1> ${dayAction()} </h1>`);
});

app.listen(port, () => {
  console.log(`sever is running on port: ${port}`);
});
