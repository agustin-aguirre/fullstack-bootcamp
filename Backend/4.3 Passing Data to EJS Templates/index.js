import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  if (!req.body || !req.body.fName || !req.body.lName) res.redirect("/");
  res.render("index.ejs", {
    letters: String(req.body.fName + req.body.lName).length
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
