import express from "express";
import { createStore, getStores } from "../controllers/storeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create store (allowed for user + admin)
router.post("/", protect, authorizeRoles("user", "admin"), createStore);

// Get all stores
router.get("/", protect, getStores);

export default router;