const mongoose = require("mongoose");
const ProjectStatus = require("../constant/ProjectStatus");

const ProjectSchema = new mongoose.Schema({
  // Owning account — every query is scoped to this. No cross-account access.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  name: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
  },
  deadline: {
    type: Date,
  },

  description: {
    type: String,
    required: true,
  },

  payment: {
    type: Number,
  },

  status: {
    type: String,
    enum: ProjectStatus,
    default: "BACKLOG",
  },
});
module.exports = mongoose.model("Projects", ProjectSchema);
