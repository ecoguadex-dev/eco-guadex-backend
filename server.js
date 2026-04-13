const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// =====================
// SAFE MONGODB CONNECT
// =====================
async function connectDB() {
    try {
        if (!process.env.MONGO_URI) {
            console.log("No MONGO_URI provided");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connected");

    } catch (err) {
        console.log("MongoDB Error:", err.message);
    }
}

connectDB();

// =====================
// SAFE MODEL INIT
// =====================
let Metrics;

try {
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

    Metrics = mongoose.model("Metrics");
} catch (e) {
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

    Metrics = mongoose.model("Metrics", MetricsSchema);
}

// =====================
// ROUTES
// =====================

app.get("/", function (req, res) {
    res.send("EcoGuadex API is LIVE");
});

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
            source: "error-fallback",
            error: error.message
        });
    }
});

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
            message: "Metrics saved successfully",
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