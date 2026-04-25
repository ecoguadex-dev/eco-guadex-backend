// ===============================
// EcoGuadex Backend Server (Production Safe)
// ===============================

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// ===============================
// EARLY DEBUG (VERY IMPORTANT)
// ===============================
console.log("🚀 SERVER STARTING...");
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);

// ===============================
// Basic Health Check Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "EcoGuadex API is running",
  });
});

// ===============================
// MongoDB Connection + Server Start
// ===============================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI is missing in Render environment variables");
      console.error("👉 Add it in Render dashboard under Environment Variables");
      return; // DO NOT crash process
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);

    // Keep process alive so Render shows logs
  }
};

startServer();

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err.stack);

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});
