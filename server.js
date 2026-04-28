import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { protect } from "./middleware/authMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import supplyFlowRoutes from "./routes/supplyFlowRoutes.js";

// =======================
// CONFIG
// =======================
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

console.log("🚀 SERVER STARTING...");
console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);

// =======================
// HEALTH CHECK ROUTE
// =======================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "EcoGuadex API is running",
  });
});

// =======================
// ROUTES
// =======================
app.use("/api/users", userRoutes);
app.use("/api/auth", userRoutes); // optional alias
app.use("/api/stores", storeRoutes);
app.use("/api/flows", supplyFlowRoutes);

// =======================
// PROTECTED TEST ROUTE
// =======================
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user,
  });
});

// =======================
// ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// =======================
// DATABASE + SERVER START
// =======================
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  });