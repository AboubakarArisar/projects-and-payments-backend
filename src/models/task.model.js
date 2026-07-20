const mongoose = require("mongoose");
const TaskStatus = require("../constant/TaskStatus");

const CommentSchema = new mongoose.Schema(
  {
    author: { type: String, default: "Unknown" },
    text: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const TaskSchema = new mongoose.Schema({
  // Owning account — every query is scoped to this.
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
    ref: "Projects",
  },
  comments: [CommentSchema],
});
module.exports = mongoose.model("Tasks", TaskSchema);
