import mongoose from "mongoose";

const flowEventSchema = new mongoose.Schema({
  supplyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SupplyFlow",
    required: true,
  },

  stage: {
    type: String,
    enum: ["harvest", "transport", "market"],
    required: true,
  },

  quantity: Number,

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const FlowEvent = mongoose.model("FlowEvent", flowEventSchema);

export default FlowEvent;