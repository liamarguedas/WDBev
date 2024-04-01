import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let seconds = new Date().getSeconds();

  const data = {
    title: "EJS Tags",
    seconds: seconds,
    items: ["apple", "banana", "cherry"],
    htmlContent: "<strong>This is some strong text</strong>",
  };
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
