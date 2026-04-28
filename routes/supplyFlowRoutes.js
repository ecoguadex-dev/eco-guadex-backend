import express from "express";
import {
  createSupplyFlow,
  addFlowEvent,
  getFlowAnalytics,
} from "../controllers/supplyFlowController.js";

const router = express.Router();

router.post("/", createSupplyFlow);
router.post("/event", addFlowEvent);
router.get("/analytics", getFlowAnalytics);

export default router;