const mongoose = require("mongoose");
const ProjectStatus = require("../constant/ProjectStatus");

const ProjectSchema = new mongoose.Schema({
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
