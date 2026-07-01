const express = require("express");
const router = express.Router();
const ownerController = require("../controllers/owner.controller");

// Route to create a new member
// router.post('/owners', ownerController.createOwner);
//blocked post route max limit reached of 5 owners

// Route to get all members
router.get("/owners", ownerController.getAllOwners);

router.post("/owner/login", ownerController.login);

// Other routes for updating, deleting, getting a single member, etc. can be added here...

module.exports = router;
