const ProjectModel = require("../models/Project.model");
const TaskModel = require("../models/task.model");

// Create a new project
const createProject = async (
  name,
  startDate,
  deadline,
  description,
  payment
) => {
  try {
    const createdProject = await ProjectModel.create({
      name,
      startDate,
      deadline,
      description,
      payment,
    });
    return createdProject;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating project");
  }
};

// Get all projects
const getAllProjects = async () => {
  try {
    const projects = await ProjectModel.find({});
    return projects;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching projects");
  }
};

// Get a specific project by ID
const getProjectById = async (projectId) => {
  try {
    const project = await ProjectModel.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching project by ID");
  }
};

// Update a project by ID
const updateProjectById = async (projectId, updatedData) => {
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      updatedData,
      { new: true }
    );

    if (!updatedProject) {
      throw new Error("Project not found");
    }

    return updatedProject;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating project by ID");
  }
};

// Delete a project by ID
const deleteProjectById = async (projectId) => {
  try {
    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);

    if (!deletedProject) {
      throw new Error("Project not found");
    }

    // Cascade: remove the project's tasks so none are left orphaned.
    await TaskModel.deleteMany({ project: projectId });

    return { message: "Project deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting project by ID");
  }
};

const updateStatus = async (projectId, newStatus) => {
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedProject) {
      throw new Error("Project not found");
    }

    return updatedProject;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating project status by ID");
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
