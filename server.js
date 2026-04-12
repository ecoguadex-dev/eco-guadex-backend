const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// 🌍 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 📊 Metrics Model
const MetricsSchema = new mongoose.Schema({
    health: Number,
    flow: Number,
    load: Number,
    network: Number,
    demand: Number,
    updatedAt: { type: Date, default: Date.now }
});

const Metrics = mongoose.model("Metrics", MetricsSchema);

// 📡 API Route
app.get("/metrics", async (req, res) => {
    const data = await Metrics.findOne().sort({ updatedAt: -1 });

    if (!data) {
        return res.json({
            health: 95,
            flow: 100,
            load: 40,
            network: 120,
            demand: 70
        });
    }

    res.json(data);
});

// 🌱 Seed Data (temporary)
app.get("/seed", async (req, res) => {
    await Metrics.create({
        health: 98,
        flow: 140,
        load: 45,
        network: 160,
        demand: 80
    });

    res.send("Data seeded");
});

// 🚀 Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("EcoGuadex API running on port " + PORT);
});