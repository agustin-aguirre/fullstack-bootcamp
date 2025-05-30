//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan"

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = __dirname + "/public/index.html";
const secretsPath = __dirname + "/public/secret.html";


const app = express();
const port = 3000;

const verySecretPassw = "ILoveProgramming";

let userIsAuthorized = false;


function authorizeUser(req, res, next) {
    userIsAuthorized = req.body && req.body.password && (req.body.password == verySecretPassw);
    next();
}


app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));


app.get("/", (req, res) => {
    res.sendFile(indexPath);
});

app.get("/secret", (req, res) => {
    if (!userIsAuthorized) res.sendStatus(401);
    res.sendFile(secretsPath);
});

app.post("/check", authorizeUser, (req, res) => {
    const finalEndpoint = userIsAuthorized ? "/secret" : "/";
    console.log("Is Authorized? " + userIsAuthorized + " - Redirected To: " + finalEndpoint);
    res.redirect(finalEndpoint);
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});