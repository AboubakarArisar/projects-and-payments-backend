const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async ({ email, password }) => {
  try {
    if (!email || !password) {
      const error = new Error("Please enter both your email and password.");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({ email });
    // Use the same message for "no such user" and "wrong password" so we
    // don't leak which emails are registered — still clear to a real user.
    if (!user) {
      const error = new Error("Incorrect email or password.");
      error.statusCode = 401;
      throw error;
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Incorrect email or password.");
      error.statusCode = 401;
      throw error;
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token, user };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginUser,
};
