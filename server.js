const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// =====================
// CONNECT TO MONGODB
// =====================
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err.message);
});

// =====================
// SCHEMA (DEFINE FIRST)
// =====================
const MetricsSchema = new mongoose.Schema({
    health: Number,
    flow: Number,
    load: Number,
    network: Number,
    demand: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// =====================
// MODEL (DEFINE AFTER SCHEMA)
// =====================
const Metrics = mongoose.model("Metrics", MetricsSchema);

// =====================
// ROUTES
// =====================

// Root route
app.get("/", function (req, res) {
    res.send("EcoGuadex API is LIVE");
});

// GET metrics
app.get("/metrics", async function (req, res) {
    try {
        if (mongoose.connection.readyState === 1) {
            const latest = await Metrics.findOne().sort({ createdAt: -1 });

            if (latest) {
                return res.json({
                    source: "database",
                    latest: latest
                });
            }
        }

        return res.json({
            source: "fallback",
            latest: {
                health: 95,
                flow: 100,
                load: 40,
                network: 120,
                demand: 70
            }
        });

    } catch (error) {
        return res.json({
            source: "error",
            message: error.message
        });
    }
});

// POST metrics
app.post("/metrics", async function (req, res) {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                error: "Database not connected"
            });
        }

        const newMetrics = new Metrics(req.body);
        await newMetrics.save();

        return res.json({
            message: "Metrics saved",
            data: newMetrics
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

// =====================
// START SERVER
// =====================
app.listen(PORT, function () {
    console.log("EcoGuadex API running on port " + PORT);
});