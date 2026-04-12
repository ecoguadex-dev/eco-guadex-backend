const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Root test route
app.get("/", (req, res) => {
    res.send("EcoGuadex API is LIVE");
});

// Stable metrics endpoint (NO MongoDB)
app.get("/metrics", (req, res) => {
    res.json({
        health: 95,
        flow: 100,
        load: 40,
        network: 120,
        demand: 70
    });
});

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log("EcoGuadex API running on port", PORT);
});