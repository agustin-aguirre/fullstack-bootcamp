import express from "express";

import { randomDog } from "./js/dogs-api.js";


const port = 3000;
const app = new express();

app.use(express.static("public"));


app.get("/", async (req, res) => {
    const response = await randomDog();
    if (response.error) {
        res.status(500);
        res.send(response.error);
        return;
    }
    
    console.log(`${response.data.resource} -> ${response.data.mediaType}`);

    res.render("index.ejs", { data: response.data });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});