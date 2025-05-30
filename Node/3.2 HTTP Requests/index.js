import express from "express"

const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1><a href='/about'>About</a><br /><a href='contact'>contact</a>");
});

app.get("/about", (req, res) => {
    res.send("<h1>About Me</h1><p>Me llamo Agustín</p>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact</h1><p>Teléfono: +54123456789</p>");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});