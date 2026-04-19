// ===============================
// EcoGuadex Backend Server
// ===============================

// Load environment variables FIRST
require("dotenv").config();

// Core dependencies
const express = require("express");
const mongoose = require("mongoose");

// Initialize app
const app = express();

// Middleware
app.use(express.json());

// ===============================
// Debug: Check environment variable
// ===============================
console.log("MONGO_URI:", process.env.MONGO_URI);

// ===============================
// MongoDB Connection
// ===============================
if (!process.env.MONGO_URI) {
  console.error("Startup Error: MONGO_URI is not defined in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
  });

// ===============================
// Test Route
// ===============================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "EcoGuadex API is running",
  });
});

// ===============================
// Server Start
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});