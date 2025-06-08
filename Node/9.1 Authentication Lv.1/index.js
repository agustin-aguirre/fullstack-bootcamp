import express from "express";
import bodyParser from "body-parser";

import { User } from "./source/models/user.js"
import { register, login, NotFoundError, UserAlreadyExistsError } from "./source/services/loginService.js";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const newUser = await register(req.body.username, req.body.password);
    res.send(newUser);
  }
  catch(err) {
    if (err instanceof UserAlreadyExistsError) {
      res.send(err.message).status(400);
    }
    else {
      res.send(err.message).status(500);
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const loggedInSuccessfully = await login(req.body.username, req.body.password);
    if (loggedInSuccessfully) {
      res.render("home.ejs");
    }
    else {
      res.sendStatus(401);
    }
  }
  catch(err) {
    if (err instanceof NotFoundError) {
      res.send(err.message).status(404);
    }
    else {
      res.send(err.message).status(500);
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});