const {
  registerUser,
  checkUsername,
  checkEmail,
} = require("../services/user.service");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await registerUser({ username, email, password });
    // registerUser resolves with { success:false } on validation errors
    // (e.g. duplicate email) instead of throwing, so honor that here.
    if (!result.success) {
      return res.status(400).json(result);
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Gmail-style live availability check used by the signup form as the user types.
const checkUsernameAvailability = async (req, res) => {
  try {
    const result = await checkUsername(req.query.username);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ available: false, message: "Couldn't check that username right now." });
  }
};

const checkEmailAvailability = async (req, res) => {
  try {
    const result = await checkEmail(req.query.email);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ available: false, message: "Couldn't check that email right now." });
  }
};

module.exports = {
  register,
  checkUsernameAvailability,
  checkEmailAvailability,
};
