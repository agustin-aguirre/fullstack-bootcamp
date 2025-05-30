import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = __dirname + "/public/index.html";

const app = express();
const port = 3000;

const resp = "<h1>Your band name is:</h1><h2>{bandname}👍</h2>";


const urlencodedParser = bodyParser.urlencoded({extended: true});


app.get("/", (req, res) => {
  res.sendFile(indexPath)
});

app.post("/submit", urlencodedParser, (req, res) => {
  if (!req.body || !req.body.street || !req.body.pet) res.sendStatus(400);
  const bandname= req.body.street + req.body.pet;
  res.send(resp.replace("{bandname}", bandname))
  console.log(req.body);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
