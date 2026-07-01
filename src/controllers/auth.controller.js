const { loginUser } = require("../services/auth.service");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser({ email, password });
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  login,
};
