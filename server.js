const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== SAFE DATABASE CONNECTION =====
let dbConnected = false;

if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            dbConnected = true;
            console.log("MongoDB Connected");
        })
        .catch(err => {
            dbConnected = false;
            console.log("MongoDB Connection Error:", err.message);
        });
}

// ===== SCHEMA =====
const MetricsSchema = new mongoose.Schema({
    health: Number,
    flow: Number,
    load: Number,
    network: Number,
    demand: Number
}, { timestamps: true });

const Metrics = mongoose.model("Metrics", MetricsSchema);

// ===== ROUTES =====

// Health check
app.get("/", (req, res) => {
    res.send("EcoGuadex API is LIVE");
});

// Metrics route (SAFE + fallback)
app.get("/metrics", async (req, res) => {
    try {
        if (dbConnected) {
            const data = await Metrics.findOne().sort({ createdAt: -1 });

            if (data) {
                return res.json({
                    source: "database",
                    data
                });
            }
        }

        // fallback (ALWAYS SAFE)
        return res.json({
            source: "fallback",
            health: 95,
            flow: 100,
            load: 40,
            network: 120,
            demand: 70
        });

    } catch (error) {
        console.log("Metrics Error:", error.message);

        return res.json({
            source: "fallback-error",
            health: 95,
            flow: 100,
            load: 40,
            network: 120,
            demand: 70
        });
    }
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log("EcoGuadex API running on port", PORT);
});