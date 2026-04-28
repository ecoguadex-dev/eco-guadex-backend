import mongoose from "mongoose";

const supplyFlowSchema = new mongoose.Schema({
  farmerName: { type: String, required: true },
  product: { type: String, required: true },

  quantityHarvested: { type: Number, required: true },
  quantityArrived: { type: Number, default: 0 },

  locationFrom: String,
  locationTo: String,

  harvestDate: Date,
  arrivalDate: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SupplyFlow = mongoose.model("SupplyFlow", supplyFlowSchema);

export default SupplyFlow;