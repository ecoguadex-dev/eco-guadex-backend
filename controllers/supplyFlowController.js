import SupplyFlow from "../models/SupplyFlow.js";
import FlowEvent from "../models/FlowEvent.js";

// Create new supply flow
export const createSupplyFlow = async (req, res) => {
  try {
    const flow = await SupplyFlow.create(req.body);
    res.status(201).json(flow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add event (harvest, transport, market)
export const addFlowEvent = async (req, res) => {
  try {
    const event = await FlowEvent.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get analytics (LOSS + DELAY)
export const getFlowAnalytics = async (req, res) => {
  try {
    const flows = await SupplyFlow.find();

    const results = flows.map((flow) => {
      const loss =
        flow.quantityHarvested > 0
          ? (
              (flow.quantityHarvested - flow.quantityArrived) /
              flow.quantityHarvested
            ) * 100
          : 0;

      const delay =
        flow.arrivalDate && flow.harvestDate
          ? (new Date(flow.arrivalDate) - new Date(flow.harvestDate)) /
            (1000 * 60 * 60) // hours
          : 0;

      return {
        ...flow._doc,
        lossPercentage: loss.toFixed(2),
        delayHours: delay,
      };
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};