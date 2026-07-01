// member.route.js
const express = require("express");
const router = express.Router();
const membersController = require("../controllers/members.controller");

// Route for adding a new team member
router.post("/members", membersController.addMember);

// Route for getting all team members
router.get("/members", membersController.getMembers);

// Route for getting a specific team member by ID
router.get("/members/:id", membersController.getMemberById);

// Route for updating a team member by ID
router.put("/members/:id", membersController.updateMemberById);

// Route for deleting a team member by ID
router.delete("/members/:id", membersController.deleteMemberById);

module.exports = router;
