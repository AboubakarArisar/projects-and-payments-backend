const mongoose = require("mongoose");
const TaskStatus = require("../constant/TaskStatus");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: TaskStatus,
    default: "TODO",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
});
module.exports = mongoose.model("Tasks", TaskSchema);
