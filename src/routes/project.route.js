const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");

// Route for creating a new project
router.post("/projects", projectController.createProject);

// Route for getting all projects
router.get("/projects", projectController.getAllProjects);

// Route for getting a specific project by ID
router.get("/projects/:projectId", projectController.getProjectById);

// Route for updating a project by ID
router.put("/projects/:projectId", projectController.updateProjectById);

// Route for deleting a project by ID
router.delete("/projects/:projectId", projectController.deleteProjectById);

router.patch("/projects/:projectId/status", projectController.updateStatus);

module.exports = router;
