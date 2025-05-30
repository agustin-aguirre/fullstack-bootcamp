import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";

import { getAll } from "./source/repositories/postgressDb.js";
import { getBooksCoverData } from './source/services/bookCoversService.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();


app.use(express.static("public"));
app.set('views', path.join(__dirname, "source", "views", "pages"));


app.get("/", async (req, res) => {
    const books = await getAll();
    res.render("index.ejs", {books: books});
});

app.get("/api/books/search", async (req, res) => {
  console.log(req.url);
  const searchTerm = req.query.term;
  const coversData = await getBooksCoverData(searchTerm);
  console.log(coversData);
  res.send(coversData);
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});