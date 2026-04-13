const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// =====================
// CONNECT TO MONGODB
// =====================
mongoose.connect(process.env.MONGO_URI)
.then(function () {
    console.log("MongoDB Connected");
})
.catch(function (err) {
    console.log("MongoDB Error:", err.message);
});

// =====================
// SCHEMA
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
// MODEL
// =====================
const Metrics = mongoose.model("Metrics", MetricsSchema);

// =====================
// ROUTES
// =====================
app.get("/", function (req, res) {
    res.send("EcoGuadex API is LIVE");
});

app.get("/metrics", async function (req, res) {
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

app.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});