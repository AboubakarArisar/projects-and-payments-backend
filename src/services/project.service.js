const ProjectModel = require("../models/Project.model");
const TaskModel = require("../models/task.model");

// Every function takes the owning userId — a project is only ever reachable
// by the account that created it.

const createProject = async (user, name, startDate, deadline, description, payment) => {
  try {
    const createdProject = await ProjectModel.create({
      user,
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

const getAllProjects = async (user) => {
  try {
    const projects = await ProjectModel.find({ user });
    return projects;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching projects");
  }
};

const getProjectById = async (projectId, user) => {
  try {
    const project = await ProjectModel.findOne({ _id: projectId, user });

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    console.error(error);
    if (error.message === "Project not found") throw error;
    throw new Error("Error fetching project by ID");
  }
};

const updateProjectById = async (projectId, user, updatedData) => {
  try {
    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: projectId, user },
      updatedData,
      { new: true }
    );

    if (!updatedProject) {
      throw new Error("Project not found");
    }

    return updatedProject;
  } catch (error) {
    console.error(error);
    if (error.message === "Project not found") throw error;
    throw new Error("Error updating project by ID");
  }
};

const deleteProjectById = async (projectId, user) => {
  try {
    const deletedProject = await ProjectModel.findOneAndDelete({
      _id: projectId,
      user,
    });

    if (!deletedProject) {
      throw new Error("Project not found");
    }

    // Cascade: remove the project's tasks so none are left orphaned.
    await TaskModel.deleteMany({ project: projectId, user });

    return { message: "Project deleted successfully" };
  } catch (error) {
    console.error(error);
    if (error.message === "Project not found") throw error;
    throw new Error("Error deleting project by ID");
  }
};

const updateStatus = async (projectId, user, newStatus) => {
  try {
    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: projectId, user },
      { status: newStatus },
      { new: true }
    );

    if (!updatedProject) {
      throw new Error("Project not found");
    }

    return updatedProject;
  } catch (error) {
    console.error(error);
    if (error.message === "Project not found") throw error;
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
