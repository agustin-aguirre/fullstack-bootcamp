import express from "express";
import bodyParser from "body-parser";

import { Item, getAllItems, addItem, updateItem, deleteItem } from "./js/db.js";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
// { id: 1, title: "Buy milk" },
// { id: 2, title: "Finish homework" },
// ];

app.get("/", async (req, res) => {
  const items = await getAllItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.get("/api/all", async (req, res) => {
  res.send(await getAllItems());
});

app.post("/api/add",
  (req, res, next) => {
    const title = req.body.newItem;
    if (title === null || title === undefined || title.trim() === "") res.status(400).send("Obligatory field newItem is not set.");
    return;
  },
  async (req, res) => {
    const newItem = new Item(req.body.newItem);
    await addItem(newItem);
    res.redirect("/");
  });

app.post("/api/edit",
  (req, res, next) => {
    const id = req.body.updatedItemId;
    if (id === null || id === undefined) {
      res.status(400).send("Obligatory field updatedItemId is not set.");
      return;
    }
    
    const title = req.body.updatedItemTitle;
    if (title === null || title === undefined) {
      res.status(400).send("Obligatory field updatedItemTitle is not set.");
      return;
    }
  },
  async (req, res) => {
    const item = new Item(req.body.updatedItemTitle, req.body.updatedItemId);
    await updateItem(item);
    res.redirect("/")
  }
);

app.post("/api/delete", async (req, res) => {
  await deleteItem(req.body.deleteItemId);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
