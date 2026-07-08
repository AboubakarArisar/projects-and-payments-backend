const express = require("express");
const router = express.Router();
const {
  register,
  checkUsernameAvailability,
  checkEmailAvailability,
} = require("../controllers/user.controller");

router.post("/register", register);

// Live availability checks for the signup form (debounced calls from the client).
router.get("/check-username", checkUsernameAvailability);
router.get("/check-email", checkEmailAvailability);

module.exports = router;
