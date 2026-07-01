const User = require("../models/user.model");

const registerUser = async ({ username, email, password }) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};

module.exports = {
  registerUser,
};
