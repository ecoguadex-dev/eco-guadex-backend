// ===============================
// EcoGuadex Backend Server
// ===============================

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// Safe environment check
console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("Startup Error: MONGO_URI is not defined in .env");
  process.exit(1);
}

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "EcoGuadex API is running",
  });
});

// Connect DB first, then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err.stack);

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});
