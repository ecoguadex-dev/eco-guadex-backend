const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let dbConnected = false;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    dbConnected = true;
    console.log("MongoDB Connected");
})
.catch(err => {
    dbConnected = false;
    console.log("MongoDB Error:", err.message);
});

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

const Metrics = mongoose.models.Metrics || mongoose.model("Metrics", MetricsSchema);

app.get("/", (req, res) => {
    res.send("EcoGuadex API is LIVE");
});

app.get("/metrics", async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const latest = await Metrics.findOne().sort({ createdAt: -1 });

            if (latest) {
                return res.json({
                    source: "database",
                    latest
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
            source: "error-fallback",
            error: error.message,
            latest: {
                health: 95,
                flow: 100,
                load: 40,
                network: 120,
                demand: 70
            }
        });
    }
});

app.post("/metrics", async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                error: "Database not connected"
            });
        }

        const newMetrics = new Metrics(req.body);
        await newMetrics.save();

        return res.json({
            message: "Metrics saved successfully",
            data: newMetrics
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log("EcoGuadex API running on port", PORT);
});