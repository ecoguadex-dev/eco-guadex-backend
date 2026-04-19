require("dotenv").config({ path: "./.env" });

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// =====================
// DEBUG CHECK
// =====================
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing");

// =====================
// DATABASE CONNECTION
// =====================
async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });

  } catch (error) {
    console.error("Startup Error:", error.message);
    process.exit(1);
  }
}

startServer();

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
// HEALTH CHECK
// =====================
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});