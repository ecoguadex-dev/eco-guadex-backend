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
        }); const MetricsSchema = new mongoose.Schema({
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

const Metrics = mongoose.model("Metrics", MetricsSchema);
}

// ===== SCHEMA =====
const MetricsSchema = new mongoose.Schema({
    health: Number,
    flow: Number,
    load: Number,
    network: Number,
    demand: Number
}, { timestamps: true });

const Metrics = mongoose.models.Metrics || mongoose.model("Metrics", MetricsSchema);

// ===== ROUTES =====

// Health check
app.get("/", (req, res) => {
    res.send("EcoGuadex API is LIVE");
});

// Metrics route (SAFE + fallback)
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

app.post("/metrics", express.json(), async (req, res) => {
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
