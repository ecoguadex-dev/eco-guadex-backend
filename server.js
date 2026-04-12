const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("EcoGuadex API is running");
});

app.get("/metrics", (req, res) => {
    res.json({
        health: 95,
        flow: 100,
        load: 40,
        network: 120,
        demand: 70
    });
});

app.listen(PORT, () => {
    console.log("EcoGuadex API running on port", PORT);
});