import express from "express";
import bodyParser from "body-parser";

import { User } from "./source/models/user.js"
import { registerUser } from "./source/repositories/usersRepo.js"
import { DataLayerError, NotFoundError, UserAlreadyExistsError } from "./source/services/loginService.js";


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
    const newUser = await registerUser(new User({
      email: req.body.username,
      password: req.body.password
    }));
    console.log(`Attempting to register: ${JSON.stringify(newUser)}.`);
    res.render("/");
  }
  catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      res.sendStatus(400);
    }
    else if (err instanceof DataLayerError) {
      res.sendStatus(500);
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const loginFormData = {
      email: req.body.username,
      password: req.body.password
    }
    console.log(`Attempting to register: ${JSON.stringify(loginFormData)}.`);
    res.render("/");
  }
  catch (err) {
    if (err instanceof NotFoundError) {
      res.sendStatus(404);
    }
    else if (err instanceof DataLayerError) {
      res.sendStatus(500);
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
