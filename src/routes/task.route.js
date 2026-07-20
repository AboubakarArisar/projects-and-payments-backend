const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

// Route for creating a new Task
router.post("/tasks", taskController.createTask);

// Route for getting all tasks
router.get("/tasks", taskController.getAllTasks);

// Route for getting a specific task by ID
router.get("/tasks/:taskId", taskController.getTaskById);

// Route for updating a task by ID
router.put("/tasks/:taskId", taskController.updateTaskById);

// Route for deleting a task by ID
router.delete("/tasks/:taskId", taskController.deleteTaskById);

router.patch("/tasks/:taskId/status", taskController.updateStatus);

// Add a comment to a task
router.post("/tasks/:taskId/comments", taskController.addComment);

module.exports = router;
