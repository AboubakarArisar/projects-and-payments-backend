const User = require("../models/user.model");

// Turn a raw error (mongoose validation, duplicate key, etc.) into a single,
// human-friendly message the frontend can show directly in a toast.
const toFriendlyMessage = (error) => {
  // Duplicate key (unique index violation) — e.g. email or username taken.
  if (error && error.code === 11000) {
    const field = Object.keys(error.keyPattern || error.keyValue || {})[0];
    if (field === "email") return "An account with this email already exists.";
    if (field === "username") return "That username is already taken. Please choose another.";
    return "That account already exists.";
  }

  // Mongoose schema validation — surface the first field's message
  // (e.g. "Password must be at least 6 characters long").
  if (error && error.name === "ValidationError" && error.errors) {
    const first = Object.values(error.errors)[0];
    if (first && first.message) return first.message;
  }

  return error?.message || "Something went wrong. Please try again.";
};

const registerUser = async ({ username, email, password }) => {
  // Basic presence checks so we can return clear messages fast.
  if (!username || !email || !password) {
    return { success: false, message: "Username, email and password are all required." };
  }

  try {
    // Check if the user already exists (by email or username).
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      const message =
        existingUser.email === email
          ? "An account with this email already exists."
          : "That username is already taken. Please choose another.";
      return { success: false, message };
    }

    // Create a new user (schema validation + password hashing happen on save).
    const newUser = new User({ username, email, password });
    await newUser.save();

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    return {
      success: false,
      message: toFriendlyMessage(error),
    };
  }
};

// Build Gmail-style alternative usernames from what the user typed.
const buildCandidates = (base) => {
  const clean = base.toLowerCase().replace(/[^a-z0-9._]/g, "").slice(0, 20) || "user";
  const year = new Date().getFullYear();
  return [
    `${clean}${Math.floor(Math.random() * 90 + 10)}`,
    `${clean}.${Math.floor(Math.random() * 900 + 100)}`,
    `${clean}_${year}`,
    `${clean}${year}`,
    `real.${clean}`,
    `${clean}.hq`,
    `the.${clean}`,
  ];
};

// Live username availability check. Backed by the unique index on
// User.username, so each lookup is a fast indexed hit — the same idea
// behind Gmail's instant "is this taken?" feedback while you type.
const checkUsername = async (rawUsername) => {
  const username = (rawUsername || "").trim();
  if (username.length < 3) {
    return {
      available: false,
      message: "Username must be at least 3 characters long.",
      suggestions: [],
    };
  }

  const taken = await User.exists({ username });
  if (!taken) {
    return { available: true, message: "Username is available.", suggestions: [] };
  }

  // Taken — offer up to 3 alternatives that are actually free.
  const suggestions = [];
  for (const candidate of buildCandidates(username)) {
    if (suggestions.length >= 3) break;
    // eslint-disable-next-line no-await-in-loop
    const exists = await User.exists({ username: candidate });
    if (!exists && !suggestions.includes(candidate)) suggestions.push(candidate);
  }

  return {
    available: false,
    message: "That username is already taken.",
    suggestions,
  };
};

// Live email availability check — also served by the unique email index.
const checkEmail = async (rawEmail) => {
  const email = (rawEmail || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { available: false, message: "Please enter a valid email address." };
  }

  const taken = await User.exists({ email });
  return taken
    ? { available: false, message: "An account with this email already exists." }
    : { available: true, message: "Email is available." };
};

module.exports = {
  registerUser,
  checkUsername,
  checkEmail,
};
