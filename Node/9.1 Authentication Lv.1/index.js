import express from "express";
import bodyParser from "body-parser";

import { registerUser } from "js/repositories/usersRepo.js"


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
  const newUser = await registerUser(req.body.username, req.body.password);
  console.log(`Attempting to register: ${JSON.stringify(newUser)}.`);
});

app.post("/login", async (req, res) => {
  const loginFormData = {
    email: req.body.username,
    password: req.body.password
  }
  console.log(`Attempting to register: ${JSON.stringify(loginFormData)}.`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
