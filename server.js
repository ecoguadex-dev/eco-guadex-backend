require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// =====================
// DEBUG CHECK (remove later)
// =====================
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing");

// =====================
// DATABASE CONNECTION
// =====================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    // Start server ONLY after DB connects
    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Force crash so Render shows real error
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