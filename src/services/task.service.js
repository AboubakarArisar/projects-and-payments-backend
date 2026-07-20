const TaskModel = require("../models/task.model");

// Every function takes the owning userId — tasks never cross accounts.

const createTask = async (user, name, description, deadline, status, project) => {
  try {
    const createdTask = await TaskModel.create({
      user,
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

// Get all tasks for one account (filter always carries `user`)
const getAllTasks = async (filter = {}) => {
  try {
    const tasks = await TaskModel.find(filter);
    return tasks;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching tasks");
  }
};

const getTaskById = async (taskId, user) => {
  try {
    const task = await TaskModel.findOne({ _id: taskId, user });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  } catch (error) {
    console.error(error);
    if (error.message === "Task not found") throw error;
    throw new Error("Error fetching task by ID");
  }
};

const updateTaskById = async (taskId, user, updatedData) => {
  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, user },
      updatedData,
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (error) {
    console.error(error);
    if (error.message === "Task not found") throw error;
    throw new Error("Error updating Task by ID");
  }
};

const deleteTaskById = async (taskId, user) => {
  try {
    const deletedTask = await TaskModel.findOneAndDelete({ _id: taskId, user });

    if (!deletedTask) {
      throw new Error("Task not found");
    }

    return { message: "Task deleted successfully" };
  } catch (error) {
    console.error(error);
    if (error.message === "Task not found") throw error;
    throw new Error("Error deleting Task by ID");
  }
};

const updateStatus = async (taskId, user, newStatus) => {
  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, user },
      { status: newStatus },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  } catch (error) {
    console.error(error);
    if (error.message === "Task not found") throw error;
    throw new Error("Error updating Task status by ID");
  }
};

// Add a comment to a task and return the updated task.
const addComment = async (taskId, user, comment) => {
  const task = await TaskModel.findOne({ _id: taskId, user });
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
