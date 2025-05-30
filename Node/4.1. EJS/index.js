import e from "express";

const app = e();
const port = 3000;


app.get("/", (req, res) => {
    const today = (req.query && req.query.day) ? req.query.day : new Date().getDay();
    const itsWeekday = today >= 1 && today <= 5;
    
    res.render("index.ejs", {
        dayType: itsWeekday ? "a weekday" : "the weekend",
        advice: itsWeekday ? "work hard" : "have fun",
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));