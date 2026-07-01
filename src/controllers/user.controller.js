const { registerUser } = require("../services/user.service");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await registerUser({ username, email, password });
    res.status(201).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  register,
};
