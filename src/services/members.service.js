const Member = require("../models/members.model");

// Create a new member
const addMember = async (teamMemberData) => {
  try {
    const newMember = await Member.create(teamMemberData);
    return newMember;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding team member");
  }
};

// Get all members
const getMembers = async () => {
  try {
    const members = await Member.find({});
    return members;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching team members");
  }
};

// Get a specific member by ID
const getMemberById = async (memberId) => {
  try {
    const member = await Member.findById(memberId);

    if (!member) {
      throw new Error("Team member not found");
    }

    return member;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching team member by ID");
  }
};

// Update a member by ID
const updateMemberById = async (memberId, updatedData) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      updatedData,
      { new: true }
    );

    if (!updatedMember) {
      throw new Error("Team member not found");
    }

    return updatedMember;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating team member by ID");
  }
};

// Delete a member by ID
const deleteMemberById = async (memberId) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(memberId);

    if (!deletedMember) {
      throw new Error("Team member not found");
    }

    return { message: "Team member deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting team member by ID");
  }
};

module.exports = {
  addMember,
  getMembers,
  getMemberById,
  updateMemberById,
  deleteMemberById,
};
