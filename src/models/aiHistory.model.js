const mongoose = require("mongoose");

// One saved AI generation, grouped by the assistant tab it came from.
const AiHistorySchema = new mongoose.Schema(
  {
    tab: { type: String, required: true },
    title: { type: String, default: "" },
    input: { type: String, default: "" },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AiHistory", AiHistorySchema);
