const taskServices = require("../services/task.service");
const User = require("../models/user.model");

// Controller for creating a new Task
const createTask = async (req, res) => {
  try {
    const { name, description, deadline, status, project } = req.body;
    const createdTask = await taskServices.createTask(
      req.userId,
      name,
      description,
      deadline,
      status,
      project
    );
    res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for getting all Tasks
const getAllTasks = async (req, res) => {
  try {
    const filter = { user: req.userId };
    if (req.query.project) filter.project = req.query.project;
    const tasks = await taskServices.getAllTasks(filter);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for getting a specific task by ID
const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await taskServices.getTaskById(taskId, req.userId);
    res.json(task);
  } catch (error) {
    console.error(error);
    if (error.message === "Task not found") {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Controller for updating a task by ID
const updateTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { name, description, deadline, status, project } = req.body;
    const updatedTask = await taskServices.updateTaskById(taskId, req.userId, {
      name,
      description,
      deadline,
      status,
      project,
    });
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    if (error.message === "Task not found") {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Controller for deleting a Task by ID
const deleteTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const result = await taskServices.deleteTaskById(taskId, req.userId);
    res.json(result);
  } catch (error) {
    console.error(error);
    if (error.message === "Task not found") {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const updateStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const updatedTask = await taskServices.updateStatus(taskId, req.userId, status);
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    if (error.message === "Task not found") {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Controller for adding a comment to a task (author = the logged-in user)
const addComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "text is required" });
    }
    const user = await User.findById(req.userId);
    const task = await taskServices.addComment(taskId, req.userId, {
      author: user?.username || "Unknown",
      text: text.trim(),
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    if (error.message === "Task not found") {
      res.status(404).json({ error: "Task not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  updateStatus,
  addComment,
};
