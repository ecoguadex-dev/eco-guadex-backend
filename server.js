const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// =====================
// DATABASE CONNECTION
// =====================
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:", err.message);
});

// =====================
// SCHEMA (CORRECT)
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
// MODEL (CORRECT)
// =====================
const Metrics = mongoose.model("Metrics", MetricsSchema);

// =====================
// ROUTES
// =====================
app.get("/", (req, res) => {
    res.send("EcoGuadex API is LIVE");
});

app.get("/metrics", async (req, res) => {
    try {
        const latest = await Metrics.findOne().sort({ createdAt: -1 });

        if (latest) {
            return res.json(latest);
        }

        return res.json({ message: "No data yet" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.post("/metrics", async (req, res) => {
    try {
        const newMetrics = new Metrics(req.body);
        await newMetrics.save();

        return res.json({
            message: "Saved successfully",
            data: newMetrics
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// =====================
// START SERVER
// =====================
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
