const projectServices = require("../services/project.service");

// Controller for creating a new project
const createProject = async (req, res) => {
  try {
    const { name, startDate, deadline, description, payment } = req.body;
    const createdProject = await projectServices.createProject(
      name,
      startDate,
      deadline,
      description,
      payment
    );
    res.status(201).json(createdProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for getting all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await projectServices.getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for getting a specific project by ID
const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await projectServices.getProjectById(projectId);
    res.json(project);
  } catch (error) {
    console.error(error);
    if (error.message === "Project not found") {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Controller for updating a project by ID
const updateProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, startDate, deadline, description, payment } = req.body;
    const updatedProject = await projectServices.updateProjectById(projectId, {
      name,
      startDate,
      deadline,
      description,
      payment,
    });
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    if (error.message === "Project not found") {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Controller for deleting a project by ID
const deleteProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const result = await projectServices.deleteProjectById(projectId);
    res.json(result);
  } catch (error) {
    console.error(error);
    if (error.message === "Project not found") {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const updateStatus = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.body;

    const updatedProject = await projectServices.updateStatus(
      projectId,
      status
    );
    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    if (error.message === "Project not found") {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  updateStatus,
};
