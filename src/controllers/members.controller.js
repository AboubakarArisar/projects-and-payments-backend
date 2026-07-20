// members.controller.js
const membersService = require("../services/members.service");

// Controller for adding a new team member
const addMember = async (req, res) => {
  try {
    const teamMemberData = req.body;
    const newMember = await membersService.addMember(req.userId, teamMemberData);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting all team members
const getMembers = async (req, res) => {
  try {
    const members = await membersService.getMembers(req.userId);
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting a specific team member by ID
const getMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await membersService.getMemberById(memberId, req.userId);
    res.status(200).json(member);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Controller for updating a team member by ID
const updateMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const updatedData = req.body;
    const updatedMember = await membersService.updateMemberById(
      memberId,
      req.userId,
      updatedData
    );
    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Controller for deleting a team member by ID
const deleteMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const result = await membersService.deleteMemberById(memberId, req.userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  addMember,
  getMembers,
  getMemberById,
  updateMemberById,
  deleteMemberById,
};
