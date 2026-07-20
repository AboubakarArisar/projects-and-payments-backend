const Member = require("../models/members.model");

// Every function takes the owning userId — members never cross accounts.

const addMember = async (user, teamMemberData) => {
  try {
    const newMember = await Member.create({ ...teamMemberData, user });
    return newMember;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding team member");
  }
};

const getMembers = async (user) => {
  try {
    const members = await Member.find({ user });
    return members;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching team members");
  }
};

const getMemberById = async (memberId, user) => {
  try {
    const member = await Member.findOne({ _id: memberId, user });

    if (!member) {
      throw new Error("Team member not found");
    }

    return member;
  } catch (error) {
    console.error(error);
    if (error.message === "Team member not found") throw error;
    throw new Error("Error fetching team member by ID");
  }
};

const updateMemberById = async (memberId, user, updatedData) => {
  try {
    const updatedMember = await Member.findOneAndUpdate(
      { _id: memberId, user },
      updatedData,
      { new: true }
    );

    if (!updatedMember) {
      throw new Error("Team member not found");
    }

    return updatedMember;
  } catch (error) {
    console.error(error);
    if (error.message === "Team member not found") throw error;
    throw new Error("Error updating team member by ID");
  }
};

const deleteMemberById = async (memberId, user) => {
  try {
    const deletedMember = await Member.findOneAndDelete({ _id: memberId, user });

    if (!deletedMember) {
      throw new Error("Team member not found");
    }

    return { message: "Team member deleted successfully" };
  } catch (error) {
    console.error(error);
    if (error.message === "Team member not found") throw error;
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
