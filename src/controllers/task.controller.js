const taskServices = require("../services/task.service");

// Controller for creating a new Task
const createTask = async (req, res) => {
  try {
    const { name, description, deadline, status, project } = req.body;
    const createdTask = await taskServices.createTask(
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
    const filter = req.query.project ? { project: req.query.project } : {};
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
    const task = await taskServices.getTaskById(taskId);
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
    const updatedTask = await taskServices.updateTaskById(taskId, {
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
    const result = await taskServices.deleteTaskById(taskId);
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
    const updatedTask = await taskServices.updateStatus(taskId, status);
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

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  updateStatus,
};
