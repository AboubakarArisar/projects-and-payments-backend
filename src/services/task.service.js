const TaskModel = require("../models/task.model");

// Create a new Task
const createTask = async (name, description, deadline, status, project) => {
  try {
    const createdTask = await TaskModel.create({
      name,
      description,
      deadline,
      status,
      project,
    });
    return createdTask;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating Task");
  }
};

// Get all Task (optionally filtered, e.g. by project)
const getAllTasks = async (filter = {}) => {
  try {
    const tasks = await TaskModel.find(filter);
    return tasks;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching tasks");
  }
};

// Get a specific task by ID
const getTaskById = async (taskId) => {
  try {
    const task = await TaskModel.findById(taskId);

    if (!task) {
      throw new Error("task not found");
    }

    return task;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching task by ID");
  }
};

// Update a task by ID
const updateTaskById = async (taskId, updatedData) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating Task by ID");
  }
};

// Delete a Task by ID
const deleteTaskById = async (taskId) => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      throw new Error("Task not found");
    }

    return { message: "Task deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting Task by ID");
  }
};

const updateStatus = async (taskId, newStatus) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating Task status by ID");
  }
};

// Add a comment to a task and return the updated task.
const addComment = async (taskId, comment) => {
  const task = await TaskModel.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  task.comments.push(comment);
  await task.save();
  return task;
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
