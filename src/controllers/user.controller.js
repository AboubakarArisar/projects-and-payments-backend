const { registerUser } = require("../services/user.service");

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

module.exports = {
  register,
};
