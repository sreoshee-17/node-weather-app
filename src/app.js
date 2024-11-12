const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express(); // function named app
const weatherData = require("../utils/weatherData");
const { title } = require("process");

//letting the express know where the files and folders are located
const publicPath = path.join (__dirname, "../public");
const viewsPath = path.join (__dirname, "../templates/views");
const partialsPath = path.join (__dirname, "../templates/partials");

app.set("view engine", "hbs"); //informing express which UI is being used

app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

const port = process.env.PORT || 3000; // fetch port number, default to 3000

app.get("/", (req, res) => { // default API
    res.render("index", { title: "Weather App"});
});

app.get("/weather", (req, res) => { // third-party API route
    if (!req.query.address) {
        return res.send({ error: "Address is required" });
    }

    weatherData(req.query.address, (error, result) => {
        if (error) {
            return res.send({ error: result }); // Ensure only one response is sent
        }
        res.send(result); // Send result only if no error
    });
});

app.get("*", (req, res) => {
    res.render("4O4", { title: "Page not found" });
})

app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
