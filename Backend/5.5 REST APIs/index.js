import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

import { get, post, put, patch, remove } from "./js/api.js"

const app = express();
const port = 3000;


// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});


app.post("/get-secret", async (req, res) => {
  const {id} = req.body;
  const apiResponse = await get(id);
  res.render("index.ejs", { content: JSON.stringify(apiResponse) });
});


app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  const {secret, score} = req.body;
  const reqData = {
    secret: secret,
    score: score
  }
  const apiResponse = await post(reqData);
  res.render("index.ejs", { content: JSON.stringify(apiResponse) });
});


app.post("/put-secret", async (req, res) => {
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  const {id, secret, score} = req.body;
  const reqData = {
    secret: secret,
    score: score
  }
  const apiResponse = await put(id, reqData);
  res.render("index.ejs", { content: JSON.stringify(apiResponse) });
});


app.post("/patch-secret", async (req, res) => {
  const {id, secret, score} = req.body;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  const reqData = {
    secret: secret,
    score: score
  }
  const apiResponse = await patch(id, reqData);
  res.render("index.ejs", { content: JSON.stringify(apiResponse) });
});


app.post("/delete-secret", async (req, res) => {
  const {id} = req.body;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  const apiResponse = await remove(id);
  res.render("index.ejs", { content: JSON.stringify(apiResponse) });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
